import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

type QuestionResult = {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type QuizResults = {
  topic: string;
  questions: QuestionResult[];
  answers: (string | null)[];
  score: number;
};

export default function Results() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('quizResults');
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      router.push('/topics');
    }
  }, [router]);

  if (!results) {
    return null;
  }

  const { topic, questions, answers, score } = results;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          {topic} Quiz Results
        </h1>
        <p className="text-center text-lg mb-4">
          You scored <strong>{score}</strong> out of {questions.length}
        </p>

        <div className="space-y-6">
          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <h2 className="text-lg font-semibold">{q.question}</h2>
                <p className="mt-1">
                  Your answer: <strong>{userAnswer || 'No answer'}</strong>
                </p>
                <p className="text-sm">
                  Correct answer: <strong>{q.correctAnswer}</strong>
                </p>
                <p className="mt-2 text-gray-700">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
                <p className={`mt-1 font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/topics')}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Back to Topics
          </button>
        </div>
      </div>
    </Layout>
  );
}
