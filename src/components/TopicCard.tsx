import React from 'react';
import { topicTitles } from '@/utils/topicTitles';

type TopicCardProps = {
  title: string;
  icon: string;
  progress: number; // This is lastCorrect / lastTotal * 100
  caption: string;  // e.g. "4/10 - Last attempt"
  isPro: boolean;
  isUserPro: boolean;
  level: number; // ✅ Added level to support dynamic styling
  onClick: () => void;
};

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  icon,
  progress,
  caption,
  isPro,
  isUserPro,
  level, // ✅ Add this here to bring it into scope
  onClick,
}) => {

  const locked = isPro && !isUserPro;

  return (
    <div
      onClick={!locked ? onClick : undefined}
      className={`bg-white shadow-md rounded-lg p-4 transition cursor-pointer ${
        locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
      }`}
    >
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {locked && (
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
      </div>

      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 transition-all" // Changed from blue-500 to blue-600 to match navbar
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">{caption}</p>

      {!locked && (
  <div className="mt-3">
    <button
  className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
>
  {progress > 0 ? 'Continue' : 'Start Quiz'}
</button>


  </div>
)}

    </div>
  );
};

export default TopicCard;
