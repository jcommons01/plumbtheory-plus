// src/pages/account.tsx
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { useState } from 'react';

export default function Account() {
  const { userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) {
      setError('Subscription ID not found.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: userData.stripeSubscriptionId }),
      });

      if (!res.ok) {
        throw new Error('Failed to cancel subscription');
      }

      setCancelled(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-12 px-6 text-center bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        {userData && (
          <>
            <p className="mb-2">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="mb-6">
              <strong>Status:</strong>{' '}
              {userData.isPro ? (
                <span className="text-green-600 font-semibold">✅ Pro User</span>
              ) : (
                <span className="text-gray-500">Free User</span>
              )}
            </p>

            {userData.isPro && userData.stripeSubscriptionId && !cancelled && (
              <button
                onClick={cancelSubscription}
                className={`bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 mb-4 ${
                  loading && 'opacity-60 cursor-not-allowed'
                }`}
                disabled={loading}
              >
                {loading ? 'Cancelling...' : 'Cancel Subscription'}
              </button>
            )}

            {cancelled && (
              <p className="text-sm text-yellow-600 mb-4">
                Subscription will end at the end of the current billing cycle.
              </p>
            )}

            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}
          </>
        )}

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400"
        >
          Log Out
        </button>
      </div>
    </Layout>
  );
}
