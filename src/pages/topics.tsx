import { motion, AnimatePresence } from 'framer-motion'; // ✅ At the top of the file
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import TopicCard from '@/components/TopicCard';
import { useAuth } from '@/contexts/AuthProvider';
import UpgradeModal from '../components/UpgradeModal';
import { topics as allTopics } from '@/data/topics';

interface Topic {
  id: string;
  title: string;
  icon: string;
  isPro: boolean;
  level: number;
  totalQuestions: number;
  trade?: string;
  whatYoullLearn?: string[]; // Add this field
}

const TRADE_LEVELS = [
  { name: 'Plumbing', levels: [2, 3], color: 'bg-[#3B82F6]' },         // Blue (cold)
  { name: 'Gas', levels: [], color: 'bg-[#0EA5E9]' },                  // Sky blue
  { name: 'Electrical', levels: [2, 3], color: 'bg-[#06B6D4]' },       // Aqua
  { name: 'HVAC', levels: [2, 3], color: 'bg-[#F97316]' },             // Orange
  { name: 'Joinery', levels: [2, 3], color: 'bg-[#FB923C]' },          // Light orange
  { name: 'Bricklaying', levels: [2, 3], color: 'bg-[#EF4444]' },      // Red
  { name: 'Building Regulations', levels: [], color: 'bg-[#DC2626]' },// Deep red
  { name: 'CSCS', levels: [], color: 'bg-[#991B1B]' },                 // Dark red (hottest)
];




export default function Topics() {
  const router = useRouter();
  const { userData, loading } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [selectedTrade, setSelectedTrade] = useState('Plumbing');
  useEffect(() => {
  const savedTrade = localStorage.getItem('lastSelectedTrade');
  if (savedTrade) {
    setSelectedTrade(savedTrade);
  }
}, []);

useEffect(() => {
  localStorage.setItem('lastSelectedTrade', selectedTrade);
}, [selectedTrade]);

  const [selectedLevel, setSelectedLevel] = useState<number>(2);
  // Persist selected level per session
useEffect(() => {
  const savedLevel = localStorage.getItem('lastSelectedLevel');
  if (savedLevel) {
    setSelectedLevel(Number(savedLevel));
  }
}, []);

useEffect(() => {
  localStorage.setItem('lastSelectedLevel', selectedLevel.toString());
}, [selectedLevel]);

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    setTopics(allTopics);
  }, []);
  
  

  useEffect(() => {
    if (selectedTrade === 'Gas') {
      setSelectedLevel(99);
      return;
    }
  
    const tradeInfo = TRADE_LEVELS.find(t => t.name === selectedTrade);
  
    if (tradeInfo && tradeInfo.levels && tradeInfo.levels.length > 0) {
      setSelectedLevel(tradeInfo.levels[0]);
    } else {
      setSelectedLevel(0); // For trades like CSCS or Building Regs
    }
  }, [selectedTrade]);
  
  
  


  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
        </div>
      </Layout>
    );
  }

  const openQuizOptions = (topic: Topic) => {
    if (topic.isPro && !userData?.isPro) {
      setIsUpgradeModalOpen(true);
    } else {
      setSelectedTopic(topic);
    }
  };

  const startQuiz = () => {
    if (selectedTopic) {
      router.push(`/quiz/${selectedTopic.id}?amount=${questionCount}`);
    }
  };

  const renderTopics = () => {
  const filtered = topics
    .filter((t) =>
      selectedTrade === 'Building Regulations'
        ? t.trade === 'Building Regulations'
        : t.trade === selectedTrade && t.level === selectedLevel
    )
    .sort((a, b) => Number(a.isPro) - Number(b.isPro));

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${selectedTrade}-${selectedLevel}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filtered.map((topic) => {
          const progressData = userData?.quizProgress?.[topic.id] || {};
          const lastCorrect = progressData.lastCorrect ?? null;
          const lastTotal = progressData.lastTotal ?? null;
          const seenIds = progressData.seenIds || [];

          const hasAttempted = lastCorrect !== null && lastTotal !== null;
          const percentage =
            hasAttempted && lastTotal > 0
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
              level={topic.level}
              onClick={() => openQuizOptions(topic)}
              whatYoullLearn={topic.whatYoullLearn} // Pass this prop
            />
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};

  
  

  return (
    <Layout>
      {/* Apply dark mode styles to the container */}
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-white">Choose Your Trade & Level</h1>
          
          {/* Trade Selection - UPDATED with consistent blue */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 px-2">
  {TRADE_LEVELS.map(({ name, color }) => (
    <button
      key={name}
      className={`w-full py-3 rounded-xl text-sm font-semibold transition text-center ${
        selectedTrade === name 
          ? `${color} text-white shadow` 
          : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-blue-500'
      }`}
      onClick={() => setSelectedTrade(name)}
    >
      {name}
    </button>
  ))}
</div>

          
          {/* Level Selection (hide for trades without levels) */}
{(() => {
  const currentTrade = TRADE_LEVELS.find((t) => t.name === selectedTrade);

const hasLevels = !!(currentTrade?.levels && currentTrade.levels.length > 0);

  return (
    <>
      {/* Show level buttons if the trade has levels */}
      {hasLevels && (
        <div className="flex justify-center mb-2">
          <div className="inline-flex items-center bg-gray-800 p-1 rounded-lg">
            {currentTrade!.levels.map((level) => (
              <button
                key={level}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  selectedLevel === level
                    ? level === 2
                      ? 'bg-green-700 text-white shadow'
                      : 'bg-red-700 text-white shadow'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                {`Level ${level}`}
              </button>
            ))}
          </div>
        </div>
      )}

    </>
  );
})()}


          
          {/* Reference Library Button - Kept the original emerald style as it's a distinct action */}
          
          
          {/* Topics Grid */}
          {renderTopics()}
          
          <AnimatePresence>
  {selectedTopic && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full border border-gray-700"
      >
        <h2 className="text-xl font-bold mb-6 text-white text-center">
          How many questions for {selectedTopic.title}?
        </h2>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[5, 10, 15, 25, 50]
            .filter((amount) => amount <= (selectedTopic?.totalQuestions || 50))
            .map((amount) => (
              <button
                key={amount}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  questionCount === amount
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setQuestionCount(amount)}
              >
                {amount} Questions
              </button>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={startQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors w-full"
          >
            Start Quiz
          </button>
          <button
            onClick={() => setSelectedTopic(null)}
            className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors w-full"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

          
          {/* Upgrade Modal - Original component preserved */}
          <UpgradeModal
            isOpen={isUpgradeModalOpen}
            onClose={() => setIsUpgradeModalOpen(false)}
            onUpgrade={() => console.log('Upgrade action triggered')}
          />
        </div>
      </div>
    </Layout>
  );
}
