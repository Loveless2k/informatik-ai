'use client';

import React, { Suspense, ComponentType, lazy, ReactElement } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSkeleton, { ComponentLoadingSkeleton, PageLoadingSkeleton } from '@/components/ui/LoadingSkeleton';

// Types
interface LazyLoadingOptions {
  fallback?: ReactElement;
  errorFallback?: ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
  skeletonType?: 'page' | 'component' | 'hero' | 'services' | 'testimonials' | 'contact';
  retryCount?: number;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
}

interface LazyComponentProps {
  [key: string]: any;
}

/**
 * Default error fallback component
 */
const DefaultErrorFallback: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Algo salió mal
        </h2>
        <p className="text-gray-600 mb-6">
          Ha ocurrido un error al cargar este componente. Por favor, inténtalo de nuevo.
        </p>
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            Detalles del error
          </summary>
          <pre className="mt-2 text-xs text-red-500 bg-red-50 p-2 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
};

/**
 * Create a default fallback component based on skeleton type
 */
const createDefaultFallback = (skeletonType: LazyLoadingOptions['skeletonType']) => {
  switch (skeletonType) {
    case 'page':
      return <PageLoadingSkeleton />;
    case 'hero':
      return <ComponentLoadingSkeleton type="hero" />;
    case 'services':
      return <ComponentLoadingSkeleton type="services" />;
    case 'testimonials':
      return <ComponentLoadingSkeleton type="testimonials" />;
    case 'contact':
      return <ComponentLoadingSkeleton type="contact" />;
    case 'component':
    default:
      return <LoadingSkeleton type="section" />;
  }
};

/**
 * Higher-Order Component for lazy loading with error boundaries and loading states
 * 
 * @param importFunc Function that returns a dynamic import promise
 * @param options Configuration options for lazy loading behavior
 * @returns Enhanced component with lazy loading capabilities
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const LazyAboutPage = withLazyLoading(
 *   () => import('@/components/pages/AboutPage'),
 *   { skeletonType: 'page' }
 * );
 * 
 * // Advanced usage with custom error handling
 * const LazyServicesSection = withLazyLoading(
 *   () => import('@/components/home/ServicesSection'),
 *   {
 *     skeletonType: 'services',
 *     retryCount: 3,
 *     onError: (error, errorInfo) => {
 *       console.error('Lazy loading error:', error, errorInfo);
 *       // Send to error tracking service
 *     }
 *   }
 * );
 * ```
 */
export const withLazyLoading = <P extends LazyComponentProps>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  options: LazyLoadingOptions = {}
) => {
  const {
    fallback,
    errorFallback = DefaultErrorFallback,
    skeletonType = 'component',
    retryCount = 2,
    onError,
  } = options;

  // Create the lazy component
  const LazyComponent = lazy(importFunc);

  // Create the enhanced component
  const EnhancedComponent: React.FC<P> = (props) => {
    const defaultFallback = fallback || createDefaultFallback(skeletonType);

    return (
      <ErrorBoundary
        FallbackComponent={errorFallback}
        onError={onError}
        onReset={() => {
          // Optional: Add retry logic here
          window.location.reload();
        }}
      >
        <Suspense fallback={defaultFallback}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  // Set display name for debugging
  EnhancedComponent.displayName = `withLazyLoading(${LazyComponent.displayName || 'Component'})`;

  return EnhancedComponent;
};

/**
 * Factory function to create lazy-loaded page components
 * 
 * @param importFunc Function that returns a dynamic import promise for a page
 * @param pageName Optional page name for better error messages
 * @returns Lazy-loaded page component
 */
export const createLazyPage = <P extends LazyComponentProps>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  pageName?: string
) => {
  return withLazyLoading(importFunc, {
    skeletonType: 'page',
    onError: (error, errorInfo) => {
      console.error(`Error loading page ${pageName || 'Unknown'}:`, error, errorInfo);
      // Here you could send to your error tracking service
    },
  });
};

/**
 * Factory function to create lazy-loaded section components
 * 
 * @param importFunc Function that returns a dynamic import promise for a section
 * @param sectionType Type of section for appropriate skeleton
 * @returns Lazy-loaded section component
 */
export const createLazySection = <P extends LazyComponentProps>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  sectionType: 'hero' | 'services' | 'testimonials' | 'contact' = 'services'
) => {
  return withLazyLoading(importFunc, {
    skeletonType: sectionType,
    onError: (error, errorInfo) => {
      console.error(`Error loading section ${sectionType}:`, error, errorInfo);
    },
  });
};

/**
 * Preload a lazy component to improve perceived performance
 * 
 * @param importFunc Function that returns a dynamic import promise
 * @returns Promise that resolves when the component is preloaded
 */
export const preloadComponent = async (
  importFunc: () => Promise<{ default: ComponentType<any> }>
): Promise<void> => {
  try {
    await importFunc();
  } catch (error) {
    console.warn('Failed to preload component:', error);
  }
};

/**
 * Hook to preload components on user interaction (hover, focus, etc.)
 * 
 * @param importFunc Function that returns a dynamic import promise
 * @returns Object with preload function and loading state
 */
export const usePreloadComponent = (
  importFunc: () => Promise<{ default: ComponentType<any> }>
) => {
  const [isPreloading, setIsPreloading] = React.useState(false);
  const [isPreloaded, setIsPreloaded] = React.useState(false);

  const preload = React.useCallback(async () => {
    if (isPreloaded || isPreloading) return;

    setIsPreloading(true);
    try {
      await importFunc();
      setIsPreloaded(true);
    } catch (error) {
      console.warn('Failed to preload component:', error);
    } finally {
      setIsPreloading(false);
    }
  }, [importFunc, isPreloaded, isPreloading]);

  return {
    preload,
    isPreloading,
    isPreloaded,
  };
};

export default withLazyLoading;
