// ✅ src/pages/account.tsx
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import { logOut } from '@/lib/firebase';

export default function Account() {
  const { user, userData } = useAuth();

  const cancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) return;

    const res = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId: userData.stripeSubscriptionId }),
    });

    const data = await res.json();
    if (data.success) {
      alert('Subscription will be cancelled at the end of the billing period.');
    } else {
      alert('Failed to cancel subscription.');
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4 text-center">Account Settings</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg font-medium mb-2">Email: {user?.email}</p>
          <p className="text-md mb-4">
            Status: {userData?.isPro ? '✅ Pro User' : '🔓 Free User'}
          </p>

          {userData?.isPro && userData?.stripeSubscriptionId && (
            <button
              onClick={cancelSubscription}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mb-4"
            >
              Cancel Subscription
            </button>
          )}

          <button
            onClick={logOut}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </div>
      </div>
    </Layout>
  );
}
