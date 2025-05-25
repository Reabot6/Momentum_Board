import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import StreakTracker from '../components/StreakTracker';
import Button from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from '../hooks/useNavigate';
import { getStreakData } from '../utils/streak';
import { getRandomQuote } from '../utils/arrowMode';

const Tracker: React.FC = () => {
  const [streakDays, setStreakDays] = useState(0);
  const [lastSevenDays, setLastSevenDays] = useState<boolean[]>([]);
  const [quote, setQuote] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const { count, lastSevenDays } = getStreakData();
    setStreakDays(count);
    setLastSevenDays(lastSevenDays);
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calendar className="mr-2" size={24} />
            Your Alignment Streak
          </h1>
          
          <StreakTracker 
            streakDays={streakDays}
            lastSevenDays={lastSevenDays}
            className="mb-6"
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center mb-3">
              <Sparkles className="mr-2" size={18} />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Arrow Wisdom</h3>
            </div>
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-gray-300">
              {quote}
            </blockquote>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => navigate('/daily-action')}
              fullWidth
            >
              <span>Lock In Today's Action</span>
              <ArrowRight className="ml-2" size={18} />
            </Button>
            
            <Button 
              onClick={() => navigate('/feed')}
              variant="outline"
              fullWidth
            >
              View Community Feed
            </Button>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl p-4 text-center">
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              Keep going tomorrow!<br />
              Your momentum is building.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tracker;