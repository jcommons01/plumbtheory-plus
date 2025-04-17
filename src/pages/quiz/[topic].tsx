// src/pages/quiz/[topic].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getQuizQuestions, updateQuizProgress } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthProvider';
import Layout from '@/components/Layout';
import QuizQuestion from '@/components/QuizQuestion';
import ProgressBar from '@/components/ProgressBar';
import ProGateway from '@/components/ProGateway';

type Question = {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export default function Quiz() {
  const router = useRouter();
  const { topic, amount } = router.query;
  const { user, userData, loading } = useAuth();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const proTopics = ['Environmental Technologies', 'Domestic Fuels', 'Calculation Questions'];
  const isProTopic = proTopics.includes(topic as string);

  const trialStillActive = () => {
    if (!userData?.trialActive || !userData.trialStartedAt) return false;

    const trialStart = new Date(userData.trialStartedAt).getTime();
    const now = Date.now();
    const threeDays = 3 * 24 * 60 * 60 * 1000;

    return now - trialStart <= threeDays;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!topic || Array.isArray(topic)) return;

      try {
        setIsLoading(true);
        const amountNumber = parseInt(amount as string) || 10;
        const fetchedQuestions = await getQuizQuestions(topic, amountNumber);
        setQuestions(fetchedQuestions);
        setAnswers(new Array(fetchedQuestions.length).fill(null));
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load quiz questions');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [topic, amount]);

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
        await updateQuizProgress(user.uid, topic, score);
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

  // 🔐 PRO Access Control
  if (
    isProTopic &&
    userData &&
    !userData.isPro &&
    !trialStillActive()
  ) {
    return (
      <Layout>
        <ProGateway />
      </Layout>
    );
  }

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p>{error}</p>
          <button
            onClick={() => router.push('/topics')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Topics
          </button>
        </div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-2xl font-bold">No questions found</h1>
          <p>Sorry, no questions are available for this topic.</p>
          <button
            onClick={() => router.push('/topics')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Topics
          </button>
        </div>
      </Layout>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-1 text-center">
          {typeof topic === 'string' ? topic.replace(/-/g, ' ') : ''} Quiz
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          You are answering {questions.length} randomized question{questions.length !== 1 && 's'}.
        </p>

        {trialStillActive() && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 mb-6 text-center rounded">
            🧪 You're currently in your 3-day free trial. Enjoy full access!
          </div>
        )}

        <div className="mb-6">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        </div>

        {currentQ && (
          <QuizQuestion
            question={currentQ.question}
            options={currentQ.options}
            selectedAnswer={answers[currentQuestion]}
            onSelectAnswer={handleAnswer}
            correctAnswer={currentQ.correctAnswer}
          />
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded ${
              currentQuestion === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={answers[currentQuestion] === null}
              className={`px-4 py-2 rounded ${
                answers[currentQuestion] === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={answers[currentQuestion] === null}
              className={`px-4 py-2 rounded ${
                answers[currentQuestion] === null
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Finish Quiz
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
