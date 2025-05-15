import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { topicTitles } from '@/utils/topicTitles';

const formatTopicTitle = (id: string) => {
  let label = id;

  // Extract level if present
  let levelSuffix = '';
  if (id.startsWith('level2-')) {
    label = id.replace('level2-', '');
    levelSuffix = ' (Level 2)';
  } else if (id.startsWith('level3-')) {
    label = id.replace('level3-', '');
    levelSuffix = ' (Level 3)';
  }

  // Capitalise words
  const capitalised = label
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return capitalised + levelSuffix;
};


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
  
  // Calculate percentage score
  const percentage = Math.round((score / questions.length) * 100);
  
  // Determine result message and color based on score
  let resultMessage = '';
  let resultColor = '';
  
  if (percentage >= 80) {
    resultMessage = 'Excellent!';
    resultColor = 'text-green-400';
  } else if (percentage >= 60) {
    resultMessage = 'Good effort!';
    resultColor = 'text-blue-400';
  } else if (percentage >= 40) {
    resultMessage = 'Almost there!';
    resultColor = 'text-yellow-400';
  } else {
    resultMessage = 'Keep practicing!';
    resultColor = 'text-red-400';
  }

  return (
    <Layout>
      {/* Updated background to match dark theme */}
      <div className="min-h-screen bg-gray-900 py-6 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced header section - reduced vertical padding */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-3">
  Quiz Results: {topicTitles[topic] || formatTopicTitle(topic)}
</h1>

            
            {/* Score summary with visual indicator - reduced padding */}
            <div className="bg-gray-800 rounded-xl p-4 inline-block">
              <div className="flex items-center justify-center mb-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-blue-600 mr-4">
                  <span className="text-xl font-bold">{percentage}%</span>
                </div>
                <div className="text-left">
                  <p className="text-sm mb-1">
                    You scored <span className="font-bold text-blue-400">{score}</span> out of <span className="font-bold">{questions.length}</span>
                  </p>
                  <p className={`text-lg font-bold ${resultColor}`}>
                    {resultMessage}
                  </p>
                </div>
              </div>
              
              {/* Visual score bar */}
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    percentage >= 80 ? 'bg-green-500' : 
                    percentage >= 60 ? 'bg-blue-600' : 
                    percentage >= 40 ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Results breakdown title - smaller margin */}
          <h2 className="text-lg font-semibold mb-3 text-center text-gray-300">Results Breakdown</h2>
          
          {/* Question review cards - reduced spacing between cards */}
          <div className="space-y-3 mb-6">
            {questions.map((q, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer?.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

              return (
                <div key={index} className="bg-gray-800 rounded-lg p-3 shadow-lg">
                  {/* Question header with status icon - compact layout */}
                  <div className="flex items-start">
                    <div className={`mt-1 mr-2 flex-shrink-0 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-base font-medium flex-1">{q.question}</h3>
                  </div>
                  
                  {/* Answers section - tighter layout with less indentation */}
                  <div className="ml-6 mt-2 text-sm">
                    <div className="flex">
                      <span className="text-gray-400 w-24 flex-shrink-0">Your answer:</span>
                      <span className={`font-medium ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {userAnswer || 'No answer provided'}
                      </span>
                    </div>
                    
                    {/* Correct answer - only show if incorrect */}
                    {!isCorrect && (
                      <div className="flex mt-1">
                        <span className="text-gray-400 w-24 flex-shrink-0">Correct answer:</span>
                        <span className="font-medium text-green-400">{q.correctAnswer}</span>
                      </div>
                    )}
                    
                    {/* Explanation - more compact */}
                    <div className="bg-gray-700 bg-opacity-50 p-2 rounded mt-2 border-l-2 border-blue-600">
                      <span className="font-medium text-blue-400">Explanation:</span>{' '}
                      <span className="text-gray-300">{q.explanation}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions - smaller buttons */}
          <div className="text-center space-x-3">
            <button
              onClick={() => router.push('/topics')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
            >
              Back to Topics
            </button>
            
            <button
              onClick={() => {
                sessionStorage.removeItem('quizResults');
                window.location.href = `/quiz/${topic}?amount=${questions.length}&retryLast=true`;

              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
