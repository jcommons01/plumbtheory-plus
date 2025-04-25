import { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 🆕 import motion
import { useAuth } from '@/contexts/AuthProvider';
import { toggleBookmark } from '@/lib/bookmark';

interface QuizQuestionProps {
  question: {
    id?: string;
    text: string;
    options: string[];
    correctAnswer?: string;
    explanation?: string;
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

  const handleBookmark = async () => {
    if (!user || !question.id) return;
    await toggleBookmark(user.uid, question.id, bookmarked);
    setBookmarked(!bookmarked);
  };

  const normalizedCorrect = question.correctAnswer?.trim().toLowerCase();

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
        {question.options.map((option, index) => {
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
    </div>
  );
};

export default QuizQuestion;
