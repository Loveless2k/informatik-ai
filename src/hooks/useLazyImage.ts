'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

// Types
interface UseLazyImageOptions {
  threshold?: number;
  rootMargin?: string;
  placeholder?: string;
  fallback?: string;
  onLoad?: () => void;
  onError?: (error: Event) => void;
  eager?: boolean;
}

interface UseLazyImageReturn {
  src: string;
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  ref: React.RefObject<HTMLImageElement>;
}

/**
 * Custom hook for lazy loading images with intersection observer
 * 
 * @param imageSrc The source URL of the image to load
 * @param options Configuration options for lazy loading behavior
 * @returns Object containing image state and ref
 * 
 * @example
 * ```tsx
 * const { src, isLoading, isLoaded, hasError, ref } = useLazyImage(
 *   '/images/hero-image.jpg',
 *   {
 *     placeholder: '/images/placeholder.jpg',
 *     fallback: '/images/error.jpg',
 *     threshold: 0.1,
 *     rootMargin: '50px',
 *     onLoad: () => console.log('Image loaded'),
 *     onError: (error) => console.error('Image failed to load', error)
 *   }
 * );
 * 
 * return (
 *   <img
 *     ref={ref}
 *     src={src}
 *     alt="Description"
 *     className={`transition-opacity duration-300 ${
 *       isLoaded ? 'opacity-100' : 'opacity-0'
 *     }`}
 *   />
 * );
 * ```
 */
export const useLazyImage = (
  imageSrc: string,
  options: UseLazyImageOptions = {}
): UseLazyImageReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    placeholder = '',
    fallback = '',
    onLoad,
    onError,
    eager = false,
  } = options;

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  // Refs
  const imageRef = useRef<HTMLImageElement>(null);
  const imageObjectRef = useRef<HTMLImageElement | null>(null);

  // Intersection observer for lazy loading
  const { ref: observerRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  // Combine refs
  const combinedRef = useCallback((node: HTMLImageElement | null) => {
    imageRef.current = node;
    observerRef.current = node;
  }, [observerRef]);

  // Load image function
  const loadImage = useCallback(() => {
    if (!imageSrc || isLoaded || isLoading) return;

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    imageObjectRef.current = img;

    img.onload = () => {
      setCurrentSrc(imageSrc);
      setIsLoaded(true);
      setIsLoading(false);
      onLoad?.();
    };

    img.onerror = (error) => {
      setIsLoading(false);
      setHasError(true);
      if (fallback) {
        setCurrentSrc(fallback);
      }
      onError?.(error);
    };

    img.src = imageSrc;
  }, [imageSrc, isLoaded, isLoading, onLoad, onError, fallback]);

  // Effect to start loading when image becomes visible or eager loading is enabled
  useEffect(() => {
    if (eager || isIntersecting) {
      loadImage();
    }
  }, [eager, isIntersecting, loadImage]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (imageObjectRef.current) {
        imageObjectRef.current.onload = null;
        imageObjectRef.current.onerror = null;
      }
    };
  }, []);

  return {
    src: currentSrc,
    isLoading,
    isLoaded,
    hasError,
    ref: combinedRef,
  };
};

/**
 * Hook for lazy loading multiple images
 * 
 * @param imageSources Array of image source URLs
 * @param options Configuration options for lazy loading behavior
 * @returns Array of image states
 */
export const useLazyImages = (
  imageSources: string[],
  options: UseLazyImageOptions = {}
) => {
  const [imageStates, setImageStates] = useState(() =>
    imageSources.map(() => ({
      src: options.placeholder || '',
      isLoading: false,
      isLoaded: false,
      hasError: false,
    }))
  );

  const loadImage = useCallback(
    (index: number, imageSrc: string) => {
      if (!imageSrc || imageStates[index]?.isLoaded || imageStates[index]?.isLoading) return;

      setImageStates(prev => {
        const newStates = [...prev];
        newStates[index] = { ...newStates[index], isLoading: true, hasError: false };
        return newStates;
      });

      const img = new Image();

      img.onload = () => {
        setImageStates(prev => {
          const newStates = [...prev];
          newStates[index] = {
            src: imageSrc,
            isLoading: false,
            isLoaded: true,
            hasError: false,
          };
          return newStates;
        });
        options.onLoad?.();
      };

      img.onerror = (error) => {
        setImageStates(prev => {
          const newStates = [...prev];
          newStates[index] = {
            src: options.fallback || options.placeholder || '',
            isLoading: false,
            isLoaded: false,
            hasError: true,
          };
          return newStates;
        });
        options.onError?.(error);
      };

      img.src = imageSrc;
    },
    [imageStates, options]
  );

  // Load all images if eager loading is enabled
  useEffect(() => {
    if (options.eager) {
      imageSources.forEach((src, index) => {
        loadImage(index, src);
      });
    }
  }, [imageSources, loadImage, options.eager]);

  return {
    imageStates,
    loadImage,
  };
};

/**
 * Hook for preloading images
 * 
 * @param imageSources Array of image source URLs to preload
 * @returns Object with preload function and loading state
 */
export const useImagePreloader = (imageSources: string[]) => {
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  const preloadImages = useCallback(async () => {
    if (isPreloading) return;

    setIsPreloading(true);

    try {
      const promises = imageSources.map(src => {
        if (preloadedImages.has(src)) return Promise.resolve();

        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => new Set(prev).add(src));
            resolve();
          };
          img.onerror = reject;
          img.src = src;
        });
      });

      await Promise.all(promises);
    } catch (error) {
      console.warn('Failed to preload some images:', error);
    } finally {
      setIsPreloading(false);
    }
  }, [imageSources, isPreloading, preloadedImages]);

  return {
    preloadImages,
    isPreloading,
    preloadedImages,
  };
};

export default useLazyImage;
