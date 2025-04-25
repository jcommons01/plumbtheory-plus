import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import QuizQuestion from '@/components/QuizQuestion';
import ProgressBar from '@/components/ProgressBar';
import { useAuth } from '@/contexts/AuthProvider';
import { getBookmarkedQuestions } from '@/lib/bookmark';
import { getQuizQuestions } from '@/lib/firebase';

export default function BookmarkedQuiz() {
  const { user, loading } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchBookmarked = async () => {
      if (!user) return;

      try {
        const ids = await getBookmarkedQuestions(user.uid);
        const allQuestions: any[] = [];

        for (const id of ids) {
          const topic = id.split('-')[0];
          const allInTopic = await getQuizQuestions(topic, '100');
          const match = allInTopic.find((q) => String(q.id) === String(id));
          if (match) allQuestions.push(match);
        }

        setQuestions(allQuestions);
        setAnswers(new Array(allQuestions.length).fill(null));
      } catch (err) {
        console.error('❌ Failed to load bookmarked quiz:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarked();
  }, [user]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (
      questions[currentQuestion].correctAnswer?.trim().toLowerCase() ===
      answer.trim().toLowerCase()
    ) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      sessionStorage.setItem(
        'quizResults',
        JSON.stringify({
          topic: 'bookmarked',
          questions,
          answers,
          score,
        })
      );
      router.push('/results');
    }
  };

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold">No Bookmarked Questions</h1>
          <p className="text-gray-500 mt-2">Try bookmarking questions from quizzes and return here.</p>
        </div>
      </Layout>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-1 text-center">Bookmarked Quiz</h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          Answering {questions.length} saved question{questions.length > 1 && 's'}.
        </p>

        <div className="mb-6">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        </div>

        <QuizQuestion
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

        <div className="flex justify-center mt-8">
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === null}
            className={`px-6 py-2 rounded ${
              answers[currentQuestion] === null
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </Layout>
  );
}
