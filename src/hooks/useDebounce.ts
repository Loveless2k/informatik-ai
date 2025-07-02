'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Types
export interface UseDebouncedValueOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export interface UseDebouncedCallbackOptions extends UseDebouncedValueOptions {
  deps?: React.DependencyList;
}

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
}

/**
 * Custom hook for debouncing values with optimized performance
 * 
 * @param value The value to debounce
 * @param delay Delay in milliseconds
 * @param options Configuration options
 * @returns Debounced value
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export const useDebounce = <T>(
  value: T,
  delay: number,
  options: UseDebouncedValueOptions = {}
): T => {
  const { leading = false, trailing = true, maxWait } = options;

  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastInvokeTimeRef = useRef<number>(0);
  const leadingRef = useRef<boolean>(true);

  // Clear timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
  }, []);

  // Invoke the debounced update
  const invokeFunc = useCallback((newValue: T) => {
    setDebouncedValue(newValue);
    lastInvokeTimeRef.current = Date.now();
    clearTimeouts();
  }, [clearTimeouts]);

  // Leading edge handler
  const leadingEdge = useCallback((newValue: T) => {
    lastInvokeTimeRef.current = Date.now();
    if (leading) {
      setDebouncedValue(newValue);
    }
  }, [leading]);

  // Trailing edge handler
  const trailingEdge = useCallback((newValue: T) => {
    if (trailing) {
      invokeFunc(newValue);
    }
  }, [trailing, invokeFunc]);

  // Should invoke check
  const shouldInvoke = useCallback((time: number) => {
    const timeSinceLastCall = time - lastCallTimeRef.current;
    const timeSinceLastInvoke = time - lastInvokeTimeRef.current;

    return (
      leadingRef.current ||
      timeSinceLastCall >= delay ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  }, [delay, maxWait]);

  // Main debounce effect
  useEffect(() => {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    
    lastCallTimeRef.current = time;

    if (isInvoking) {
      if (leadingRef.current) {
        leadingRef.current = false;
        leadingEdge(value);
      }

      if (maxWait !== undefined) {
        maxTimeoutRef.current = setTimeout(() => {
          trailingEdge(value);
        }, maxWait - (time - lastInvokeTimeRef.current));
      }
    }

    clearTimeouts();

    timeoutRef.current = setTimeout(() => {
      trailingEdge(value);
      leadingRef.current = true;
    }, delay);

    return clearTimeouts;
  }, [value, delay, shouldInvoke, leadingEdge, trailingEdge, clearTimeouts, maxWait]);

  // Reset leading flag when delay changes
  useEffect(() => {
    leadingRef.current = true;
  }, [delay]);

  return debouncedValue;
};

/**
 * Custom hook for debouncing callback functions
 * 
 * @param callback The function to debounce
 * @param delay Delay in milliseconds
 * @param options Configuration options
 * @returns Debounced function with control methods
 * 
 * @example
 * ```tsx
 * const debouncedSave = useDebouncedCallback(
 *   (data) => saveToAPI(data),
 *   500,
 *   { leading: false, trailing: true }
 * );
 * 
 * // Usage
 * debouncedSave(formData);
 * 
 * // Control methods
 * debouncedSave.cancel(); // Cancel pending execution
 * debouncedSave.flush();  // Execute immediately
 * const isPending = debouncedSave.pending(); // Check if execution is pending
 * ```
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  options: UseDebouncedCallbackOptions = {}
): DebouncedFunction<T> => {
  const { leading = false, trailing = true, maxWait, deps = [] } = options;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastInvokeTimeRef = useRef<number>(0);
  const lastArgsRef = useRef<Parameters<T> | undefined>(undefined);
  const leadingRef = useRef<boolean>(true);

  // Memoize callback with dependencies
  const memoizedCallback = useCallback(callback, deps);

  // Clear timeouts
  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (maxTimeoutRef.current) {
      clearTimeout(maxTimeoutRef.current);
      maxTimeoutRef.current = null;
    }
  }, []);

  // Invoke the callback
  const invokeFunc = useCallback(() => {
    if (lastArgsRef.current) {
      memoizedCallback(...lastArgsRef.current);
      lastInvokeTimeRef.current = Date.now();
      clearTimeouts();
    }
  }, [memoizedCallback, clearTimeouts]);

  // Check if should invoke
  const shouldInvoke = useCallback((time: number) => {
    const timeSinceLastCall = time - lastCallTimeRef.current;
    const timeSinceLastInvoke = time - lastInvokeTimeRef.current;

    return (
      leadingRef.current ||
      timeSinceLastCall >= delay ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait)
    );
  }, [delay, maxWait]);

  // Main debounced function
  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      const time = Date.now();
      const isInvoking = shouldInvoke(time);
      
      lastArgsRef.current = args;
      lastCallTimeRef.current = time;

      if (isInvoking) {
        if (leadingRef.current) {
          leadingRef.current = false;
          if (leading) {
            memoizedCallback(...args);
            lastInvokeTimeRef.current = time;
          }
        }

        if (maxWait !== undefined) {
          maxTimeoutRef.current = setTimeout(() => {
            invokeFunc();
          }, maxWait - (time - lastInvokeTimeRef.current));
        }
      }

      clearTimeouts();

      if (trailing) {
        timeoutRef.current = setTimeout(() => {
          invokeFunc();
          leadingRef.current = true;
        }, delay);
      }
    },
    [delay, leading, trailing, maxWait, shouldInvoke, memoizedCallback, invokeFunc, clearTimeouts]
  );

  // Cancel function
  const cancel = useCallback(() => {
    clearTimeouts();
    leadingRef.current = true;
    lastArgsRef.current = undefined;
  }, [clearTimeouts]);

  // Flush function (execute immediately)
  const flush = useCallback(() => {
    if (timeoutRef.current) {
      invokeFunc();
      leadingRef.current = true;
    }
  }, [invokeFunc]);

  // Check if execution is pending
  const pending = useCallback(() => {
    return timeoutRef.current !== null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimeouts;
  }, [clearTimeouts]);

  // Return debounced function with control methods
  return useMemo(() => {
    const fn = debouncedFunction as DebouncedFunction<T>;
    fn.cancel = cancel;
    fn.flush = flush;
    fn.pending = pending;
    return fn;
  }, [debouncedFunction, cancel, flush, pending]);
};

export default useDebounce;
