import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { auth } from '@/lib/firebase'; // ✅ Make sure this is the correct path to your Firebase instance
import { getIdToken } from 'firebase/auth';

export default function Account() {
  const { userData } = useAuth();
  const [isCancelling, setIsCancelling] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) return;

    setIsCancelling(true);
    setMessage('');

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('User not logged in');

      const token = await getIdToken(currentUser);

      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMessage(
          '✅ Subscription cancellation scheduled. You’ll retain access until the end of your billing period.'
        );
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <div className="bg-white shadow-md p-6 rounded-md">
          <p>
            <strong>Email:</strong> {userData?.email}
          </p>
          <p className="mt-2">
            <strong>Status:</strong>{' '}
            {userData?.isPro ? (
              <span className="text-green-600 font-medium">✅ Pro User</span>
            ) : (
              'Free User'
            )}
          </p>

          {userData?.isPro && userData?.stripeSubscriptionId && (
            <div className="mt-6">
              <button
                onClick={handleCancelSubscription}
                disabled={isCancelling}
                className={`px-6 py-2 rounded text-white ${
                  isCancelling ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            </div>
          )}

          {message && (
            <p className="mt-4 text-sm text-gray-700 whitespace-pre-line">{message}</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
