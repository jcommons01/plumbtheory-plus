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
  level: number;
  totalQuestions: number;
};

export default function Topics() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [showBanner, setShowBanner] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<number>(2); // 🔥 Default to Level 2

  useEffect(() => {
    const topicsData: Topic[] = [
      // Level 2 Topics
      { id: 'level2-cold-water', title: 'Cold Water (L2)', icon: '💧', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-health-safety', title: 'Health & Safety (L2)', icon: '⚠️', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-common-principles', title: 'Common Principles (L2)', icon: '🔧', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-central-heating', title: 'Central Heating (L2)', icon: '🔥', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-drainage-sanitation', title: 'Drainage & Sanitation (L2)', icon: '🚽', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-hot-water', title: 'Hot Water (L2)', icon: '♨️', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-electrical', title: 'Electrical (L2)', icon: '⚡', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-rainwater', title: 'Rainwater (L2)', icon: '🌧️', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-real-life-scenarios', title: 'Real Life Scenarios (L2)', icon: '🛠️', isPro: false, level: 2, totalQuestions: 25 },
      { id: 'level2-scientific-principles', title: 'Scientific Principles (L2)', icon: '🔬', isPro: false, level: 2, totalQuestions: 25 },

      // Level 3 Topics
      { id: 'cold-water', title: 'Cold Water', icon: '💧', isPro: false, level: 3, totalQuestions: 50 },
      { id: 'hot-water', title: 'Hot Water', icon: '🔥', isPro: false, level: 3, totalQuestions: 50 },
      { id: 'central-heating', title: 'Central Heating', icon: '🔥', isPro: true, level: 3, totalQuestions: 50 },
      { id: 'drainage-sanitation', title: 'Drainage & Sanitation', icon: '🚿', isPro: true, level: 3, totalQuestions: 50 },
      { id: 'rainwater', title: 'Rainwater', icon: '☔', isPro: true, level: 3, totalQuestions: 50 },
      { id: 'electrical', title: 'Electrical', icon: '⚡', isPro: true, level: 3, totalQuestions: 50 },
      { id: 'domestic-fuels', title: 'Domestic Fuels', icon: '⛽', isPro: true, level: 3, totalQuestions: 50 },
      { id: 'environmental-technologies', title: 'Environmental Technologies', icon: '🌱', isPro: true, level: 3, totalQuestions: 50 },
      { id: 'calculation-questions', title: 'Calculation Questions', icon: '🧮', isPro: true, level: 3, totalQuestions: 50 },
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
    const hasAccess = !topic.isPro || userData?.isPro;
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

  const renderTopics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics
        .filter((topic) => topic.level === selectedLevel)
        .map((topic) => {
          const progressData = userData?.quizProgress?.[topic.id] || {};
          const lastCorrect = progressData.lastCorrect ?? null;
          const lastTotal = progressData.lastTotal ?? null;
          const seenIds = progressData.seenIds || [];

          const hasAttempted = lastCorrect !== null && lastTotal !== null;
          const percentage = hasAttempted && lastTotal > 0
            ? Math.round((lastCorrect / lastTotal) * 100)
            : 0;

          const caption = hasAttempted
            ? `${lastCorrect}/${lastTotal} - Last attempt\nSeen: ${seenIds.length} questions`
            : 'No attempts yet';

          return (
            <TopicCard
              key={topic.id}
              title={topic.title}
              icon={topic.icon}
              progress={percentage}
              caption={caption}
              isPro={topic.isPro}
              isUserPro={!!userData?.isPro}
              onClick={() => openQuizOptions(topic)}
            />
          );
        })}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Level</h1>

        {/* 📣 Tiny Marketing Banner */}
        {showBanner && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-md mb-8 relative">
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-2 right-3 text-yellow-600 hover:text-yellow-800"
            >
              ✕
            </button>
            <p className="font-semibold">
              🆕 Now Live: <span className="font-bold">Level 2 Plumbing Topics</span>! Start revising today.
            </p>
          </div>
        )}

        {/* 🚀 Level Toggle Switch */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center bg-gray-100 p-1 rounded-full">
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedLevel === 2 ? 'bg-blue-600 text-white' : 'text-gray-700'
              }`}
              onClick={() => setSelectedLevel(2)}
            >
              Level 2
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedLevel === 3 ? 'bg-green-600 text-white' : 'text-gray-700'
              }`}
              onClick={() => setSelectedLevel(3)}
            >
              Level 3
            </button>
          </div>
        </div>

        {/* 📚 NEW: Reference Library Button */}
        <div className="flex justify-center mb-8">
          <a
            href="/references"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
          >
            📚 Visit Reference Library
          </a>
        </div>

        {/* 🔥 Render Topics for selected Level */}
        {renderTopics()}

        {/* Question Amount Modal */}
        {selectedTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                How many questions for {selectedTopic.title}?
              </h2>

              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[5, 10, 15, 25, 50]
                  .filter((amount) => amount <= (selectedTopic?.totalQuestions || 50))
                  .map((amount) => (
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
