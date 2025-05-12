import Layout from '@/components/Layout';
import TopicCard from '@/components/TopicCard';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthProvider';
import { useState } from 'react';
import UpgradeModal from '@/components/UpgradeModal';

const gasTopics = [
  { id: 'domestic-gas-safety', title: 'Domestic Gas Safety', icon: '🏠' },
  { id: 'gas-pipe-sizing', title: 'Gas Pipe Sizing', icon: '📏' },
  { id: 'ventilation-requirements', title: 'Ventilation Requirements', icon: '🌬️' },
  { id: 'flueing-requirements', title: 'Flueing Requirements', icon: '🏭' },
  { id: 'gas-appliance-types', title: 'Gas Appliance Types', icon: '🔥' },
  { id: 'tightness-testing-purging', title: 'Tightness Testing & Purging', icon: '🧪' },
  { id: 'combustion-analysis', title: 'Combustion Analysis', icon: '🧯' },
  { id: 'building-regulations', title: 'Building Regulations (Part J)', icon: '🏢' },
  { id: 'unsafe-situations', title: 'Unsafe Situations', icon: '⚠️' },
  { id: 'emergency-procedures', title: 'Emergency Procedures', icon: '🚨' },
];

export default function GasTopicsPage() {
  const router = useRouter();
  const { userData } = useAuth();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const openQuizOptions = (id: string) => {
    if (!userData?.isPro) {
      setIsUpgradeModalOpen(true);
    } else {
      setSelectedTopic(id);
    }
  };

  const startQuiz = () => {
    if (selectedTopic) {
      router.push(`/quiz/${selectedTopic}?amount=${questionCount}`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Gas Topics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gasTopics.map((topic) => (
            <TopicCard
            key={topic.id}
            title={topic.title}
            icon={topic.icon}
            progress={0}
            caption="No attempts yet"
            isPro={true}
            isUserPro={!!userData?.isPro}
            level={99} // ✅ Add this line
            onClick={() => openQuizOptions(topic.id)}
          />
          
          ))}
        </div>

        {selectedTopic && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">
                How many questions?
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

        <UpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
          onUpgrade={() => console.log('Upgrade action triggered')}
        />
      </div>
    </Layout>
  );
}
