import React from 'react';
import { Clock, RefreshCw, Share2 } from 'lucide-react';
import Button from './Button';
import { cn } from '../utils/cn';

export interface Action {
  id: string;
  username: string;
  text: string;
  tag: string;
  emoji: string;
  timestamp: string;
}

interface ActionCardProps {
  action: Action;
  onRemix?: (action: Action) => void;
  onShare?: (action: Action) => void;
  className?: string;
}

const ActionCard: React.FC<ActionCardProps> = ({
  action,
  onRemix,
  onShare,
  className,
}) => {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all",
        "border border-gray-100 dark:border-gray-700",
        "transform hover:scale-[1.02] transition-transform duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
            {action.username.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-gray-100">@{action.username}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock size={14} className="mr-1" />
              <span>{action.timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-1">
          {onRemix && (
            <button 
              onClick={() => onRemix(action)}
              className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 transition-colors group"
              title="Remix this action"
            >
              <RefreshCw size={18} className="transform group-hover:rotate-180 transition-transform duration-300" />
            </button>
          )}
          {onShare && (
            <button
              onClick={() => onShare(action)}
              className="p-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 transition-colors"
              title="Share to /arrow"
            >
              <Share2 size={18} />
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-3">
        <p className="text-gray-800 dark:text-gray-200">{action.text}</p>
      </div>
      
      <div className="mt-3 flex items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 text-indigo-800 dark:text-indigo-200">
          {action.emoji} #{action.tag}
        </span>
      </div>
    </div>
  );
};

export default ActionCard;