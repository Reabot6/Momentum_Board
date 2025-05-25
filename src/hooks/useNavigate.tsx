import { useCallback } from 'react';

export const useNavigate = () => {
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    
    // Create and dispatch a custom navigation event
    const navigationEvent = new CustomEvent('navigation', { detail: { path } });
    window.dispatchEvent(navigationEvent);
  }, []);

  return navigate;
};