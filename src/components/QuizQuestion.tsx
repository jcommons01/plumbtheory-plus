import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthProvider';
import { toggleBookmark } from '@/lib/bookmark';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface QuizQuestionProps {
  question: {
    id?: string;
    text: string;
    options: string[];
    correctAnswer?: string;
    explanation?: string;
    topicId?: string;
  };
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [reportSent, setReportSent] = useState(false);

  const handleBookmark = async () => {
    if (!user || !question.id) return;
    await toggleBookmark(user.uid, question.id, bookmarked);
    setBookmarked(!bookmarked);
  };

  const handleReportQuestion = async () => {
  if (!question.id) return;
  try {
    await addDoc(collection(db, 'questionReports'), {
      questionId: question.id,
      topicId: question.topicId || null,
      questionText: question.text,
      options: question.options,
      correctAnswer: question.correctAnswer,
      reportText: 'Auto-reported for review',
      timestamp: serverTimestamp(),
      userId: user?.uid || 'anonymous',
    });
    setReportSent(true);
    setTimeout(() => setReportSent(false), 3000);
  } catch (error) {
    console.error('Error reporting question:', error);
  }
};


  const normalizedCorrect = question.correctAnswer?.trim().toLowerCase();

  useEffect(() => {
    const shuffled = [...question.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledOptions(shuffled);
  }, [question.id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      {/* ⭐ Bookmark Button */}
      {question.id && (
        <button
          onClick={handleBookmark}
          className={`absolute top-4 right-4 text-2xl transition ${
            bookmarked ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
          }`}
          title={bookmarked ? 'Unbookmark' : 'Bookmark'}
        >
          ★
        </button>
        
      )}


      <h2 className="text-xl font-bold mb-4">{question.text}</h2>

      <div className="space-y-3 mb-4">
        {shuffledOptions.map((option, index) => {
          const normalizedOption = option.trim().toLowerCase();
          const isSelected = selectedAnswer === option;
          const isCorrect = normalizedOption === normalizedCorrect;

          let optionClasses =
            'w-full text-left px-4 py-3 rounded-md border transition-colors';

          if (selectedAnswer) {
            if (isCorrect) {
              optionClasses += ' bg-green-100 border-green-500 text-green-700';
            } else if (isSelected) {
              optionClasses += ' bg-red-100 border-red-500 text-red-700';
            } else {
              optionClasses += ' bg-gray-100 border-gray-300';
            }
          } else {
            optionClasses += ' hover:bg-blue-100 cursor-pointer border-gray-300';
          }

          return (
            <button
              key={index}
              className={optionClasses}
              onClick={() => onSelectAnswer(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* ✅ Animated Explanation */}
      <AnimatePresence>
        {selectedAnswer && question.explanation && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded overflow-hidden"
          >
            <h3 className="font-semibold mb-2 text-blue-700">Explanation:</h3>
            <p className="text-blue-700">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛠 Report Question Button */}
      {!reportSent ? (
  <button
  onClick={handleReportQuestion}
  className="mt-4 inline-flex items-center gap-2 px-3 py-2 border border-red-500 text-red-400 text-sm rounded-md hover:bg-red-500 hover:text-white transition"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m0 4H9a2 2 0 01-2-2v-2a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2z" />
  </svg>
  Report this question
</button>

) : (
  <div className="mt-4 inline-flex items-center gap-2 text-green-400 text-sm">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
  Thanks for reporting!
</div>

)}

    </div>
  );
};

export default QuizQuestion;
