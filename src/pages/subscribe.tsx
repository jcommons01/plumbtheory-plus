// ✅ Rewardful TypeScript global declarations
declare global {
  interface Window {
    rewardful: any;
    Rewardful: {
      referral: string;
    };
  }
}

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';

export default function SubscribePage() {
  const { userData } = useAuth();
  const [referral, setReferral] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Capture Rewardful referral ID from browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tryGetReferral = () => {
        try {
          if (window.rewardful) {
            window.rewardful('ready', () => {
              if (window.Rewardful?.referral) {
                setReferral(window.Rewardful.referral);
                console.log('✅ Referral detected:', window.Rewardful.referral);
              }
            });
          }
        } catch (err) {
          console.warn('⚠️ Rewardful referral fetch failed:', err);
        }
      };

      tryGetReferral();
    }
  }, []);

  // ✅ Handle Subscribe button click
  const handleSubscribe = async () => {
    if (!userData?.uid || !userData?.email) {
      alert('You must be logged in to subscribe.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData.uid,
          userEmail: userData.email,
          referral,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Upgrade to Pro | PlumbTheory+">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Unlock Full Access</h1>
          <p className="text-lg text-gray-700 mb-6">
            Get unlimited access to all Plumbing and Gas quizzes, mock exams, real-life scenario questions,
            essential reference resources, and exclusive Pro-only content.
          </p>

          <ul className="text-left text-gray-700 mb-8 space-y-3">
            <li>✅ Level 2 and Level 3 full quizzes</li>
            <li>✅ Full Gas Safety quiz library</li>
            <li>✅ Real-life scenario practice</li>
            <li>✅ Progress tracking and performance stats</li>
            <li>✅ Essential references and revision tools</li>
            <li>✅ Instant feedback with detailed explanations</li>
            <li>✅ New topics and questions added regularly</li>
          </ul>

          <button
            onClick={handleSubscribe}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-all"
            disabled={loading}
          >
            {loading ? 'Redirecting…' : 'Subscribe for £9.99/month'}
          </button>

          {referral && (
            <p className="mt-4 text-sm text-green-600">
              Referral detected: <span className="font-mono">{referral}</span>
            </p>
          )}

          <p className="text-sm text-gray-500 mt-6 relative z-10">
            Cancel anytime. Questions?{' '}
            <a
              href="mailto:plumbtheory@gmail.com"
              className="underline hover:text-indigo-700"
            >
              Contact Support
            </a>
            <br />
            <span className="text-xs text-gray-400">
              (If the link doesn’t work, email us directly at{' '}
              <code className="font-mono text-gray-600">plumbtheory@gmail.com</code>)
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
