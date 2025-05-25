import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import Toggle from '../components/Toggle';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from '../hooks/useNavigate';

const Welcome: React.FC = () => {
  const [username, setUsername] = useState('');
  const [postToArrow, setPostToArrow] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('username', username);
      localStorage.setItem('postToArrow', String(postToArrow));
      navigate('/daily-action');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
              M
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Momentum Board</h1>
            <p className="text-gray-600 dark:text-gray-300">One aligned action per day.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="What should we call you?"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Toggle
              label="Post to Farcaster /arrow"
              enabled={postToArrow}
              onChange={setPostToArrow}
            />
            
            <Button type="submit" fullWidth className="mt-8" size="lg">
              <span>Start Aligning</span>
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>
        </div>
        
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
          Open-source & remixable under MIT License<br />
          Built for Farcaster /arrow
        </p>
      </main>
    </div>
  );
};

export default Welcome;