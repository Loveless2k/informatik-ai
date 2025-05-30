'use client';

import { useMediaQuery, BREAKPOINTS } from './useMediaQuery';
import { useMemo } from 'react';

// Types
interface ReducedMotionConfig {
  respectUserPreference?: boolean;
  fallbackValue?: boolean;
  disableAnimations?: boolean;
}

interface UseReducedMotionReturn {
  prefersReducedMotion: boolean;
  shouldAnimate: boolean;
  getAnimationProps: (props: any) => any;
  getTransitionProps: (props: any) => any;
}

/**
 * Custom hook for handling reduced motion preferences and accessibility
 *
 * @param config Configuration options for reduced motion behavior
 * @returns Object containing reduced motion state and utilities
 *
 * @example
 * ```tsx
 * const { prefersReducedMotion, shouldAnimate, getAnimationProps } = useReducedMotion({
 *   respectUserPreference: true,
 *   disableAnimations: false
 * });
 *
 * // Use in Framer Motion components
 * <motion.div
 *   {...getAnimationProps({
 *     initial: { opacity: 0, y: 20 },
 *     animate: { opacity: 1, y: 0 },
 *     transition: { duration: 0.5 }
 *   })}
 * >
 *   Content
 * </motion.div>
 * ```
 */
export const useReducedMotion = (config: ReducedMotionConfig = {}): UseReducedMotionReturn => {
  const {
    respectUserPreference = true,
    fallbackValue = false,
    disableAnimations = false,
  } = config;

  // Detect user's motion preference
  const { matches: prefersReducedMotion } = useMediaQuery(BREAKPOINTS.reducedMotion, {
    defaultValue: fallbackValue,
    initializeWithValue: true,
  });

  // Determine if animations should be enabled
  const shouldAnimate = useMemo(() => {
    if (disableAnimations) return false;
    if (!respectUserPreference) return true;
    return !prefersReducedMotion;
  }, [disableAnimations, respectUserPreference, prefersReducedMotion]);

  // Get animation props with reduced motion considerations
  const getAnimationProps = useMemo(() => {
    return (props: any) => {
      if (!shouldAnimate) {
        // Return props without animations
        const { initial, animate, exit, transition, whileHover, whileTap, whileInView, ...restProps } = props;

        // Keep the final state as initial state
        return {
          ...restProps,
          initial: animate || initial,
          animate: animate || initial,
          transition: { duration: 0 },
        };
      }

      return props;
    };
  }, [shouldAnimate]);

  // Get transition props with reduced motion considerations
  const getTransitionProps = useMemo(() => {
    return (props: any) => {
      if (!shouldAnimate) {
        return {
          ...props,
          duration: 0,
          delay: 0,
        };
      }

      return props;
    };
  }, [shouldAnimate]);

  return {
    prefersReducedMotion,
    shouldAnimate,
    getAnimationProps,
    getTransitionProps,
  };
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use useReducedMotion() instead
 */
export function useReducedMotionLegacy(): boolean {
  const { prefersReducedMotion } = useReducedMotion();
  return prefersReducedMotion;
}

export default useReducedMotion;
