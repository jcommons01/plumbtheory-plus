import { useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Layout from '@/components/Layout';

export default function AccountPage() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCancel = async () => {
    if (!user?.uid) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await res.json();

      if (data.success) {
        await updateDoc(doc(db, 'users', user.uid), {
          isPro: false,
          stripeSubscriptionId: null,
        });
        setSuccess(true);
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Cancel error:', err);
    }

    setLoading(false);
  };

  return (
    <Layout title="Account | PlumbTheory+">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Account Settings</h1>

          <div className="space-y-4 text-gray-700 mb-8">
            <div>
              <span className="font-semibold">Email:</span>{' '}
              {user?.email || 'Not logged in'}
            </div>

            <div>
              <span className="font-semibold">Status:</span>{' '}
              {userData?.isPro ? (
                <span className="text-green-600 font-semibold">✅ Pro User</span>
              ) : (
                <span className="text-gray-500 font-semibold">🔒 Free User</span>
              )}
            </div>
          </div>

          {userData?.isPro && (
            <>
              {userData?.stripeSubscriptionId ? (
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all disabled:opacity-50"
                >
                  {loading ? 'Cancelling...' : 'Cancel Subscription'}
                </button>
              ) : (
                <p className="text-sm text-red-500">
                  ⚠️ No Stripe subscription ID found. Please{' '}
                  <a
                    href="mailto:plumbtheory@gmail.com"
                    className="underline hover:text-red-700"
                  >
                    contact support
                  </a>
                  .
                </p>
              )}
            </>
          )}

          {success && (
            <p className="text-green-600 font-medium mt-4">✅ Subscription successfully cancelled.</p>
          )}

          <div className="mt-10 text-sm text-gray-500">
            Need help?{' '}
            <a
              href="mailto:plumbtheory@gmail.com"
              className="underline hover:text-blue-600"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
