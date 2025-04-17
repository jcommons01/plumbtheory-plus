// src/pages/topics.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import TopicCard from '@/components/TopicCard';
import { useAuth } from '@/contexts/AuthProvider';

type Topic = {
  id: string;
  title: string;
  icon: string;
  isPro: boolean;
};

export default function Topics() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);

  useEffect(() => {
    const topicsData: Topic[] = [
      { id: 'cold-water', title: 'Cold Water', icon: '💧', isPro: false },
      { id: 'hot-water', title: 'Hot Water', icon: '🔥', isPro: true },
      { id: 'central-heating', title: 'Central Heating', icon: '🔥', isPro: true },
      { id: 'drainage-sanitation', title: 'Drainage & Sanitation', icon: '🚿', isPro: true },
      { id: 'rainwater', title: 'Rainwater', icon: '☔', isPro: true },
      { id: 'electrical', title: 'Electrical', icon: '⚡', isPro: true },
      { id: 'domestic-fuels', title: 'Domestic Fuels', icon: '⛽', isPro: true },
      { id: 'environmental-technologies', title: 'Environmental Technologies', icon: '🌱', isPro: true },
      { id: 'calculation-questions', title: 'Calculation Questions', icon: '🧮', isPro: true },
    ];
    setTopics(topicsData);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  const openQuizOptions = (topic: Topic) => {
    const hasAccess =
      !topic.isPro || (userData?.isPro || userData?.trialActive);

    if (!hasAccess) {
      router.push('/subscribe');
    } else {
      setSelectedTopic(topic);
    }
  };

  const startQuiz = () => {
    if (selectedTopic) {
      router.push(`/quiz/${selectedTopic.id}?amount=${questionCount}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Plumbing Topics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              title={topic.title}
              icon={topic.icon}
              progress={userData?.quizProgress?.[topic.title] || 0}
              isPro={topic.isPro}
              isUserPro={userData?.isPro || userData?.trialActive || false}
              onClick={() => openQuizOptions(topic)}
            />
          ))}
        </div>

        {/* Question Amount Modal */}
        {selectedTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                How many questions for {selectedTopic.title}?
              </h2>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[5, 10, 15, 25, 50].map((amount) => (
                  <button
                    key={amount}
                    className={`px-4 py-2 rounded border text-sm font-medium transition ${
                      questionCount === amount
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setQuestionCount(amount)}
                  >
                    {amount} Questions
                  </button>
                ))}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={startQuiz}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Start Quiz
                </button>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
