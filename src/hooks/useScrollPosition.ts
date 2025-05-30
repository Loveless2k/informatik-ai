'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollPositionOptions {
  throttleMs?: number;
  element?: React.RefObject<HTMLElement>;
  disabled?: boolean;
}

interface UseScrollPositionReturn {
  scrollPosition: ScrollPosition;
  isScrolled: boolean;
  scrollDirection: 'up' | 'down' | null;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
}

/**
 * Custom hook for tracking scroll position with optimized performance
 *
 * @param options Configuration options for the hook
 * @returns Object containing scroll position data and utilities
 *
 * @example
 * ```tsx
 * const { scrollPosition, isScrolled, scrollDirection } = useScrollPosition({
 *   throttleMs: 16,
 *   disabled: false
 * });
 * ```
 */
export const useScrollPosition = (
  options: UseScrollPositionOptions = {}
): UseScrollPositionReturn => {
  const { throttleMs = 16, element, disabled = false } = options;

  // State
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  // Refs for performance optimization
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (disabled || typeof window === 'undefined') return;

    const target = element?.current || window;
    const scrollX = element?.current ? element.current.scrollLeft : window.pageXOffset || 0;
    const scrollY = element?.current ? element.current.scrollTop : window.pageYOffset || 0;

    // Update scroll direction
    if (scrollY > lastScrollY.current) {
      setScrollDirection('down');
    } else if (scrollY < lastScrollY.current) {
      setScrollDirection('up');
    }

    lastScrollY.current = scrollY;

    // Update position
    setScrollPosition({ x: scrollX, y: scrollY });
    ticking.current = false;
  }, [disabled, element]);

  // Throttled scroll event handler
  const onScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(handleScroll);
      ticking.current = true;
    }
  }, [handleScroll]);

  // Effect to set up scroll listener
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const target = element?.current || window;

    // Set initial position with SSR safety
    const initialX = element?.current ? element.current.scrollLeft : window.pageXOffset || 0;
    const initialY = element?.current ? element.current.scrollTop : window.pageYOffset || 0;
    setScrollPosition({ x: initialX, y: initialY });
    lastScrollY.current = initialY;

    // Add event listener
    target.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', onScroll);
    };
  }, [onScroll, disabled, element]);

  // Computed values
  const isScrolled = scrollPosition.y > 0;
  const isScrollingUp = scrollDirection === 'up';
  const isScrollingDown = scrollDirection === 'down';
  const isAtTop = scrollPosition.y === 0;

  // Calculate if at bottom (for window or element) - with SSR safety
  const isAtBottom = element?.current
    ? scrollPosition.y >= element.current.scrollHeight - element.current.clientHeight
    : typeof window !== 'undefined' && typeof document !== 'undefined'
      ? scrollPosition.y >= document.documentElement.scrollHeight - window.innerHeight
      : false;

  return {
    scrollPosition,
    isScrolled,
    scrollDirection,
    isScrollingUp,
    isScrollingDown,
    isAtTop,
    isAtBottom,
  };
};

export default useScrollPosition;
