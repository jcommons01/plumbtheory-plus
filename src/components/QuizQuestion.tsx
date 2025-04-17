import { FC, useEffect } from 'react';

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  correctAnswer?: string;
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
  correctAnswer,
}) => {
  // Debug log
  useEffect(() => {
    console.log('✅ selected:', selectedAnswer);
    console.log('✅ correct:', correctAnswer);
  }, [selectedAnswer, correctAnswer]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => {
          const normalizedOption = option.trim().toLowerCase();
          const normalizedCorrect = correctAnswer?.trim().toLowerCase();

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
            optionClasses +=
              ' hover:bg-blue-100 cursor-pointer border-gray-300';
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
    </div>
  );
};

export default QuizQuestion;
