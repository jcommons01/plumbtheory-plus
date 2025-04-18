// src/components/TopicCard.tsx
import React from 'react';

type TopicCardProps = {
  title: string;
  icon: string;
  progress: number;
  isPro: boolean;
  isUserPro: boolean;
  onClick: () => void;
};

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  icon,
  progress,
  isPro,
  isUserPro,
  onClick,
}) => {
  return (
    <div
      className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition relative"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold">
          {icon} {title}
        </h3>
        {isPro && !isUserPro && (
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            PRO
          </span>
        )}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-sm text-right mt-1 text-blue-600">{progress}%</p>
    </div>
  );
};

export default TopicCard;
