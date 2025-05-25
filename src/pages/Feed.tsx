import React, { useState, useEffect } from 'react';
import { PlusCircle, Filter, Sparkles } from 'lucide-react';
import Header from '../components/Header';
import ActionCard, { Action } from '../components/ActionCard';
import Button from '../components/Button';
import TagSelector, { Tag } from '../components/TagSelector';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from '../hooks/useNavigate';
import { getRandomQuote } from '../utils/arrowMode';

const Feed: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [quote, setQuote] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const tags: Tag[] = [
    { id: 'all', name: 'all', emoji: '🔍' },
    { id: 'focus', name: 'focus', emoji: '🎯' },
    { id: 'health', name: 'health', emoji: '💪' },
    { id: 'learning', name: 'learning', emoji: '📚' },
    { id: 'create', name: 'create', emoji: '✨' },
    { id: 'connect', name: 'connect', emoji: '🤝' }
  ];

  useEffect(() => {
    // Load actions from localStorage
    const storedActions = JSON.parse(localStorage.getItem('actions') || '[]');
    setQuote(getRandomQuote());
    
    // Add some example actions if none exist
    if (storedActions.length === 0) {
      const exampleActions = [
        {
          id: '1',
          username: 'zenflow',
          text: 'Meditated for 10 minutes before starting work',
          tag: 'focus',
          emoji: '🎯',
          timestamp: '2 hours ago'
        },
        {
          id: '2',
          username: 'healthhacker',
          text: 'Went for a 5k run this morning',
          tag: 'health',
          emoji: '💪',
          timestamp: '5 hours ago'
        },
        {
          id: '3',
          username: 'mindbuilder',
          text: 'Read 20 pages of "Atomic Habits"',
          tag: 'learning',
          emoji: '📚',
          timestamp: '1 day ago'
        },
        {
          id: '4',
          username: 'creator',
          text: 'Wrote 500 words for my blog post',
          tag: 'create',
          emoji: '✨',
          timestamp: '3 hours ago'
        },
        {
          id: '5',
          username: 'connector',
          text: 'Reached out to three people in my network',
          tag: 'connect',
          emoji: '🤝',
          timestamp: '4 hours ago'
        }
      ];
      setActions([...storedActions, ...exampleActions]);
    } else {
      setActions(storedActions);
    }
  }, []);

  const handleRemix = (action: Action) => {
    localStorage.setItem('remixAction', JSON.stringify(action));
    navigate('/daily-action');
  };

  const handleShare = (action: Action) => {
    const shareText = `Aligned action: ${action.text} ${action.emoji} #${action.tag}\n\nvia Momentum Board on /arrow`;
    navigator.clipboard.writeText(shareText);
    alert('Action copied and ready to share on /arrow! 🚀');
  };

  const filteredActions = filterTag && filterTag !== 'all'
    ? actions.filter(action => action.tag === filterTag.replace('#', ''))
    : actions;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header onThemeToggle={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community Actions</h1>
            <Button 
              onClick={() => navigate('/daily-action')}
              variant="primary"
              size="sm"
            >
              <PlusCircle size={18} className="mr-1" />
              <span>New Action</span>
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Sparkles size={18} className="text-indigo-500 dark:text-indigo-400 mr-2" />
              <p className="text-sm italic text-gray-600 dark:text-gray-300">{quote}</p>
            </div>
            <div className="flex items-center">
              <Filter size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-3">
                Filter by:
              </span>
            </div>
            <TagSelector
              tags={tags}
              selectedTag={filterTag}
              onSelectTag={setFilterTag}
              className="mt-2"
            />
          </div>
          
          <div className="space-y-4">
            {filteredActions.length > 0 ? (
              filteredActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onRemix={handleRemix}
                  onShare={handleShare}
                />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No actions found for this filter.</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => navigate('/tracker')}
              variant="outline"
              className="mr-2"
            >
              View My Streak
            </Button>
            <Button
              onClick={() => {
                const postToArrow = localStorage.getItem('postToArrow') === 'true';
                if (postToArrow) {
                  const latestAction = actions.find(a => a.username === localStorage.getItem('username'));
                  if (latestAction) {
                    handleShare(latestAction);
                  }
                }
              }}
            >
              Post to /arrow
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Feed;