// Simple utility to generate aligned actions
interface SuggestedAction {
  text: string;
  tagId: string;
}

const focusActions = [
  "Meditate for 10 minutes before starting work",
  "Complete the most important task first thing today",
  "Implement a 25-minute focused work session without distractions",
  "Clear my workspace of all digital and physical clutter"
];

const healthActions = [
  "Go for a 30-minute walk outside",
  "Prepare a nutritious meal instead of ordering takeout",
  "Do a 15-minute stretching session",
  "Drink 8 glasses of water throughout the day"
];

const learningActions = [
  "Read 20 pages of a non-fiction book",
  "Listen to an educational podcast during commute",
  "Take notes on a new concept I'm learning",
  "Watch a tutorial on a skill I want to develop"
];

const createActions = [
  "Write 500 words for my personal project",
  "Sketch or doodle for 15 minutes",
  "Build a small prototype of an idea",
  "Create content to share with my community"
];

const connectActions = [
  "Reach out to someone I admire with a thoughtful message",
  "Have a meaningful conversation with a friend or colleague",
  "Participate in a community discussion or event",
  "Express gratitude to someone who has helped me"
];

export const generateAction = (): SuggestedAction => {
  const categories = [
    { id: 'focus', actions: focusActions },
    { id: 'health', actions: healthActions },
    { id: 'learning', actions: learningActions },
    { id: 'create', actions: createActions },
    { id: 'connect', actions: connectActions }
  ];
  
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomAction = randomCategory.actions[Math.floor(Math.random() * randomCategory.actions.length)];
  
  return {
    text: randomAction,
    tagId: randomCategory.id
  };
};