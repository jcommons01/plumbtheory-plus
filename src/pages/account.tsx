// ✅ src/pages/account.tsx
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';

export default function Account() {
  const { userData, user, loading } = useAuth();
  const [isCancelling, setIsCancelling] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) return;

    setIsCancelling(true);
    setMessage('');

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: userData.stripeSubscriptionId }),
      });

      if (res.ok) {
        setMessage('✅ Subscription cancellation scheduled. You’ll retain access until the end of your billing period.');
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.error}`);
      }
    } catch (err) {
      console.error('❌ Cancel Error:', err);
      setMessage('❌ Something went wrong. Please try again.');
    } finally {
      setIsCancelling(false);
    }
  };

  if (loading || !userData) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <div className="bg-white shadow-md p-6 rounded-md">
          <p><strong>Email:</strong> {userData.email}</p>
          <p className="mt-2">
            <strong>Status:</strong> {userData.isPro ? '✅ Pro User' : 'Free User'}
          </p>

          {/* ✅ Show cancel button if Pro and has sub ID */}
          {userData.isPro && userData.stripeSubscriptionId && (
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
            <p className="mt-4 text-sm text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
