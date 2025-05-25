import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import TagSelector, { Tag } from '../components/TagSelector';
import Toggle from '../components/Toggle';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from '../hooks/useNavigate';
import { generateAction } from '../utils/arrowMode';
import { updateStreak } from '../utils/streak';

const DailyAction: React.FC = () => {
  const [action, setAction] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [arrowMode, setArrowMode] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const tags: Tag[] = [
    { id: 'focus', name: 'focus', emoji: '🎯' },
    { id: 'health', name: 'health', emoji: '💪' },
    { id: 'learning', name: 'learning', emoji: '📚' },
    { id: 'create', name: 'create', emoji: '✨' },
    { id: 'connect', name: 'connect', emoji: '🤝' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action.trim() && selectedTag) {
      const selectedTagObject = tags.find(tag => tag.id === selectedTag);
      
      const newAction = {
        id: Date.now().toString(),
        username: localStorage.getItem('username') || 'Anonymous',
        text: action,
        tag: selectedTagObject?.name || 'focus',
        emoji: selectedTagObject?.emoji || '🎯',
        timestamp: new Date().toLocaleString()
      };
      
      // Save to local storage
      const actions = JSON.parse(localStorage.getItem('actions') || '[]');
      localStorage.setItem('actions', JSON.stringify([...actions, newAction]));
      
      // Update streak
      updateStreak();
      
      navigate('/feed');
    }
  };

  const handleArrowModeToggle = (enabled: boolean) => {
    setArrowMode(enabled);
    if (enabled) {
      const suggestedAction = generateAction();
      setAction(suggestedAction.text);
      setSelectedTag(suggestedAction.tagId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            What's your aligned action today?
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="e.g., Write for 30 minutes"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              required
              className="text-lg"
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose a tag
              </label>
              <TagSelector
                tags={tags}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
              />
            </div>
            
            <Toggle
              label="Use Arrow Mode"
              enabled={arrowMode}
              onChange={handleArrowModeToggle}
              className="mt-4"
            />
            
            <div className="flex mt-8">
              <Button 
                type="submit"
                fullWidth
                disabled={!action.trim() || !selectedTag}
              >
                <Check className="mr-2" size={18} />
                <span>Log Action</span>
              </Button>
            </div>
          </form>
        </div>
        
        {arrowMode && (
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl text-sm text-indigo-800 dark:text-indigo-200 max-w-md flex items-start">
            <Sparkles className="mr-2 mt-0.5 flex-shrink-0" size={16} />
            <p>Arrow Mode suggests aligned actions based on common high-leverage habits.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DailyAction;