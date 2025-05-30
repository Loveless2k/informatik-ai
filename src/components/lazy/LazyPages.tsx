'use client';

import { createLazyPage, preloadComponent } from '@/components/hoc/withLazyLoading';

/**
 * Lazy-loaded page components for better performance and code splitting
 * These pages are loaded on-demand when the user navigates to them
 */

// About Page
export const LazyAboutPage = createLazyPage(
  () => import('@/app/about/page'),
  'About'
);

// Services Page
export const LazyServicesPage = createLazyPage(
  () => import('@/app/services/page'),
  'Services'
);

// Success Cases Page
export const LazySuccessCasesPage = createLazyPage(
  () => import('@/app/success-cases/page'),
  'Success Cases'
);

// Contact Page
export const LazyContactPage = createLazyPage(
  () => import('@/app/contact/page'),
  'Contact'
);

// Blog Page (if exists)
export const LazyBlogPage = createLazyPage(
  () => import('@/app/blog/page').catch(() => ({ default: () => <div>Blog page not found</div> })),
  'Blog'
);

// Resources Page (if exists)
export const LazyResourcesPage = createLazyPage(
  () => import('@/app/resources/page').catch(() => ({ default: () => <div>Resources page not found</div> })),
  'Resources'
);

/**
 * Preload functions for page components
 * Use these to preload pages before navigation for better UX
 */
export const preloadPages = {
  about: () => preloadComponent(() => import('@/app/about/page')),
  services: () => preloadComponent(() => import('@/app/services/page')),
  successCases: () => preloadComponent(() => import('@/app/success-cases/page')),
  contact: () => preloadComponent(() => import('@/app/contact/page')),
  blog: () => preloadComponent(() => import('@/app/blog/page').catch(() => ({ default: () => null }))),
  resources: () => preloadComponent(() => import('@/app/resources/page').catch(() => ({ default: () => null }))),
};

/**
 * Preload all pages for better navigation performance
 * Call this function after the initial page load to preload other pages
 */
export const preloadAllPages = async (): Promise<void> => {
  try {
    // Preload pages in order of likely navigation
    await Promise.all([
      preloadPages.services(),
      preloadPages.about(),
      preloadPages.contact(),
      preloadPages.successCases(),
    ]);
  } catch (error) {
    console.warn('Failed to preload some pages:', error);
  }
};

/**
 * Preload high-priority pages
 * Call this function to preload the most important pages first
 */
export const preloadHighPriorityPages = async (): Promise<void> => {
  try {
    await Promise.all([
      preloadPages.services(),
      preloadPages.contact(),
    ]);
  } catch (error) {
    console.warn('Failed to preload high-priority pages:', error);
  }
};
