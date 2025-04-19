import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth(); // ✅ removed unused `loading`

  const handleStartLearning = () => {
    if (user) {
      router.push('/topics');
    } else {
      router.push('/login');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">PlumbTheory+</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Prepare for your plumbing exams
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              PlumbTheory+ helps UK plumbing students prepare for their Level 3 exams with interactive
              quizzes, progress tracking, and comprehensive coverage of all exam topics.
            </p>
            <button
              onClick={handleStartLearning}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-md transition-all"
            >
              Start Learning
            </button>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-500 text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">Topic-Based Quizzes</h3>
                <p className="text-gray-700">
                  Practice with quizzes on 9 key plumbing topics covered in Level 3 exams.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-500 text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-gray-700">
                  Monitor your improvement with detailed progress tracking.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-500 text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Detailed Explanations</h3>
                <p className="text-gray-700">
                  Get comprehensive explanations for each question.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
