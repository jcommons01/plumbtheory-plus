// ✅ UPDATED: src/pages/quiz/[topic].tsx with dark theme and polished design
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getQuizQuestions, updateQuizProgress } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import QuizQuestion from '@/components/QuizQuestion';
import ProgressBar from '@/components/ProgressBar';
import { topicTitles } from '@/utils/topicTitles';

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const router = useRouter();
  const { topic, amount } = router.query;
  const { user, loading } = useAuth();

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchQuestions = async () => {
    if (!topic || Array.isArray(topic) || !user?.uid) return;

    const retry = router.query.retryLast;

    if (retry === "true") {
      const saved = sessionStorage.getItem("quizResults");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.topic === topic && parsed?.questions) {
          setQuestions(parsed.questions);
          setAnswers(new Array(parsed.questions.length).fill(null));
          setIsLoading(false);
          return;
        }
      }
    }

    try {
      setIsLoading(true);
      const amountNumber = parseInt(amount as string) || 10;
      const fetchedQuestions = await getQuizQuestions(user.uid, topic, amountNumber);

      const shuffledQuestions = fetchedQuestions.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }));

      setQuestions(shuffledQuestions);
      setAnswers(new Array(shuffledQuestions.length).fill(null));
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load quiz questions');
    } finally {
      setIsLoading(false);
    }
  };

  fetchQuestions();
}, [topic, amount, user?.uid, router.query.retryLast]);





  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    const correctAnswer = questions[currentQuestion]?.correctAnswer;
    if (
      correctAnswer &&
      answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
    ) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinish = async () => {
    if (user && typeof topic === 'string') {
      try {
        await updateQuizProgress(user.uid, topic, score, questions.length);
      } catch (err) {
        console.error('Error updating quiz progress:', err);
      }
    }

    sessionStorage.setItem(
      'quizResults',
      JSON.stringify({ topic, questions, answers, score })
    );

    router.push('/results');
  };

  if (loading || isLoading) {
    return (
      <Layout>
        {/* Updated loading spinner with blue-600 color */}
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        {/* Updated error state with dark theme */}
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold text-red-400 mb-2">Error</h1>
            <p className="mb-6 text-gray-300">{error}</p>
            <button
              onClick={() => router.push('/topics')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        {/* Updated no questions state with dark theme */}
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-2xl font-bold mb-2">No questions found</h1>
            <p className="mb-6 text-gray-300">Sorry, no questions are available for this topic.</p>
            <button
              onClick={() => router.push('/topics')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Topics
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Layout>
      {/* Updated main quiz container with dark theme */}
      <div className="min-h-screen bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Updated quiz header with refined styling */}
          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-center text-white">
  {typeof topic === 'string'
    ? `${topicTitles[topic] || topic.replace(/-/g, ' ')} Quiz`
    : 'Quiz'}
</h1>

          <p className="text-center text-sm text-gray-400 mb-6">
            You are answering {questions.length} randomized question
            {questions.length !== 1 && 's'}.
          </p>

          {/* We'll update the ProgressBar component separately */}
          <div className="mb-8">
            <ProgressBarDark current={currentQuestion + 1} total={questions.length} />
          </div>

          {currentQ && (
            <QuizQuestionDark
              question={{
                id: currentQ.id,
                text: currentQ.question,
                options: currentQ.options,
                correctAnswer: currentQ.correctAnswer,
                explanation: currentQ.explanation,
              }}
              selectedAnswer={answers[currentQuestion]}
              onSelectAnswer={handleAnswer}
            />
          )}

          {/* Updated navigation buttons with refined styling */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={answers[currentQuestion] === null}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  answers[currentQuestion] === null
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={answers[currentQuestion] === null}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  answers[currentQuestion] === null
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                Finish Quiz
              </button>
            )}
          </div>
          
          {/* Quiz progress indicator */}
          <div className="mt-6 text-center text-gray-400 text-sm">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Updated ProgressBar component for dark theme
const ProgressBarDark = ({ current, total }: { current: number; total: number }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-blue-600 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// Updated QuizQuestion component for dark theme
const QuizQuestionDark = ({ 
  question, 
  selectedAnswer, 
  onSelectAnswer 
}: {
  question: {
    id?: string;
    text: string;
    options: string[];
    correctAnswer?: string;
    explanation?: string;
  };
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}) => {
  const [bookmarked, setBookmarked] = useState(false);
  
  const handleBookmark = async () => {
    // Bookmark functionality would go here
    setBookmarked(!bookmarked);
  };
  
  const normalizedCorrect = question.correctAnswer?.trim().toLowerCase();
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 relative">
      {/* Bookmark button */}
      {question.id && (
        <button
          onClick={handleBookmark}
          className={`absolute top-4 right-4 text-2xl transition ${
            bookmarked ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'
          }`}
          title={bookmarked ? 'Unbookmark' : 'Bookmark'}
        >
          ★
        </button>
      )}
      
      {/* Question text */}
      <h2 className="text-xl font-bold mb-5 text-white pr-8">{question.text}</h2>
      
      {/* Answer options */}
      <div className="space-y-3 mb-4">
        {question.options.map((option, index) => {
          const normalizedOption = option.trim().toLowerCase();
          const isSelected = selectedAnswer === option;
          const isCorrect = normalizedOption === normalizedCorrect;
          
          let optionClasses = 'w-full text-left px-4 py-3 rounded-lg border transition-colors focus:outline-none';
          
          if (selectedAnswer) {
            if (isCorrect) {
              optionClasses += ' bg-green-900 bg-opacity-20 border-green-600 text-green-300';
            } else if (isSelected) {
              optionClasses += ' bg-red-900 bg-opacity-20 border-red-600 text-red-300';
            } else {
              optionClasses += ' bg-gray-700 border-gray-600 text-gray-300';
            }
          } else {
            optionClasses += ' hover:bg-gray-700 cursor-pointer border-gray-600 text-gray-200';
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
      
      {/* Explanation */}
      {selectedAnswer && question.explanation && (
        <div className="mt-5 p-4 bg-blue-900 bg-opacity-20 border-l-4 border-blue-600 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-400">Explanation:</h3>
          <p className="text-gray-300">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};
