import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const { user, userData } = useAuth();
  const [showBanner, setShowBanner] = useState(true);

  const handleStartLearning = () => {
    if (user) {
      router.push('/topics');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <Head>
        <title>PlumbTheory+ | Plumb Theory | UK Plumbing & Gas Exam Preparation</title>
        <meta
          name="description"
          content="Prepare for your Level 2, Level 3, and Gas Plumbing exams with PlumbTheory+. Practice quizzes, detailed explanations, and reference tools."
        />
        <meta property="og:title" content="PlumbTheory+ | UK Plumbing & Gas Exam Prep" />
        <meta property="og:description" content="Revise smarter for UK plumbing and gas exams with quizzes, scenarios, and reference tools." />
        <meta property="og:image" content="https://plumbtheory.co.uk/og-image.png" />
        <meta property="og:url" content="https://plumbtheory.co.uk/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PlumbTheory+ | UK Plumbing & Gas Exam Prep" />
        <meta name="twitter:description" content="Practice quizzes, exam prep, and references for UK plumbing and gas students." />
        <meta name="twitter:image" content="https://plumbtheory.co.uk/og-image.png" />
      </Head>

      <Layout>
        {/* Changed background to match the Topics page dark navy */}
        <div className="min-h-screen bg-gray-900">
          <div className="container mx-auto px-4 py-12">
            {/* Banner for non-Pro users */}
            {user && !userData?.isPro && showBanner && (
              <div className="bg-blue-900 bg-opacity-30 border border-blue-700 text-white px-6 py-4 rounded-lg mb-6 relative">
              <span className="block sm:inline">
                🔒 You’re on the free plan. Unlock all trade topics, mock exams, and real-life scenarios by{' '}
                <a href="/subscribe" className="underline font-semibold text-blue-400 hover:text-blue-300">upgrading to Pro</a>.
              </span>
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-2 right-4 text-white hover:text-blue-300 font-bold text-2xl leading-none"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
            
            )}

            {/* Main content - Updated with white text for dark background */}
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
              The Go-To Revision App for UK Trades
              </h1>
              <p className="text-lg text-gray-300 mb-8">
              PlumbTheory+ gives you instant access to over <strong>4,000 expert-level questions across Plumbing, Gas, Electrical, HVAC, Joinery, Bricklaying, Building Regulations, and CSCS</strong> — plus full mock exams, real-world scenarios, and essential trade reference guides.
</p>
              
              {/* List items with white background cards */}
              {/* Key feature list */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
  <div className="bg-white rounded-xl px-4 py-3 flex items-center shadow-sm">
    <span className="text-xl mr-3">📘</span>
    <span className="text-sm text-gray-800">Efficient trade revision</span>
  </div>
  <div className="bg-white rounded-xl px-4 py-3 flex items-center shadow-sm">
    <span className="text-xl mr-3">👷‍♂️</span>
    <span className="text-sm text-gray-800">By industry experts</span>
  </div>
  <div className="bg-white rounded-xl px-4 py-3 flex items-center shadow-sm">
    <span className="text-xl mr-3">✅</span>
    <span className="text-sm text-gray-800">Multiple choice revision</span>
  </div>
  <div className="bg-white rounded-xl px-4 py-3 flex items-center shadow-sm">
    <span className="text-xl mr-3">📈</span>
    <span className="text-sm text-gray-800">For committed learners</span>
  </div>
</div>




              
              {/* Button with exact blue from Topics page */}
              <button
                onClick={handleStartLearning}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all"
              >
                Start Learning
              </button>
            </div>

            {/* SEO Text Section - Updated with white text for dark background */}
            <section className="py-12 px-4 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-white">Welcome to PlumbTheory+</h2>
              <p className="text-lg mb-4 text-gray-300">
              PlumbTheory+ is the complete revision platform for UK tradespeople and students. Whether you're preparing for Plumbing, Gas, Electrical, HVAC, Joinery, Bricklaying, Building Regulations or CSCS exams, our app provides tailored quizzes, mock exams, and real-life scenario questions designed to help you succeed.
              </p>
              <p className="text-lg text-gray-300">
  Go beyond revision with access to trusted reference content including pipe sizing, system layouts, minimum gradients, regulations, fault codes, and more. Each question comes with clear explanations and instant feedback, while your progress is tracked automatically. Built for serious learners, PlumbTheory+ helps you revise with purpose and confidence.
</p>
            </section>

            {/* Testimonials Section - New addition */}
            <section className="py-12 px-4 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-white text-center mb-10">What Our Users Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      MJ
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Mike Johnson</h3>
                      <p className="text-sm text-gray-600">Level 3 Plumbing Apprentice, Birmingham</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "I was struggling with calculations on my Level 3 course. After using PlumbTheory+ for a month, my test scores jumped from 60% to 88%. The way they break down the formulas made everything click for me."
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      ST
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Sam Thompson</h3>
                      <p className="text-sm text-gray-600">Gas Safe Engineer, Manchester</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "Used this to refresh my knowledge before my Gas Safe reassessment. The gas safety scenarios were spot on - exactly the kind of situations that come up in the practical assessments. Well worth the subscription."
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      LD
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Laura Davies</h3>
                      <p className="text-sm text-gray-600">Level 2 Student, London College</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "As a woman entering the trade, I wanted to be extra prepared. PlumbTheory+ gave me the confidence to ace my exams. The reference materials alone saved me countless hours of flipping through textbooks."
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                      RK
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Rob Kelly</h3>
                      <p className="text-sm text-gray-600">Plumbing Lecturer, Yorkshire</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">
                    "I recommend PlumbTheory+ to all my students. The questions match the exam board style perfectly, and the tracking helps me see who's putting in the work. It's been a fantastic teaching aid."
                  </p>
                </div>
              </div>
            </section>

            {/* Features Section - Updated with white cards on dark background */}
           {/* Features Section - Updated with dark text on white cards */}
<div className="mt-20">
  <h2 className="text-2xl font-bold text-white text-center mb-8">Features</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-blue-600 text-4xl mb-4">📝</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Topic-Based Quizzes</h3>
      <p className="text-gray-700">
        Practice quizzes for Plumbing, Gas, Electrical, HVAC, Joinery, Bricklaying, Building Regs, and CSCS — all aligned with real exam standards.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-blue-600 text-4xl mb-4">📚</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Reference Resources</h3>
      <p className="text-gray-700">
        Quick reference tools for pipe sizing, electrical ratings, ventilation, regulations, system specs, and more.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-blue-600 text-4xl mb-4">📊</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Progress Tracking</h3>
      <p className="text-gray-700">
        Track your performance with instant feedback and detailed analytics.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-blue-600 text-4xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">Detailed Explanations</h3>
      <p className="text-gray-700">
        Understand every question deeply with full explanations provided after quizzes.
      </p>
    </div>
  </div>
</div>

{/* FAQ Section - Fixed heading color */}
<section className="py-16 px-4 mt-16">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently Asked Questions</h2>

    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">What is PlumbTheory+?</h3>
      <p className="text-gray-700">
        PlumbTheory+ is an online revision platform designed to help UK trade students prepare for their Level 2, Level 3, and Gas exams with quizzes, explanations, and essential resources. It covers a range of different trades.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Is PlumbTheory+ free?</h3>
      <p className="text-gray-700">
        Yes! Some topics are available for free. Full access to all the Level 2, Level 3, Gas topics, real-life scenarios, and other subjects require a Pro subscription.
      </p>
    </div>

    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Can PlumbTheory+ help me pass my exams?</h3>
      <p className="text-gray-700">
        Absolutely! Our platform is built around UK exam standards and current Building Regulations, giving you the best tools to pass confidently.
      </p>
    </div>
  </div>
</section>


            {/* Call to Action - Added at the bottom */}
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-6">Ready to Pass Your Exams?</h2>
              <button
                onClick={handleStartLearning}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md shadow-md transition-all"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
