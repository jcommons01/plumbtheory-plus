// src/pages/account.tsx
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Account() {
  const { user, userData } = useAuth();
  const [canceling, setCanceling] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) {
      setMessage('No active subscription found.');
      return;
    }

    setCanceling(true);
    setMessage('');

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: userData.stripeSubscriptionId }),
      });

      if (res.ok) {
        setMessage('✅ Your subscription will be canceled at the end of the billing period.');
      } else {
        const { error } = await res.json();
        setMessage(`❌ Failed to cancel: ${error}`);
      }
    } catch (error) {
      console.error('Cancel error:', error);
      setMessage('❌ An error occurred while canceling.');
    } finally {
      setCanceling(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Account</h1>

        <div className="bg-white shadow rounded p-6 mb-4">
          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>Status:</strong> {userData?.isPro ? 'Pro User' : 'Free User'}</p>
        </div>

        {userData?.isPro && userData?.stripeSubscriptionId && (
          <div className="bg-red-100 border border-red-300 p-4 rounded">
            <h2 className="font-semibold text-red-600 mb-2">Manage Your Subscription</h2>
            <p className="mb-3 text-sm text-red-700">
              You can cancel your subscription at any time. You will retain access until the end of your billing cycle.
            </p>
            <button
              onClick={handleCancelSubscription}
              disabled={canceling}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {canceling ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
            {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
          </div>
        )}
      </div>
    </Layout>
  );
}