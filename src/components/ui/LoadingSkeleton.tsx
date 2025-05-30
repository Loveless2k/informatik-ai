'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Types
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  animate?: boolean;
}

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'avatar' | 'button' | 'section' | 'custom';
  lines?: number;
  className?: string;
  animate?: boolean;
}

/**
 * Basic Skeleton component for loading states
 */
const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width = '100%',
  height = '1rem',
  rounded = false,
  animate = true,
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const baseClasses = `${
    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
  } ${rounded ? 'rounded-full' : 'rounded'} ${className}`;

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        style={style}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      />
    );
  }

  return <div className={baseClasses} style={style} aria-hidden="true" />;
};

/**
 * Comprehensive Loading Skeleton component for different content types
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'text',
  lines = 3,
  className = '',
  animate = true,
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const containerClasses = `animate-pulse ${className}`;

  switch (type) {
    case 'card':
      return (
        <div className={`${containerClasses} p-6 rounded-lg border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton width={48} height={48} rounded animate={animate} />
            <div className="flex-1 space-y-2">
              <Skeleton height={16} width="75%" animate={animate} />
              <Skeleton height={14} width="50%" animate={animate} />
            </div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: lines }).map((_, index) => (
              <Skeleton
                key={index}
                height={12}
                width={index === lines - 1 ? '60%' : '100%'}
                animate={animate}
              />
            ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <Skeleton width={80} height={32} rounded animate={animate} />
            <Skeleton width={100} height={32} rounded animate={animate} />
          </div>
        </div>
      );

    case 'avatar':
      return (
        <div className={containerClasses}>
          <Skeleton width={40} height={40} rounded animate={animate} />
        </div>
      );

    case 'button':
      return (
        <div className={containerClasses}>
          <Skeleton width={120} height={40} rounded animate={animate} />
        </div>
      );

    case 'section':
      return (
        <div className={`${containerClasses} space-y-6`}>
          {/* Header */}
          <div className="space-y-3">
            <Skeleton height={32} width="40%" animate={animate} />
            <Skeleton height={16} width="80%" animate={animate} />
          </div>
          
          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <Skeleton height={48} width={48} rounded className="mb-3" animate={animate} />
                <Skeleton height={20} width="80%" className="mb-2" animate={animate} />
                <div className="space-y-2">
                  <Skeleton height={14} width="100%" animate={animate} />
                  <Skeleton height={14} width="70%" animate={animate} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'text':
    default:
      return (
        <div className={`${containerClasses} space-y-3`}>
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              height={16}
              width={index === lines - 1 ? '75%' : '100%'}
              animate={animate}
            />
          ))}
        </div>
      );
  }
};

/**
 * Page Loading Skeleton for full page loading states
 */
export const PageLoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    } ${className}`}>
      {/* Header Skeleton */}
      <div className={`sticky top-0 z-50 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Skeleton width={200} height={40} />
            <div className="hidden md:flex space-x-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} width={80} height={20} />
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton width={40} height={40} rounded />
              <Skeleton width={120} height={40} rounded />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <main className="container mx-auto px-4 py-8">
        <LoadingSkeleton type="section" />
      </main>
    </div>
  );
};

/**
 * Component Loading Skeleton for individual component loading states
 */
export const ComponentLoadingSkeleton: React.FC<{
  type?: 'hero' | 'services' | 'testimonials' | 'contact';
  className?: string;
}> = ({ type = 'services', className = '' }) => {
  switch (type) {
    case 'hero':
      return (
        <div className={`py-20 ${className}`}>
          <div className="container mx-auto px-4 text-center">
            <Skeleton height={48} width="60%" className="mx-auto mb-6" />
            <Skeleton height={20} width="80%" className="mx-auto mb-8" />
            <div className="flex justify-center space-x-4">
              <Skeleton width={140} height={48} rounded />
              <Skeleton width={160} height={48} rounded />
            </div>
          </div>
        </div>
      );

    case 'services':
      return (
        <div className={`py-16 ${className}`}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Skeleton height={36} width="40%" className="mx-auto mb-4" />
              <Skeleton height={16} width="60%" className="mx-auto" />
            </div>
            <LoadingSkeleton type="section" />
          </div>
        </div>
      );

    case 'testimonials':
      return (
        <div className={`py-16 ${className}`}>
          <div className="container mx-auto px-4">
            <Skeleton height={36} width="50%" className="mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <LoadingSkeleton key={index} type="card" lines={4} />
              ))}
            </div>
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className={`py-16 ${className}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Skeleton height={36} width="60%" className="mx-auto mb-8" />
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton height={16} width="30%" className="mb-2" />
                    <Skeleton height={48} width="100%" />
                  </div>
                ))}
                <Skeleton width={120} height={48} rounded className="mx-auto" />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return <LoadingSkeleton type="section" className={className} />;
  }
};

export { Skeleton };
export default LoadingSkeleton;
