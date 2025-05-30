'use client';

import { createLazySection, preloadComponent } from '@/components/hoc/withLazyLoading';

/**
 * Lazy-loaded home page components for better performance
 * These components are loaded on-demand to reduce initial bundle size
 */

// Hero Section - Critical, load immediately
export const LazyHeroSection = createLazySection(
  () => import('@/components/home/HeroSection'),
  'hero'
);

// Services Section - Important, load with priority
export const LazyServicesSection = createLazySection(
  () => import('@/components/home/ServicesSection'),
  'services'
);

// About Section - Load when needed
export const LazyAboutSection = createLazySection(
  () => import('@/components/home/AboutSection'),
  'services'
);

// Why Choose Us Section - Load when needed
export const LazyWhyChooseUsSection = createLazySection(
  () => import('@/components/home/WhyChooseUsSection'),
  'services'
);

// Process and FAQ Section - Load when needed
export const LazyProcessAndFaqSection = createLazySection(
  () => import('@/components/home/ProcessAndFaqSection'),
  'services'
);

// CTA Section - Load when needed
export const LazyCtaSection = createLazySection(
  () => import('@/components/home/CtaSection'),
  'contact'
);

/**
 * Preload functions for performance optimization
 * Call these functions to preload components before they're needed
 */
export const preloadHomeComponents = {
  hero: () => preloadComponent(() => import('@/components/home/HeroSection')),
  services: () => preloadComponent(() => import('@/components/home/ServicesSection')),
  about: () => preloadComponent(() => import('@/components/home/AboutSection')),
  whyChooseUs: () => preloadComponent(() => import('@/components/home/WhyChooseUsSection')),
  processAndFaq: () => preloadComponent(() => import('@/components/home/ProcessAndFaqSection')),
  cta: () => preloadComponent(() => import('@/components/home/CtaSection')),
};

/**
 * Preload all non-critical home components
 * Call this function to preload components that are below the fold
 */
export const preloadBelowFoldComponents = async (): Promise<void> => {
  try {
    await Promise.all([
      preloadHomeComponents.about(),
      preloadHomeComponents.whyChooseUs(),
      preloadHomeComponents.processAndFaq(),
      preloadHomeComponents.cta(),
    ]);
  } catch (error) {
    console.warn('Failed to preload some below-fold components:', error);
  }
};

/**
 * Preload critical components
 * Call this function to preload components that are above the fold
 */
export const preloadCriticalComponents = async (): Promise<void> => {
  try {
    await Promise.all([
      preloadHomeComponents.hero(),
      preloadHomeComponents.services(),
    ]);
  } catch (error) {
    console.warn('Failed to preload some critical components:', error);
  }
};
