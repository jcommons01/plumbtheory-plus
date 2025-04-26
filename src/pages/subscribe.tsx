// ✅ Add Rewardful global declarations for TypeScript
declare const rewardful: any;
declare const Rewardful: {
  referral: string;
};

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';

export default function SubscribePage() {
  const { userData } = useAuth();
  const [referral, setReferral] = useState<string | null>(null);

  // ✅ Load referral ID on mount from Rewardful
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof rewardful !== 'undefined') {
      rewardful('ready', function () {
        if (typeof Rewardful !== 'undefined' && Rewardful.referral) {
          setReferral(Rewardful.referral);
        }
      });
    }
  }, []);

  const handleSubscribe = async () => {
    if (!userData?.uid || !userData?.email) {
      alert('You must be logged in to subscribe.');
      return;
    }

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.uid,
          userEmail: userData.email,
          referral, // ✅ Include Rewardful referral ID
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Something went wrong.');
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (error: any) {
      console.error('❌ Subscription error:', error.message);
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <Layout title="Upgrade to Pro | PlumbTheory+">
      <div className="max-w-xl mx-auto text-center mt-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Upgrade to PlumbTheory+</h1>
        <p className="mb-8 text-lg text-gray-600">
          Unlock full access to all topics, advanced questions, and tools.
        </p>
        <button
          onClick={handleSubscribe}
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-all"
        >
          Subscribe for £4.99/month
        </button>
      </div>
    </Layout>
  );
}
