'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Types
export type SetValue<T> = T | ((val: T) => T);

export interface UseLocalStorageOptions {
  serializer?: {
    read: (value: string) => any;
    write: (value: any) => string;
  };
  syncAcrossTabs?: boolean;
  onError?: (error: Error) => void;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: SetValue<T>) => void;
  removeValue: () => void;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Custom hook for managing localStorage with TypeScript support and error handling
 * 
 * @param key The localStorage key
 * @param initialValue Initial value if key doesn't exist
 * @param options Configuration options
 * @returns Object containing value, setter, remover, and state
 * 
 * @example
 * ```tsx
 * const { value: theme, setValue: setTheme, isLoading } = useLocalStorage('theme', 'light', {
 *   syncAcrossTabs: true,
 *   onError: (error) => console.error('LocalStorage error:', error)
 * });
 * ```
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
): UseLocalStorageReturn<T> => {
  const {
    serializer = {
      read: JSON.parse,
      write: JSON.stringify,
    },
    syncAcrossTabs = true,
    onError,
  } = options;

  // State
  const [value, setValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Ref to track if we're in the browser
  const isBrowser = typeof window !== 'undefined';
  const isInitialized = useRef(false);

  // Read value from localStorage
  const readValue = useCallback((): T => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return serializer.read(item);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to read from localStorage');
      setError(err);
      onError?.(err);
      return initialValue;
    }
  }, [key, initialValue, serializer, isBrowser, onError]);

  // Write value to localStorage
  const writeValue = useCallback(
    (value: T) => {
      if (!isBrowser) {
        return;
      }

      try {
        window.localStorage.setItem(key, serializer.write(value));
        setError(null);
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to write to localStorage');
        setError(err);
        onError?.(err);
      }
    },
    [key, serializer, isBrowser, onError]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    if (!isBrowser) {
      return;
    }

    try {
      window.localStorage.removeItem(key);
      setValue(initialValue);
      setError(null);
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to remove from localStorage');
      setError(err);
      onError?.(err);
    }
  }, [key, initialValue, isBrowser, onError]);

  // Set value with support for functional updates
  const setStoredValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const newValue = value instanceof Function ? value(readValue()) : value;
        setValue(newValue);
        writeValue(newValue);
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Failed to set localStorage value');
        setError(err);
        onError?.(err);
      }
    },
    [readValue, writeValue, onError]
  );

  // Initialize value from localStorage
  useEffect(() => {
    if (!isBrowser || isInitialized.current) {
      return;
    }

    try {
      const storedValue = readValue();
      setValue(storedValue);
      isInitialized.current = true;
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to initialize from localStorage');
      setError(err);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [readValue, isBrowser, onError]);

  // Listen for storage changes across tabs
  useEffect(() => {
    if (!isBrowser || !syncAcrossTabs) {
      return;
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const newValue = serializer.read(e.newValue);
          setValue(newValue);
          setError(null);
        } catch (error) {
          const err = error instanceof Error ? error : new Error('Failed to sync localStorage across tabs');
          setError(err);
          onError?.(err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, serializer, syncAcrossTabs, isBrowser, onError]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    isLoading,
    error,
  };
};

export default useLocalStorage;
