'use client';

import { useEffect, useCallback, useRef, useState } from 'react';

// Types
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export interface UsePerformanceOptions {
  enableMetrics?: boolean;
  enableResourceTiming?: boolean;
  onMetric?: (metric: { name: string; value: number; rating: 'good' | 'needs-improvement' | 'poor' }) => void;
}

export interface UsePerformanceReturn {
  metrics: PerformanceMetrics;
  measureFunction: (name: string, fn: () => void | Promise<void>) => Promise<number>;
  markStart: (name: string) => void;
  markEnd: (name: string) => number | null;
  getResourceTiming: () => PerformanceResourceTiming[];
  clearMarks: () => void;
}

/**
 * Custom hook for performance monitoring and optimization
 * 
 * @param options Configuration options for performance monitoring
 * @returns Object containing performance metrics and measurement utilities
 * 
 * @example
 * ```tsx
 * const { metrics, measureFunction, markStart, markEnd } = usePerformance({
 *   enableMetrics: true,
 *   onMetric: (metric) => {
 *     console.log(`${metric.name}: ${metric.value}ms (${metric.rating})`);
 *     // Send to analytics service
 *   }
 * });
 * 
 * // Measure a function
 * const duration = await measureFunction('api-call', async () => {
 *   await fetch('/api/data');
 * });
 * 
 * // Manual timing
 * markStart('component-render');
 * // ... component rendering logic
 * const renderTime = markEnd('component-render');
 * ```
 */
export const usePerformance = (options: UsePerformanceOptions = {}): UsePerformanceReturn => {
  const { enableMetrics = true, enableResourceTiming = false, onMetric } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const marksRef = useRef<Map<string, number>>(new Map());

  // Get performance rating based on thresholds
  const getPerformanceRating = useCallback((metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metricName as keyof typeof thresholds];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }, []);

  // Measure Web Vitals
  const measureWebVitals = useCallback(() => {
    if (!enableMetrics || typeof window === 'undefined' || !('performance' in window)) return;

    // First Contentful Paint (FCP)
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      const fcp = fcpEntry.startTime;
      setMetrics(prev => ({ ...prev, fcp }));
      onMetric?.({ name: 'fcp', value: fcp, rating: getPerformanceRating('fcp', fcp) });
    }

    // Time to First Byte (TTFB)
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
      setMetrics(prev => ({ ...prev, ttfb }));
      onMetric?.({ name: 'ttfb', value: ttfb, rating: getPerformanceRating('ttfb', ttfb) });
    }

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            const lcp = lastEntry.startTime;
            setMetrics(prev => ({ ...prev, lcp }));
            onMetric?.({ name: 'lcp', value: lcp, rating: getPerformanceRating('lcp', lcp) });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            const fid = entry.processingStart - entry.startTime;
            setMetrics(prev => ({ ...prev, fid }));
            onMetric?.({ name: 'fid', value: fid, rating: getPerformanceRating('fid', fid) });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, cls: clsValue }));
              onMetric?.({ name: 'cls', value: clsValue, rating: getPerformanceRating('cls', clsValue) });
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Cleanup observers on unmount
        return () => {
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
    }

    return undefined;
  }, [enableMetrics, onMetric, getPerformanceRating]);

  // Measure function execution time
  const measureFunction = useCallback(async (name: string, fn: () => void | Promise<void>): Promise<number> => {
    const startTime = performance.now();
    await fn();
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Mark the measurement
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`, { startTime });
      performance.mark(`${name}-end`, { startTime: endTime });
      performance.measure(name, `${name}-start`, `${name}-end`);
    }

    return duration;
  }, []);

  // Mark start of a measurement
  const markStart = useCallback((name: string) => {
    const startTime = performance.now();
    marksRef.current.set(name, startTime);

    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`);
    }
  }, []);

  // Mark end of a measurement and return duration
  const markEnd = useCallback((name: string): number | null => {
    const endTime = performance.now();
    const startTime = marksRef.current.get(name);

    if (startTime === undefined) {
      console.warn(`No start mark found for "${name}"`);
      return null;
    }

    const duration = endTime - startTime;
    marksRef.current.delete(name);

    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
    }

    return duration;
  }, []);

  // Get resource timing information
  const getResourceTiming = useCallback((): PerformanceResourceTiming[] => {
    if (!enableResourceTiming || typeof window === 'undefined' || !('performance' in window)) {
      return [];
    }

    return performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  }, [enableResourceTiming]);

  // Clear all performance marks and measures
  const clearMarks = useCallback(() => {
    marksRef.current.clear();

    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }, []);

  // Initialize performance monitoring
  useEffect(() => {
    const cleanup = measureWebVitals();
    return cleanup;
  }, [measureWebVitals]);

  return {
    metrics,
    measureFunction,
    markStart,
    markEnd,
    getResourceTiming,
    clearMarks,
  };
};

/**
 * Hook for monitoring component render performance
 * 
 * @param componentName Name of the component for identification
 * @returns Object with render timing utilities
 */
export const useRenderPerformance = (componentName: string) => {
  const renderCountRef = useRef(0);
  const { markStart, markEnd, measureFunction } = usePerformance();

  const startRenderMeasurement = useCallback(() => {
    renderCountRef.current += 1;
    markStart(`${componentName}-render-${renderCountRef.current}`);
  }, [componentName, markStart]);

  const endRenderMeasurement = useCallback(() => {
    const duration = markEnd(`${componentName}-render-${renderCountRef.current}`);
    if (duration !== null && duration > 16) { // Warn if render takes longer than one frame
      console.warn(`${componentName} render took ${duration.toFixed(2)}ms (longer than 16ms)`);
    }
    return duration;
  }, [componentName, markEnd]);

  const measureRender = useCallback(async (renderFn: () => void | Promise<void>) => {
    return measureFunction(`${componentName}-render`, renderFn);
  }, [componentName, measureFunction]);

  return {
    startRenderMeasurement,
    endRenderMeasurement,
    measureRender,
    renderCount: renderCountRef.current,
  };
};

export default usePerformance;
