import { FC, useEffect, useState } from 'react';

interface QuizQuestionProps {
  question: {
    text: string;
    options: string[];
    correctAnswer?: string;
  };
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    console.log('✅ selected:', selectedAnswer);
    console.log('✅ correct:', question.correctAnswer);
  }, [selectedAnswer, question.correctAnswer]);

  const handleSubmitReport = async () => {
    setReportStatus('submitting');

    try {
      const res = await fetch('/api/report-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, reportText }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('❌ Server error:', text);
        throw new Error(text);
      }

      setReportStatus('success');
      setReportText('');
      setTimeout(() => {
        setShowReportModal(false);
        setReportStatus('idle');
      }, 2000);
    } catch (err: any) {
      console.error('❌ Report failed:', err.message);
      setReportStatus('error');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">{question.text}</h2>

      <div className="space-y-3 mb-4">
        {question.options.map((option, index) => {
          const normalizedOption = option.trim().toLowerCase();
          const normalizedCorrect = question.correctAnswer?.trim().toLowerCase();
          const isSelected = selectedAnswer === option;
          const isCorrect = normalizedOption === normalizedCorrect;

          let optionClasses = 'w-full text-left px-4 py-3 rounded-md border transition-colors';

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

      <div className="text-right">
        <button
          onClick={() => setShowReportModal(true)}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          Report this question
        </button>
      </div>

      {showReportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-lg max-w-md w-full p-6 text-left">
            <h3 className="text-lg font-bold mb-3">Report this question</h3>
            <textarea
              className="w-full border rounded p-2 mb-3"
              rows={4}
              placeholder="Describe the issue..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-gray-600 hover:underline"
                onClick={() => {
                  setShowReportModal(false);
                  setReportText('');
                  setReportStatus('idle');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleSubmitReport}
                disabled={reportStatus === 'submitting'}
              >
                {reportStatus === 'submitting' ? 'Sending...' : 'Submit'}
              </button>
            </div>
            {reportStatus === 'success' && (
              <p className="mt-2 text-green-600 text-sm">Report submitted ✅</p>
            )}
            {reportStatus === 'error' && (
              <p className="mt-2 text-red-600 text-sm">Failed to submit. Try again.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
