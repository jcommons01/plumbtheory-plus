// src/components/ProgressBar.tsx
import { FC } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
