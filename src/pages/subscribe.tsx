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
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

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
  const handleSubscribe = async (planType: 'monthly' | 'annual' = selectedPlan) => {
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
          planType, // Add the plan type to your API
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
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Get unlimited access to all exam preparation materials and take your plumbing career to the next level
              </p>
            </div>

            {/* Plan Selection */}
            <div className="flex flex-col items-center mb-12">
              <div className="bg-gray-800 p-1.5 rounded-lg inline-flex mb-8">
                <button
                  onClick={() => setSelectedPlan('monthly')}
                  className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    selectedPlan === 'monthly'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedPlan('annual')}
                  className={`px-6 py-2.5 rounded-md text-sm font-semibold transition-all ${
                    selectedPlan === 'annual'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Annual <span className="text-xs text-green-400">Save 20%</span>
                </button>
              </div>

              {/* Main Pricing Card */}
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl max-w-md w-full">
                <div className="bg-blue-600 p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Pro Plan</h2>
                    <div className="bg-blue-500 rounded-full px-3 py-1 text-xs font-semibold">
                      RECOMMENDED
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline">
                    {selectedPlan === 'monthly' ? (
                      <>
                        <span className="text-4xl font-bold">£4.99</span>
                        <span className="text-lg ml-1">/month</span>
                      </>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">£47.90</span>
                        <span className="text-lg ml-1">/year</span>
                        <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                          SAVE £12.98
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4">
                    {[
                      { icon: '🎓', text: 'Complete Level 2 and Level 3 quizzes' },
                      { icon: '🔥', text: 'Full Gas Safety quiz library' },
                      { icon: '🛠️', text: 'Real-life scenario practice' },
                      { icon: '📊', text: 'Progress tracking and performance stats' },
                      { icon: '📚', text: 'Essential references and revision tools' },
                      { icon: '💬', text: 'Detailed explanations for all questions' },
                      { icon: '🔄', text: 'New topics and questions added regularly' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-xl mr-3">{item.icon}</span>
                        <span className="text-gray-300">{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe()}
                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-70 flex justify-center items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Redirecting to checkout...
                      </>
                    ) : (
                      `Subscribe Now - ${selectedPlan === 'monthly' ? '£4.99/month' : '£47.90/year'}`
                    )}
                  </button>
                  
                  <p className="text-center text-sm mt-3 text-gray-400">
                    Cancel anytime. No long-term commitment.
                  </p>
                  
                  {referral && (
                    <div className="mt-4 p-2 bg-green-900 bg-opacity-30 border border-green-700 rounded-md text-sm text-center text-green-400">
                      Referral code applied: <span className="font-mono">{referral}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-center mb-8">What Pro Members Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-5">
                  <p className="text-gray-300 italic mb-4">
                    "The Pro subscription gave me access to every topic I needed for my Gas Safe certification. Worth every penny!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      DM
                    </div>
                    <div>
                      <p className="font-semibold">Dave Mitchell</p>
                      <p className="text-xs text-gray-500">Gas Engineer, Manchester</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-5">
                  <p className="text-gray-300 italic mb-4">
                    "I passed my Level 3 with distinction thanks to the real-life scenarios in the Pro plan. The variety of questions prepared me for everything."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      SL
                    </div>
                    <div>
                      <p className="font-semibold">Sarah Lewis</p>
                      <p className="text-xs text-gray-500">Plumbing Apprentice, London</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-5">
                  <p className="text-gray-300 italic mb-4">
                    "The reference library alone is worth the subscription. Saved me countless hours looking up regulations and calculations."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      JT
                    </div>
                    <div>
                      <p className="font-semibold">James Turner</p>
                      <p className="text-xs text-gray-500">Plumbing Instructor, Birmingham</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="max-w-3xl mx-auto mb-16">
              <h3 className="text-xl font-semibold text-center mb-8">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Can I cancel my subscription?</h4>
                  <p className="text-gray-300">
                    Yes, you can cancel your subscription at any time from your account page. You'll continue to have Pro access until the end of your current billing period.
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold mb-2">How often is new content added?</h4>
                  <p className="text-gray-300">
                    We regularly update our content to reflect the latest exam standards and building regulations. New questions and topics are added monthly.
                  </p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-5">
                  <h4 className="font-semibold mb-2">Is my payment secure?</h4>
                  <p className="text-gray-300">
                    Yes, all payments are processed securely through Stripe, one of the world's leading payment processors. We never store your payment details.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA and Support */}
            <div className="text-center">
              <button
                onClick={() => handleSubscribe()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-70"
                disabled={loading}
              >
                {loading ? 'Redirecting...' : 'Start Your Pro Membership Today'}
              </button>
              
              <p className="mt-6 text-sm text-gray-400">
                Questions about subscribing?{' '}
                <a
                  href="mailto:plumbtheory@gmail.com"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
