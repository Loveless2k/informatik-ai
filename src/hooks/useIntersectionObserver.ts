'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Types
interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
  initialIsIntersecting?: boolean;
  onIntersect?: (entry: IntersectionObserverEntry) => void;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom hook for Intersection Observer API with optimized performance
 * 
 * @param options Configuration options for the intersection observer
 * @returns Object containing ref, intersection state, and entry data
 * 
 * @example
 * ```tsx
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.1,
 *   rootMargin: '-100px',
 *   freezeOnceVisible: true,
 *   onIntersect: (entry) => console.log('Element intersected:', entry)
 * });
 * 
 * return <div ref={ref}>{isIntersecting ? 'Visible!' : 'Not visible'}</div>;
 * ```
 */
export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
    initialIsIntersecting = false,
    onIntersect,
  } = options;

  // Refs and state
  const elementRef = useRef<HTMLElement>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);
  
  // Ref to track if we should freeze the state
  const frozen = useRef(false);

  // Memoized observer callback
  const updateEntry = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (!entry) return;

      // If frozen and was intersecting, don't update
      if (frozen.current && freezeOnceVisible) {
        return;
      }

      setEntry(entry);
      setIsIntersecting(entry.isIntersecting);

      // Call custom callback if provided
      onIntersect?.(entry);

      // Freeze if option is enabled and element is intersecting
      if (freezeOnceVisible && entry.isIntersecting) {
        frozen.current = true;
      }
    },
    [freezeOnceVisible, onIntersect]
  );

  // Effect to set up intersection observer
  useEffect(() => {
    const element = elementRef.current;
    
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver is not supported in this browser');
      return;
    }

    // Create observer with memoized callback
    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    // Start observing
    observer.observe(element);

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, updateEntry]);

  // Reset frozen state when element changes
  useEffect(() => {
    frozen.current = false;
  }, [elementRef.current]);

  return {
    ref: elementRef,
    isIntersecting,
    entry,
  };
};

/**
 * Hook for observing multiple elements with a single observer
 * 
 * @param options Configuration options for the intersection observer
 * @returns Function to register elements and map of intersection states
 * 
 * @example
 * ```tsx
 * const { observe, intersections } = useIntersectionObserverMultiple({
 *   threshold: 0.1,
 * });
 * 
 * const ref1 = useCallback((node) => observe('element1', node), [observe]);
 * const ref2 = useCallback((node) => observe('element2', node), [observe]);
 * 
 * return (
 *   <>
 *     <div ref={ref1}>{intersections.element1 ? 'Visible!' : 'Hidden'}</div>
 *     <div ref={ref2}>{intersections.element2 ? 'Visible!' : 'Hidden'}</div>
 *   </>
 * );
 * ```
 */
export const useIntersectionObserverMultiple = (
  options: IntersectionObserverOptions = {}
) => {
  const [intersections, setIntersections] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  // Initialize observer
  useEffect(() => {
    if (!window.IntersectionObserver) {
      console.warn('IntersectionObserver is not supported in this browser');
      return;
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const updates: Record<string, boolean> = {};
      
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        const key = element.dataset.observerKey;
        
        if (key) {
          updates[key] = entry.isIntersecting;
        }
      });

      if (Object.keys(updates).length > 0) {
        setIntersections((prev) => ({ ...prev, ...updates }));
      }
    }, options);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [options]);

  // Function to observe an element
  const observe = useCallback((key: string, element: HTMLElement | null) => {
    if (!observerRef.current) return;

    // Remove previous element with this key
    const previousElement = elementsRef.current.get(key);
    if (previousElement) {
      observerRef.current.unobserve(previousElement);
      elementsRef.current.delete(key);
    }

    // Add new element
    if (element) {
      element.dataset.observerKey = key;
      elementsRef.current.set(key, element);
      observerRef.current.observe(element);
    }
  }, []);

  return {
    observe,
    intersections,
  };
};

export default useIntersectionObserver;
