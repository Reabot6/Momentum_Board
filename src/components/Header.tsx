import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../utils/cn';

interface HeaderProps {
  title?: string;
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Momentum Board",
  onThemeToggle,
  isDarkMode = false,
  className,
}) => {
  return (
    <header className={cn(
      "w-full px-4 py-4 flex items-center justify-between",
      "bg-white dark:bg-gray-800 shadow-sm",
      className
    )}>
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold mr-2">
          M
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
      </div>
      
      {onThemeToggle && (
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Sun size={20} className="text-gray-200" /> : <Moon size={20} className="text-gray-700" />}
        </button>
      )}
    </header>
  );
};

export default Header;