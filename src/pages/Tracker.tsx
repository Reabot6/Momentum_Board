import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import StreakTracker from '../components/StreakTracker';
import Button from '../components/Button';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from '../hooks/useNavigate';
import { getStreakData } from '../utils/streak';

const quotes = [
  "The only way to do great work is to love what you do.",
  "Small actions compound into remarkable results.",
  "Consistency trumps intensity every time.",
  "What you do every day matters more than what you do once in a while.",
  "Progress is not always linear. Keep showing up.",
  "Momentum builds momentum.",
  "The best time to start was yesterday. The second best time is now."
];

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
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calendar className="mr-2" size={24} />
            Your Momentum
          </h1>
          
          <StreakTracker 
            streakDays={streakDays}
            lastSevenDays={lastSevenDays}
            className="mb-6"
          />
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Arrow Wisdom</h3>
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-gray-300">
              {quote}
            </blockquote>
          </div>
          
          <div className="flex flex-col space-y-3">
            <Button 
              onClick={() => navigate('/daily-action')}
              fullWidth
            >
              <span>Log Today's Action</span>
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