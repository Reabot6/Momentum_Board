import React, { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';
import DailyAction from './pages/DailyAction';
import Feed from './pages/Feed';
import Tracker from './pages/Tracker';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Check if user is already registered
    const username = localStorage.getItem('username');
    if (!username && currentPath !== '/') {
      setCurrentPath('/');
      window.history.pushState({}, '', '/');
    }
    
    // Listen for navigation events
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<{ path: string }>;
      setCurrentPath(customEvent.detail.path);
    };
    
    window.addEventListener('navigation', handleNavigation);
    
    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('navigation', handleNavigation);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentPath]);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Welcome />;
      case '/daily-action':
        return <DailyAction />;
      case '/feed':
        return <Feed />;
      case '/tracker':
        return <Tracker />;
      default:
        return <Welcome />;
    }
  };

  return (
    <ThemeProvider>
      {renderPage()}
    </ThemeProvider>
  );
}

export default App;