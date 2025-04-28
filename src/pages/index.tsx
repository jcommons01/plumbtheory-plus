import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

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
        <title>PlumbTheory+ | Plumb Theory | UK Plumbing Exam Preparation</title>
        <meta name="description" content="Prepare for your Level 2 and Level 3 Plumbing exams with PlumbTheory+. Practice quizzes, detailed explanations, and reference tools." />

        <meta property="og:title" content="PlumbTheory+ | UK Plumbing Exam Prep" />
        <meta property="og:description" content="Revise smarter for UK plumbing exams with quizzes, scenarios, and reference tools." />
        <meta property="og:image" content="https://plumbtheory.co.uk/og-image.png" />
        <meta property="og:url" content="https://plumbtheory.co.uk/" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PlumbTheory+ | UK Plumbing Exam Prep" />
        <meta name="twitter:description" content="Practice quizzes, exam prep, and references for UK plumbers." />
        <meta name="twitter:image" content="https://plumbtheory.co.uk/og-image.png" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              {/* Updated Hero Section */}
              <h1 className="text-4xl font-bold text-blue-600 mb-4">
                Pass Your UK Plumbing Exams With Confidence
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                PlumbTheory+ gives you instant access to over <strong>700+ professional Level 2 and Level 3 questions</strong>, full mock exams, real-life scenario training, and essential reference guides.
              </p>
              <ul className="text-gray-700 text-lg list-none space-y-2 mb-8">
                <li>🚿 Designed for serious students.</li>
                <li>🚰 Built by real plumbing professionals.</li>
                <li>🎯 Smash your exams with focused, smart revision.</li>
              </ul>
              <button
                onClick={handleStartLearning}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all"
              >
                Start Learning
              </button>
            </div>

            {/* SEO Text Section */}
            <section className="py-12 px-4 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Welcome to PlumbTheory+</h2>
              <p className="text-lg mb-4">
                PlumbTheory+ is the leading online resource for UK Level 2 and Level 3 plumbing students. Our app offers a full range of Plumb Theory quizzes, mock exams, real-life scenario questions, and revision support across all key plumbing topics.
                Whether you're preparing for cold water systems, hot water systems, central heating, drainage, environmental technologies, scientific principles, or domestic fuels, PlumbTheory+ has everything you need to succeed.
              </p>
              <p className="text-lg">
                In addition to quizzes, we offer essential reference material covering topics like pipe clipping distances, minimum waste falls, system pressures, boiler fault codes, and more. Prepare for your exams the smart way — with targeted quizzes, detailed explanations, instant feedback, and complete progress tracking.
              </p>
            </section>

            {/* Features Section */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-500 text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2">Topic-Based Quizzes</h3>
                  <p className="text-gray-700">
                    Practice with quizzes on Level 2 and Level 3 plumbing topics, built around real exam standards.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-500 text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-semibold mb-2">Reference Resources</h3>
                  <p className="text-gray-700">
                    Access quick reference tools including pipe sizing, waste falls, pressures, system diagrams, and regulations.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-500 text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                  <p className="text-gray-700">
                    Monitor your improvement with detailed tracking and performance insights across all topics.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-blue-500 text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">Detailed Explanations</h3>
                  <p className="text-gray-700">
                    Learn why each answer is correct with full question explanations to deepen your understanding.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="py-16 px-4 bg-gray-100 mt-16">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-center mb-10">Frequently Asked Questions</h2>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">What is PlumbTheory+?</h3>
                  <p className="text-gray-700">
                    PlumbTheory+ is an online platform designed to help UK plumbing students revise for their Level 2 and Level 3 exams with quizzes, explanations, and essential reference materials.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Is PlumbTheory+ free?</h3>
                  <p className="text-gray-700">
                    Yes! Cold Water and Hot Water quizzes are free to access. Full access to all topics, Level 2 questions, real-life scenarios, and reference materials is available with a Pro subscription.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-2">Can PlumbTheory+ help me pass my plumbing exams?</h3>
                  <p className="text-gray-700">
                    Absolutely! Our quizzes and references are built around real-world exam content and UK building regulations, helping you study smarter and retain critical knowledge.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}