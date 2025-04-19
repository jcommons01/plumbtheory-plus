// ✅ src/pages/account.tsx
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AccountPage() {
  const { userData, user } = useAuth();
  const [cancelling, setCancelling] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) return;

    setCancelling(true);
    setMessage('');

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: userData.stripeSubscriptionId,
          uid: user?.uid,
        }),
      });

      if (res.ok) {
        setMessage('Subscription cancelled. You will retain access until the end of your billing period.');
      } else {
        setMessage('Failed to cancel subscription. Please contact support.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Try again later.');
    }

    setCancelling(false);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

        {userData ? (
          <div className="bg-white shadow-md p-6 rounded-md">
            <p className="text-lg mb-2">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="text-lg mb-4">
              <strong>Status:</strong>{' '}
              {userData.isPro ? (
                <span className="text-green-600 font-semibold">✅ Pro User</span>
              ) : (
                'Free User'
              )}
            </p>

            {userData.isPro && userData.stripeSubscriptionId && (
              <div className="mt-4">
                <button
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
                </button>
                {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  );
}
