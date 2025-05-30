'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMediaQuery, BREAKPOINTS } from '@/hooks/useMediaQuery';

// Types
type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isLoading: boolean;
  systemTheme: ResolvedTheme;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Optimized ThemeProvider with localStorage persistence and system theme detection
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = false
}) => {
  // Use optimized localStorage hook
  const { value: storedTheme, setValue: setStoredTheme, isLoading } = useLocalStorage<Theme>(
    'theme',
    defaultTheme,
    {
      syncAcrossTabs: true,
      onError: (error) => console.warn('Theme localStorage error:', error)
    }
  );

  // Detect system theme preference
  const { matches: prefersDark } = useMediaQuery(BREAKPOINTS.dark, {
    defaultValue: false,
    initializeWithValue: false
  });

  // Memoized system theme
  const systemTheme: ResolvedTheme = useMemo(() => {
    return prefersDark ? 'dark' : 'light';
  }, [prefersDark]);

  // Current theme state
  const [theme, setThemeState] = useState<Theme>(storedTheme);

  // Resolve the actual theme (handle 'system' theme)
  const resolvedTheme: ResolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }
    return theme as ResolvedTheme;
  }, [theme, systemTheme]);

  // Optimized theme setter
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    setStoredTheme(newTheme);
  }, [setStoredTheme]);

  // Optimized theme toggler
  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      // If currently system, toggle to opposite of system preference
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      // Toggle between light and dark
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [theme, systemTheme, setTheme]);

  // Update theme state when stored theme changes
  useEffect(() => {
    setThemeState(storedTheme);
  }, [storedTheme]);

  // Apply theme to document
  useEffect(() => {
    if (isLoading || typeof window === 'undefined') return;

    const root = document.documentElement;

    // Disable transitions temporarily if requested
    if (disableTransitionOnChange) {
      const css = document.createElement('style');
      css.appendChild(
        document.createTextNode(
          `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
        )
      );
      document.head.appendChild(css);

      // Force reflow
      (() => window.getComputedStyle(document.body))();

      // Re-enable transitions after a frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.head.removeChild(css);
        });
      });
    }

    // Apply theme class
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [resolvedTheme, isLoading, disableTransitionOnChange]);

  // Memoized context value for performance
  const contextValue = useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    isLoading,
    systemTheme,
  }), [theme, resolvedTheme, setTheme, toggleTheme, isLoading, systemTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Optimized hook to use theme context with better error handling and performance
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  // Provide fallback values for better development experience
  if (context === undefined) {
    console.warn(
      'useTheme must be used within a ThemeProvider. Falling back to default values.'
    );

    // Return default values that match the interface
    return {
      theme: 'light',
      resolvedTheme: 'light',
      setTheme: (_theme: Theme) => {
        console.warn('useTheme: setTheme called outside of ThemeProvider');
      },
      toggleTheme: () => {
        console.warn('useTheme: toggleTheme called outside of ThemeProvider');
      },
      isLoading: false,
      systemTheme: 'light',
    };
  }

  return context;
};

/**
 * Hook to get only the resolved theme (optimized for components that only need the current theme)
 */
export const useResolvedTheme = (): ResolvedTheme => {
  const { resolvedTheme } = useTheme();
  return resolvedTheme;
};

/**
 * Hook to check if theme is loading
 */
export const useThemeLoading = (): boolean => {
  const { isLoading } = useTheme();
  return isLoading;
};

/**
 * Hook to get system theme preference
 */
export const useSystemTheme = (): ResolvedTheme => {
  const { systemTheme } = useTheme();
  return systemTheme;
};
