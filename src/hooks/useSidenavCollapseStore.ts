import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sidebar-collapsed';
const MOBILE_BREAKPOINT = 768;

interface SidenavCollapseStore {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  userPreference: boolean | null;
  setUserPreference: (preference: boolean) => void;
}

/**
 * Custom hook for managing sidebar collapse state with localStorage persistence
 * and responsive behavior.
 * 
 * Features:
 * - Persists user preference in localStorage
 * - Automatically collapses on mobile screens
 * - Respects user preference on desktop screens
 * - Handles window resize events
 */
export const useSidenavCollapseStore = (): SidenavCollapseStore => {
  // Load initial user preference from localStorage
  const getInitialPreference = (): boolean | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored !== null ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading sidebar preference from localStorage:', error);
      return null;
    }
  };

  const [userPreference, setUserPreferenceState] = useState<boolean | null>(getInitialPreference);
  const [collapsed, setCollapsedState] = useState<boolean>(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile) {
      return true; // Always collapse on mobile
    }
    // On desktop, use user preference or default to false (expanded)
    return userPreference !== null ? userPreference : false;
  });

  // Save user preference to localStorage
  const setUserPreference = (preference: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
      setUserPreferenceState(preference);
    } catch (error) {
      console.error('Error saving sidebar preference to localStorage:', error);
    }
  };

  // Handle manual collapse/expand
  const setCollapsed = (newCollapsed: boolean) => {
    setCollapsedState(newCollapsed);
    // Save as user preference (only meaningful on desktop)
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      setUserPreference(newCollapsed);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      
      if (isMobile) {
        // On mobile, always collapse
        setCollapsedState(true);
      } else {
        // On desktop, restore user preference or default to expanded
        const preference = userPreference !== null ? userPreference : false;
        setCollapsedState(preference);
      }
    };

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userPreference]);

  return {
    collapsed,
    setCollapsed,
    userPreference,
    setUserPreference,
  };
};
