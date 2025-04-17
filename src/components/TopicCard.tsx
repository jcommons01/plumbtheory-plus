// src/components/TopicCard.tsx
import { FC } from 'react';
import { useRouter } from 'next/router';

interface TopicCardProps {
  title: string;
  icon: string;
  progress: number;
  isPro: boolean;
  isUserPro: boolean;
  onClick: () => void;
}

const TopicCard: FC<TopicCardProps> = ({
  title,
  icon,
  progress,
  isPro,
  isUserPro,
  onClick,
}) => {
  const router = useRouter();

  return (
    <div
      className="bg-white shadow-md rounded-lg p-5 cursor-pointer hover:shadow-lg transition relative"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {title}
        </h3>
        {isPro && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1
              ${isUserPro ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
          >
            {isUserPro ? 'Trial Access' : (
              <>
                Pro <span className="text-xs">🔒</span>
              </>
            )}
          </span>
        )}
      </div>

      <div className="text-sm text-gray-500 mb-1">Progress</div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 text-sm font-semibold text-right text-blue-600">
        {progress}%
      </div>

      {!isUserPro && isPro && (
        <div className="mt-4 text-center text-sm text-gray-600 bg-gray-100 py-2 px-3 rounded">
          Upgrade to Pro to unlock
        </div>
      )}
    </div>
  );
};

export default TopicCard;
