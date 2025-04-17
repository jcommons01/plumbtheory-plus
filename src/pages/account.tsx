import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';

export default function AccountPage() {
  const { user, userData, loading } = useAuth();
  const [error, setError] = useState('');
  const [loadingPortal, setLoadingPortal] = useState(false);
  const router = useRouter();

  const openCustomerPortal = async () => {
    try {
      if (!userData?.stripeCustomerId) {
        setError('Stripe customer ID not found.');
        return;
      }

      setLoadingPortal(true);

      const res = await fetch('/api/create-customer-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeCustomerId: userData.stripeCustomerId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError('Failed to open billing portal.');
        setLoadingPortal(false);
      }
    } catch (err) {
      console.error('Billing portal error:', err);
      setError('Something went wrong. Try again.');
      setLoadingPortal(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-10 w-10 rounded-full border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!user || !userData) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">Not Logged In</h1>
          <p className="text-gray-600 mb-6">Please login to access your account.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">My Account</h1>

        <div className="bg-white shadow-md rounded p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{userData.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Subscription</p>
            <p className="font-medium">
              {userData.isPro ? 'Pro Active' : 'Free User'}
            </p>
          </div>

          {userData.trialActive && !userData.isPro && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded text-sm">
              🎉 You're currently on your 3-day free trial.
            </div>
          )}

          {userData.isPro && (
            <button
              onClick={openCustomerPortal}
              disabled={loadingPortal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {loadingPortal ? 'Opening...' : 'Manage Subscription'}
            </button>
          )}

          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </Layout>
  );
}
