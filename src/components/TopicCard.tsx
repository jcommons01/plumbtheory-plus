import React from 'react';

type TopicCardProps = {
  title: string;
  icon: string;
  progress: number; // This is lastCorrect / lastTotal * 100
  caption: string;  // e.g. "4/10 - Last attempt"
  isPro: boolean;
  isUserPro: boolean;
  onClick: () => void;
};

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  icon,
  progress,
  caption,
  isPro,
  isUserPro,
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
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-1">{caption}</p>

      {locked && (
        <p className="text-xs text-red-500 mt-2">Pro Access Required</p>
      )}
    </div>
  );
};

export default TopicCard;
