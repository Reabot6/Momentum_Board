import React from 'react';
import { cn } from '../utils/cn';

interface StreakTrackerProps {
  streakDays: number;
  lastSevenDays: boolean[];
  className?: string;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({
  streakDays,
  lastSevenDays,
  className,
}) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm", className)}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Current Streak</h3>
        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
          {streakDays} {streakDays === 1 ? 'day' : 'days'}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Keep the momentum going!</p>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        {lastSevenDays.map((completed, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{days[index]}</div>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              completed 
                ? "bg-green-500 text-white" 
                : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
            )}>
              {completed ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakTracker;