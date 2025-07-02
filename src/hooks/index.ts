/**
 * Custom Hooks Index
 *
 * This file exports all custom hooks for easy importing throughout the application.
 * All hooks are optimized for performance and follow React best practices.
 */

// Core hooks
export { default as useScrollPosition } from './useScrollPosition';
export { default as useLocalStorage } from './useLocalStorage';
export { default as useIntersectionObserver, useIntersectionObserverMultiple } from './useIntersectionObserver';
export { default as useMediaQuery, useMediaQueries, useIsMobile, useIsTablet, useIsDesktop, useIsDarkMode, usePrefersReducedMotion, BREAKPOINTS } from './useMediaQuery';
export { default as useDebounce, useDebouncedCallback } from './useDebounce';
export { default as useReducedMotion, useReducedMotionLegacy } from './useReducedMotion';
export { default as usePerformance, useRenderPerformance } from './usePerformance';
export { default as useLazyImage, useLazyImages, useImagePreloader } from './useLazyImage';

// Re-export types for convenience
export type { UseScrollPositionOptions, UseScrollPositionReturn, ScrollPosition } from './useScrollPosition';
export type { UseLocalStorageOptions, UseLocalStorageReturn, SetValue } from './useLocalStorage';
export type { UseIntersectionObserverOptions, UseIntersectionObserverReturn } from './useIntersectionObserver';
export type { UseMediaQueryOptions, UseMediaQueryReturn } from './useMediaQuery';
export type { UseDebouncedValueOptions, UseDebouncedCallbackOptions, DebouncedFunction } from './useDebounce';
export type { ReducedMotionConfig, UseReducedMotionReturn } from './useReducedMotion';
export type { PerformanceMetrics, UsePerformanceOptions, UsePerformanceReturn } from './usePerformance';
export type { UseLazyImageOptions, UseLazyImageReturn } from './useLazyImage';
