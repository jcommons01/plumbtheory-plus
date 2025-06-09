import { format } from 'date-fns'; // add this at the top if not already imported
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Layout from '@/components/Layout';
import Link from 'next/link';


// Define proper TypeScript interfaces for your data
interface QuizProgress {
  bestScore?: number;
  lastCorrect?: number;
  lastTotal?: number;
  seenIds?: string[];
  history?: any[]; // Replace with proper type if available
}

interface UserData {
  isPro?: boolean;
  stripeSubscriptionId?: string | null;
  quizProgress?: Record<string, QuizProgress>;
  createdAt?: string;
  currentPeriodEnd?: number; // 👈 Add this line
}


export default function AccountPage() {
  const { user, userData, setUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [billingDate, setBillingDate] = useState<string | null>(null);

  useEffect(() => {
  if (userData?.currentPeriodEnd) {
    const date = new Date(userData.currentPeriodEnd * 1000);
    setBillingDate(
      date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    );
  }
}, [userData]);

  
  // Simple quiz stats with no references to missing properties
  const quizStats = {
    totalQuizzesTaken: 0,
    averageScore: 0,
    topicsExplored: userData?.quizProgress ? Object.keys(userData.quizProgress).length : 0
  };
  
  // TS-safe version - Calculate stats from the data we actually have
  if (userData?.quizProgress) {
    const progress = userData.quizProgress;
    const topics = Object.keys(progress);
    
    let totalQuizzes = 0;
    let totalScoreSum = 0;
    
    topics.forEach(topic => {
      // Check if both lastCorrect and lastTotal exist and are numbers
      if (typeof progress[topic]?.lastCorrect === 'number' && 
          typeof progress[topic]?.lastTotal === 'number' && 
          progress[topic]?.lastTotal! > 0) {
        totalQuizzes++;
        totalScoreSum += (progress[topic]?.lastCorrect! / progress[topic]?.lastTotal!) * 100;
      }
    });
    
    quizStats.totalQuizzesTaken = totalQuizzes;
    quizStats.averageScore = totalQuizzes > 0 ? Math.round(totalScoreSum / totalQuizzes) : 0;
  }

  const handleCancel = async () => {
    if (!user?.uid) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid }),
      });

      const data = await res.json();

      if (data.success) {
        await updateDoc(doc(db, 'users', user.uid), {
          isPro: false,
          stripeSubscriptionId: null,
        });
        setSuccess(true);
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Cancel error:', err);
    }

    setLoading(false);
  };

  // Format date with proper type safety
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Mock renewal date that doesn't rely on non-existent properties
  const getRenewalDate = (): string => {
    return 'Next billing cycle';
  };

  return (
    <Layout title="Account | PlumbTheory+">
      {/* Dark navy background to match Topics page */}
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Account header section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
              <p className="text-gray-400">
                Manage your subscription and view your learning progress
              </p>
            </div>
            
            {/* Account info and navigation tabs */}
            <div className="bg-gray-800 rounded-t-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white break-words">{user?.email || 'Not logged in'}</h2>

                  <div className="flex items-center mt-1">
                    {userData?.isPro ? (
                      <span className="bg-blue-600 text-white text-xs py-1 px-3 rounded-full font-semibold">PRO</span>
                    ) : (
                      <span className="bg-gray-600 text-white text-xs py-1 px-3 rounded-full font-semibold">FREE</span>
                    )}
                    <span className="text-gray-400 text-sm ml-2">
                      {userData?.isPro ? 'Premium Access' : 'Limited Access'}
                    </span>
                  </div>
                </div>
              </div>
              
              {userData?.isPro ? (
                <div className="bg-blue-600 bg-opacity-20 rounded-lg p-3 text-sm">
                  <p className="text-blue-300">
                    <span className="font-semibold">Pro Subscription Active</span>
                  </p>
                </div>
              ) : (
                <Link href="/subscribe">
                  <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold transition cursor-pointer">
                    Upgrade to Pro
                  </div>
                </Link>
              )}
            </div>
            
            {/* Tab navigation */}
            <div className="bg-gray-800 border-b border-gray-700">
              <nav className="flex">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-6 focus:outline-none ${
                    activeTab === 'overview' 
                      ? 'border-b-2 border-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('progress')}
                  className={`py-4 px-6 focus:outline-none ${
                    activeTab === 'progress' 
                      ? 'border-b-2 border-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Learning Progress
                </button>
                <button 
                  onClick={() => setActiveTab('subscription')}
                  className={`py-4 px-6 focus:outline-none ${
                    activeTab === 'subscription' 
                      ? 'border-b-2 border-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Subscription
                </button>
              </nav>
            </div>
            
            {/* Tab content */}
            <div className="bg-gray-800 rounded-b-lg p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Account Overview</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-700 rounded-lg p-5">
                      <h4 className="text-sm uppercase text-gray-400 font-semibold mb-3">Account Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Email</span>
                          <span className="text-white break-words max-w-[180px] text-right">{user?.email || 'Not logged in'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Member Since</span>
                          <span className="text-white">
                            {userData?.createdAt ? formatDate(userData.createdAt) : 'Unknown'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 rounded-lg p-5">
                      <h4 className="text-sm uppercase text-gray-400 font-semibold mb-3">Learning Stats</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Quizzes Taken</span>
                          <span className="text-white">{quizStats.totalQuizzesTaken}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Average Score</span>
                          <span className="text-white">{quizStats.averageScore}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Topics Explored</span>
                          <span className="text-white">{quizStats.topicsExplored}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 rounded-lg p-5">
                    <h4 className="text-sm uppercase text-gray-400 font-semibold mb-3">Quick Actions</h4>
                    <div className="flex flex-wrap gap-3">
                      <Link href="/topics">
                        <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition cursor-pointer">
                          Continue Learning
                        </div>
                      </Link>
                      
                      {!userData?.isPro && (
                        <Link href="/subscribe">
                          <div className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition cursor-pointer">
                            Upgrade to Pro
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Learning Progress</h3>
                  
                  {quizStats.totalQuizzesTaken > 0 ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                          <p className="text-gray-400 text-sm">Total Quizzes</p>
                          <p className="text-3xl font-bold text-white">{quizStats.totalQuizzesTaken}</p>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                          <p className="text-gray-400 text-sm">Average Score</p>
                          <p className="text-3xl font-bold text-white">{quizStats.averageScore}%</p>
                        </div>
                        <div className="bg-gray-700 rounded-lg p-4 text-center">
                          <p className="text-gray-400 text-sm">Topics Explored</p>
                          <p className="text-3xl font-bold text-white">{quizStats.topicsExplored}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700 rounded-lg p-5 mb-6">
                        <h4 className="text-sm uppercase text-gray-400 font-semibold mb-3">Recent Activity</h4>
                        <p className="text-gray-300">Your recent quiz results will appear here.</p>
                        
                        <Link href="/topics">
                          <div className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition cursor-pointer inline-block">
                            Take Another Quiz
                          </div>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-700 rounded-lg p-8 text-center">
                      <div className="text-6xl mb-4">📝</div>
                      <h4 className="text-xl font-semibold mb-2">No Quiz History Yet</h4>
                      <p className="text-gray-400 mb-6">
                        You haven't taken any quizzes yet. Start learning to track your progress!
                      </p>
                      <Link href="/topics">
                        <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-sm font-semibold transition cursor-pointer inline-block">
                          Start Your First Quiz
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}
              
              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div>
                  <h3 className="text-xl font-semibold mb-6">Subscription Details</h3>
                  
                  <div className="bg-gray-700 rounded-lg p-5 mb-6">
                    <h4 className="text-sm uppercase text-gray-400 font-semibold mb-4">Current Plan</h4>
                    
                    <div className="flex items-center mb-6">
                      {userData?.isPro ? (
                        <>
                          <div className="w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="text-lg font-bold text-white">Pro Plan</h5>
                            <p className="text-gray-300">Full access to all features and content</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-lg bg-gray-600 flex items-center justify-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div>
                            <h5 className="text-lg font-bold text-white">Free Plan</h5>
                            <p className="text-gray-300">Limited access to content</p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    {userData?.isPro ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Status</span>
                          <span className="text-green-400 font-semibold">Active</span>
                        </div>
                        <div>
  <span className="text-gray-300 block">Next Billing Date</span>
  <span className="text-white">{billingDate || 'Loading...'}</span>

</div>

                        {userData?.stripeSubscriptionId && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Subscription ID</span>
                            <span className="text-xs text-gray-400 font-mono break-words max-w-[200px] text-right">
                         {userData.stripeSubscriptionId}
                            </span>

                          </div>
                        )}
                        
                        <div className="border-t border-gray-600 my-6 pt-6">
                          <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-all disabled:opacity-50 flex items-center"
                          >
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cancelling...
                              </>
                            ) : 'Cancel Subscription'}
                          </button>
                          
                          {success && (
  <div className="mt-4 flex items-center p-4 bg-green-600 bg-opacity-20 border border-green-500 text-green-300 rounded-lg animate-slide-in">
    <svg className="w-6 h-6 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <p className="text-sm">
      Your subscription has been successfully cancelled. You'll still have access until the end of your current billing period.
    </p>
  </div>
)}

                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Status</span>
                          <span className="text-gray-400">Free Plan</span>
                        </div>
                        
                        <div className="bg-blue-700 bg-opacity-20 rounded-lg p-4 border border-blue-800 mt-6">
                          <h5 className="text-lg font-semibold text-white mb-2">Upgrade to Pro</h5>
                          <ul className="space-y-2 mb-4">
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">Access to all Level 2, Level 3 and Gas topics</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">Real-life scenario training</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-300">Complete reference library</span>
                            </li>
                          </ul>
                          
                          <Link href="/subscribe">
                            <div className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-center font-semibold transition cursor-pointer">
                              Upgrade Now
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Support Section */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Need help?{' '}
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
