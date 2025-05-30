'use client';

import React, { useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import DataStreamButton from './buttons/DataStreamButton';

// Types
interface NavLink {
  href: string;
  label: string;
}

interface SocialLink {
  icon: 'linkedin' | 'twitter' | 'instagram';
  url: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  showSocial?: boolean;
  showCTA?: boolean;
}

// Social links configuration
const SOCIAL_LINKS: SocialLink[] = [
  { icon: 'linkedin', url: 'https://linkedin.com/company/informatik-ai', label: 'LinkedIn' },
  { icon: 'twitter', url: 'https://twitter.com/informatik_ai', label: 'Twitter' },
  { icon: 'instagram', url: 'https://instagram.com/informatik_ai', label: 'Instagram' },
];

/**
 * MobileMenu Component
 * A responsive mobile navigation menu with animations and accessibility features
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  showSocial = true,
  showCTA = true
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('aria-hidden', 'true');
    } else {
      document.body.style.overflow = 'auto';
      document.body.removeAttribute('aria-hidden');
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeAttribute('aria-hidden');
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Optimized close handler
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  // Memoized animation variants for performance
  const animationVariants = useMemo(() => ({
    backdrop: {
      closed: {
        opacity: 0,
        transition: { duration: 0.2 },
      },
      open: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
    },
    menu: {
      closed: {
        x: '100%',
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          when: 'afterChildren',
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
      },
      open: {
        x: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          when: 'beforeChildren',
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    item: {
      closed: {
        x: 50,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
      },
      open: {
        x: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
        },
      },
    },
  }), []);

  // Memoized styles
  const menuStyles = useMemo(() => ({
    panel: `fixed top-0 right-0 h-[100dvh] w-[90%] sm:w-[80%] md:w-[70%] max-w-sm shadow-2xl z-50 md:hidden flex flex-col overflow-hidden ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`,
    header: `flex justify-between items-center p-3 ${
      isDarkMode ? 'border-gray-600' : 'border-gray-100'
    } border-b`,
    closeButton: `p-1.5 rounded-full transition-colors ${
      isDarkMode
        ? 'bg-gray-700 hover:bg-gray-600 text-white'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    }`,
    navLink: `group block py-2 px-3 text-base font-medium rounded-lg transition-colors relative overflow-hidden ${
      isDarkMode
        ? 'text-white hover:text-blue-400 hover:bg-gray-700'
        : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
    }`,
  }), [isDarkMode]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden'
            initial='closed'
            animate='open'
            exit='closed'
            variants={animationVariants.backdrop}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.div
            className={menuStyles.panel}
            initial='closed'
            animate='open'
            exit='closed'
            variants={animationVariants.menu}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            aria-describedby="mobile-menu-description"
          >
            {/* Header */}
            <div className={menuStyles.header}>
              <h2
                id="mobile-menu-title"
                className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              >
                Menú de navegación
              </h2>
              <motion.button
                className={menuStyles.closeButton}
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Cerrar menú de navegación"
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </motion.button>
            </div>

            {/* Navigation links */}
            <nav
              className='flex-1 overflow-y-auto p-3 pb-0'
              role="navigation"
              aria-label="Navegación principal móvil"
            >
              <p
                id="mobile-menu-description"
                className="sr-only"
              >
                Menú de navegación principal para dispositivos móviles
              </p>
              <ul className='space-y-1 sm:space-y-2' role="list">
                {links.map((link: NavLink, index: number) => (
                  <motion.li
                    key={`${link.href}-${index}`}
                    variants={animationVariants.item}
                    role="listitem"
                  >
                    <Link
                      href={link.href}
                      className={menuStyles.navLink}
                      onClick={handleClose}
                      aria-label={`Ir a ${link.label}`}
                    >
                      <span
                        className={`absolute left-0 top-0 h-full w-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                        }`}
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* CTA Button */}
            {showCTA && (
              <div className={`p-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-100'} border-t`}>
                <motion.div variants={animationVariants.item}>
                  <DataStreamButton href='/contact' className='w-full'>
                    <span className='text-sm font-medium'>Contáctanos</span>
                  </DataStreamButton>
                </motion.div>
              </div>
            )}

            {/* Social links */}
            {showSocial && (
              <div className='p-2 flex justify-center space-x-3 pb-3'>
                {SOCIAL_LINKS.map((social: SocialLink, index: number) => (
                  <motion.a
                    key={`${social.icon}-${index}`}
                    href={social.url}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isDarkMode
                        ? 'bg-gray-700 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white'
                    }`}
                    variants={animationVariants.item}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`Visitar ${social.label}`}
                  >
                    <SocialIcon icon={social.icon} />
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Social Icon Component
const SocialIcon: React.FC<{ icon: 'linkedin' | 'twitter' | 'instagram' }> = ({ icon }) => {
  const iconPaths = {
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    instagram: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z'
  };

  return (
    <svg
      className='w-4 h-4'
      fill='currentColor'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden="true"
    >
      <path d={iconPaths[icon]} />
    </svg>
  );
};

export default MobileMenu;
