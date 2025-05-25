// Simple utility to generate aligned actions and wisdom quotes
interface SuggestedAction {
  text: string;
  tagId: string;
}

const focusActions = [
  "Meditate for 10 minutes before starting work",
  "Complete the most important task first thing today",
  "Implement a 25-minute focused work session without distractions",
  "Clear my workspace of all digital and physical clutter",
  "Review and update your 3-month goals",
  "Block all notifications for 2 hours of deep work"
];

const healthActions = [
  "Go for a 30-minute walk outside",
  "Prepare a nutritious meal instead of ordering takeout",
  "Do a 15-minute stretching session",
  "Drink 8 glasses of water throughout the day",
  "Take a mindful breathing break every 2 hours",
  "Get 7-8 hours of quality sleep tonight"
];

const learningActions = [
  "Read 20 pages of a non-fiction book",
  "Listen to an educational podcast during commute",
  "Take notes on a new concept I'm learning",
  "Watch a tutorial on a skill I want to develop",
  "Teach someone something you learned recently",
  "Write a summary of your key learnings today"
];

const createActions = [
  "Write 500 words for my personal project",
  "Sketch or doodle for 15 minutes",
  "Build a small prototype of an idea",
  "Create content to share with my community",
  "Start that creative project you've been thinking about",
  "Share your work-in-progress with someone"
];

const connectActions = [
  "Reach out to someone I admire with a thoughtful message",
  "Have a meaningful conversation with a friend or colleague",
  "Participate in a community discussion or event",
  "Express gratitude to someone who has helped me",
  "Schedule a catch-up call with a mentor",
  "Share your knowledge in a community forum"
];

export const wisdomQuotes = [
  "Direction is more important than speed.",
  "Aligned action compounds.",
  "Small steps, taken daily, create lasting change.",
  "Your daily choices shape your destiny.",
  "Progress isn't always linear, but it's always possible.",
  "Consistency beats intensity.",
  "Every aligned action builds momentum.",
  "The best investment is in yourself.",
  "Start before you feel ready.",
  "Your future self is watching your present actions."
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

export const getRandomQuote = (): string => {
  return wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
};