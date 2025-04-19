// ✅ src/pages/account.tsx
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AccountPage() {
  const { userData, loading } = useAuth();
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState('');

  const cancelSubscription = async () => {
    if (!userData?.stripeSubscriptionId) return;
    try {
      setCancelling(true);
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId: userData.stripeSubscriptionId }),
      });

      if (!res.ok) {
        throw new Error('Failed to cancel subscription.');
      }

      // Update Firestore to remove Pro access
      await updateDoc(doc(db, 'users', userData.uid), {
        isPro: false,
        stripeSubscriptionId: null,
      });

      setCancelled(true);
    } catch (err: any) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading || !userData) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin h-8 w-8 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">Account Settings</h1>
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="mb-4">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="mb-4">
            <strong>Status:</strong>{' '}
            {userData.isPro ? (
              <span className="text-green-600 font-semibold">✅ Pro User</span>
            ) : (
              <span className="text-gray-600">Free User</span>
            )}
          </p>

          {userData.isPro && userData.stripeSubscriptionId && (
            <button
              onClick={cancelSubscription}
              disabled={cancelling}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
            </button>
          )}

          {cancelled && (
            <p className="mt-4 text-green-600">✅ Subscription cancelled successfully.</p>
          )}
          {error && (
            <p className="mt-4 text-red-600 font-medium">{error}</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
