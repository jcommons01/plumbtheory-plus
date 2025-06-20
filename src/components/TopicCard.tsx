import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type TopicCardProps = {
  title: string;
  icon: string;
  progress: number; // This is lastCorrect / lastTotal * 100
  caption: string;  // e.g. "4/10 - Last attempt"
  isPro: boolean;
  isUserPro: boolean;
  level: number; // ✅ Added level to support dynamic styling
  onClick: () => void;
  compact?: boolean;
  whatYoullLearn?: string[]; // Add this prop
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
  compact,
  whatYoullLearn,
}) => {
  const [showLearn, setShowLearn] = useState(false);
  const locked = isPro && !isUserPro;

  return (
    <div
      onClick={!locked ? onClick : undefined}
      className={`bg-white shadow-md rounded-lg transition cursor-pointer flex flex-col justify-between h-44 min-h-[11rem] max-h-56 p-4 ${locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
      style={{ position: 'relative' }}
    >
      {/* Info Icon - always visible, even if locked */}
      {whatYoullLearn && (
        <button
          type="button"
          className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 z-10"
          onClick={(e) => {
            e.stopPropagation();
            setShowLearn(true);
          }}
          aria-label="What You'll Learn"
          tabIndex={0}
        >
          <AiOutlineInfoCircle className="h-5 w-5" />
        </button>
      )}
      {/* Modal - always accessible, never blurry */}
      {showLearn && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-all duration-200 ease-in-out"
          style={{backdropFilter: 'none'}}
          onClick={() => setShowLearn(false)}
        >
          <div
            className="relative bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-2xl shadow-2xl max-w-sm md:max-w-md w-full transition-all duration-200 ease-in-out transform scale-95 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
            style={{filter: 'none', opacity: 1}}
          >
            <button
              onClick={() => setShowLearn(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <AiOutlineInfoCircle className="text-blue-500" /> What You'll Learn
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-200">
              {whatYoullLearn?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-3 mb-2 min-h-[2.5rem]">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800 truncate" style={{maxWidth: 'calc(100% - 2.5rem)'}}>{title}</h3>
        {locked && (
          <div className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="w-full mb-2">
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
        {caption}
      </p>

      {!locked && (
        <div className="mt-3 flex-1 flex flex-col justify-end">
          <button className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors min-h-[44px]">
            {progress > 0 ? 'Continue' : 'Start Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TopicCard;
