'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MobileMenu from '@/components/ui/MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import DataStreamButton from '@/components/ui/buttons/DataStreamButton';
import { useTheme } from '@/context/ThemeContext';
import { useScrollPosition } from '@/hooks/useScrollPosition';

// Types
interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  className?: string;
}

// Navigation links configuration
const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/services', label: 'Servicios' },
  { href: '/success-cases', label: 'Casos de Éxito' },
  { href: '/calendario-informatik-ai', label: 'Calendario' },
  // Commented out as per user preferences
  // { href: '/blog', label: 'Blog' },
  // { href: '/resources', label: 'Recursos' },
  // { href: '/chatbot', label: 'Chatbot' },
  { href: '/contact', label: 'Contacto' },
];

// Animation variants
const headerVariants = {
  initial: { y: -100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const logoVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

/**
 * Header component with responsive navigation, theme switching, and scroll effects
 * @param props - Header component props
 * @returns JSX.Element
 */
const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Theme context - use resolvedTheme for actual theme value
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  // Use optimized scroll position hook
  const { scrollPosition } = useScrollPosition({
    throttleMs: 16, // 60fps for smooth animations
    disabled: false
  });

  // Check if scrolled past threshold for header styling
  const scrolled = scrollPosition.y > 10;

  // Toggle mobile menu with useCallback for performance
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Memoized header styles for performance optimization
  const headerStyles = useMemo(() => {
    const baseStyles = 'sticky top-0 z-50 transition-all duration-500';
    const scrolledStyles = scrolled
      ? isDarkMode
        ? 'bg-black shadow-lg shadow-[#00F0FF]/10 py-2.5 sm:py-3 md:py-4'
        : 'bg-[#E0FBFF] shadow-lg shadow-[#007D84]/10 py-2.5 sm:py-3 md:py-4'
      : isDarkMode
        ? 'bg-black/80 backdrop-blur-xl py-3 sm:py-4 md:py-5'
        : 'bg-[#E0FBFF]/80 backdrop-blur-xl py-3 sm:py-4 md:py-5';

    return `${baseStyles} ${scrolledStyles} ${className}`;
  }, [scrolled, isDarkMode, className]);

  return (
    <motion.header
      className={headerStyles}
      initial="initial"
      animate="animate"
      variants={headerVariants}
      role="banner"
    >
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='flex justify-between items-center h-16 sm:h-18 md:h-20'>
          {/* Logo with improved accessibility and animations */}
          <div className='flex items-center'>
            <Link
              href='/'
              className='flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg'
              aria-label="Informatik-AI - Ir a página principal"
            >
              <motion.div
                className='relative h-12 sm:h-14 md:h-17 w-[180px] sm:w-[220px] md:w-[280px]'
                variants={logoVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Image
                  src='/images/logos/logoInformatik-ai.png'
                  alt='Informatik-AI Logo'
                  width={280}
                  height={70}
                  className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-300 ${
                    isDarkMode ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority
                />
                <Image
                  src='/images/logos/logoInformatik-ai2.png'
                  alt='Informatik-AI Logo'
                  width={280}
                  height={70}
                  className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-300 ${
                    isDarkMode ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation with improved accessibility */}
          <nav className='hidden md:flex items-center space-x-6' role="navigation" aria-label="Navegación principal">
            {NAV_LINKS.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isDarkMode
                    ? 'text-white hover:text-[#00F0FF] hover:bg-white/5'
                    : 'text-[#111111] hover:text-[#007D84] hover:bg-black/5'
                }`}
                aria-label={`Ir a ${link.label}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side elements */}
          <div className='flex items-center space-x-4'>
            <ThemeToggle />
            <div className='hidden md:block'>
              <DataStreamButton href='/contact' className='w-auto'>
                Contáctanos
              </DataStreamButton>
            </div>

            {/* Mobile Menu Button with improved accessibility */}
            <motion.button
              className={`md:hidden focus:outline-none p-2 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'text-white bg-gray-800 hover:bg-gray-700 focus:ring-gray-600'
                  : 'text-[#111111] bg-white/80 hover:bg-white shadow-sm focus:ring-blue-500'
              } focus:ring-2 focus:ring-offset-2`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <svg
                    className='w-6 h-6'
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
                ) : (
                  <svg
                    className='w-6 h-6'
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
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMobileMenu}
        links={NAV_LINKS}
      />
    </motion.header>
  );
};

export default Header;
