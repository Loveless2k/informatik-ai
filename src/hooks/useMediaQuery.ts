'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
export interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

export interface UseMediaQueryReturn {
  matches: boolean;
  media: string;
}

// Common breakpoints for convenience
export const BREAKPOINTS = {
  xs: '(max-width: 475px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  retina: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
  dark: '(prefers-color-scheme: dark)',
  light: '(prefers-color-scheme: light)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: high)',
} as const;

/**
 * Custom hook for responsive design using CSS media queries
 * 
 * @param query CSS media query string
 * @param options Configuration options
 * @returns Object containing match state and query string
 * 
 * @example
 * ```tsx
 * const { matches: isMobile } = useMediaQuery(BREAKPOINTS.mobile);
 * const { matches: isDark } = useMediaQuery('(prefers-color-scheme: dark)');
 * const { matches: isLarge } = useMediaQuery('(min-width: 1024px)', {
 *   defaultValue: false,
 *   initializeWithValue: true
 * });
 * ```
 */
export const useMediaQuery = (
  query: string,
  options: UseMediaQueryOptions = {}
): UseMediaQueryReturn => {
  const { defaultValue = false, initializeWithValue = true } = options;

  // Get initial value
  const getMatches = useCallback((query: string): boolean => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    return window.matchMedia(query).matches;
  }, [defaultValue]);

  // State
  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) {
      return getMatches(query);
    }
    return defaultValue;
  });

  // Ref to store the MediaQueryList
  const mediaQueryListRef = useRef<MediaQueryList | null>(null);

  // Effect to set up media query listener
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    mediaQueryListRef.current = mediaQueryList;

    // Set initial value if not already initialized
    if (!initializeWithValue) {
      setMatches(mediaQueryList.matches);
    }

    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener (use deprecated addListener for older browsers)
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Cleanup function
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query, initializeWithValue]);

  return {
    matches,
    media: query,
  };
};

/**
 * Hook for multiple media queries with optimized performance
 * 
 * @param queries Object with query names and CSS media query strings
 * @param options Configuration options
 * @returns Object with query results
 * 
 * @example
 * ```tsx
 * const breakpoints = useMediaQueries({
 *   isMobile: BREAKPOINTS.mobile,
 *   isTablet: BREAKPOINTS.tablet,
 *   isDesktop: BREAKPOINTS.desktop,
 *   isDark: BREAKPOINTS.dark,
 * });
 * 
 * if (breakpoints.isMobile) {
 *   return <MobileComponent />;
 * }
 * ```
 */
export const useMediaQueries = (
  queries: Record<string, string>,
  options: UseMediaQueryOptions = {}
): Record<string, boolean> => {
  const { defaultValue = false, initializeWithValue = true } = options;

  // Initialize state with all queries
  const [matches, setMatches] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    
    Object.entries(queries).forEach(([key, query]) => {
      if (initializeWithValue && typeof window !== 'undefined') {
        initialState[key] = window.matchMedia(query).matches;
      } else {
        initialState[key] = defaultValue;
      }
    });
    
    return initialState;
  });

  // Refs to store MediaQueryLists
  const mediaQueryListsRef = useRef<Map<string, MediaQueryList>>(new Map());

  // Effect to set up all media query listeners
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryLists = new Map<string, MediaQueryList>();
    const handlers = new Map<string, (event: MediaQueryListEvent) => void>();

    // Set up listeners for each query
    Object.entries(queries).forEach(([key, query]) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryLists.set(key, mediaQueryList);

      // Set initial value if not already initialized
      if (!initializeWithValue) {
        setMatches(prev => ({ ...prev, [key]: mediaQueryList.matches }));
      }

      // Create handler for this specific query
      const handler = (event: MediaQueryListEvent) => {
        setMatches(prev => ({ ...prev, [key]: event.matches }));
      };
      handlers.set(key, handler);

      // Add listener
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', handler);
      } else {
        mediaQueryList.addListener(handler);
      }
    });

    mediaQueryListsRef.current = mediaQueryLists;

    // Cleanup function
    return () => {
      mediaQueryLists.forEach((mediaQueryList, key) => {
        const handler = handlers.get(key);
        if (handler) {
          if (mediaQueryList.removeEventListener) {
            mediaQueryList.removeEventListener('change', handler);
          } else {
            mediaQueryList.removeListener(handler);
          }
        }
      });
    };
  }, [queries, initializeWithValue]);

  return matches;
};

/**
 * Convenience hooks for common breakpoints
 */
export const useIsMobile = (options?: UseMediaQueryOptions) => 
  useMediaQuery(BREAKPOINTS.mobile, options);

export const useIsTablet = (options?: UseMediaQueryOptions) => 
  useMediaQuery(BREAKPOINTS.tablet, options);

export const useIsDesktop = (options?: UseMediaQueryOptions) => 
  useMediaQuery(BREAKPOINTS.desktop, options);

export const useIsDarkMode = (options?: UseMediaQueryOptions) => 
  useMediaQuery(BREAKPOINTS.dark, options);

export const usePrefersReducedMotion = (options?: UseMediaQueryOptions) => 
  useMediaQuery(BREAKPOINTS.reducedMotion, options);

export default useMediaQuery;
