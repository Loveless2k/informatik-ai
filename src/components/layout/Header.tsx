'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '@/components/ui/MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import DataStreamButton from '@/components/ui/buttons/DataStreamButton';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Usar el contexto de tema de manera segura
  let themeContext: { theme: string } = { theme: 'light' };
  try {
    themeContext = useTheme();
  } catch (error) {
    // Si el contexto no está disponible, asumimos tema claro por defecto
    // Ya tenemos el valor por defecto asignado
  }

  const isDarkMode = themeContext.theme === 'dark';

  // Handle scroll effect for transparent to solid header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Lista de enlaces de navegación
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/about', label: 'Nosotros' },
    { href: '/services', label: 'Servicios' },
    { href: '/success-cases', label: 'Casos de Éxito' },
    { href: '/blog', label: 'Blog' },
    { href: '/resources', label: 'Recursos' },
    { href: '/chatbot', label: 'Chatbot' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <div className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled
        ? isDarkMode
          ? 'bg-black shadow-lg shadow-[#00F0FF]/10 py-2.5 sm:py-3 md:py-4'
          : 'bg-[#E0FBFF] shadow-lg shadow-[#007D84]/10 py-2.5 sm:py-3 md:py-4'
        : isDarkMode
          ? 'bg-black/80 backdrop-blur-xl py-3 sm:py-4 md:py-5'
          : 'bg-[#E0FBFF]/80 backdrop-blur-xl py-3 sm:py-4 md:py-5'
    }`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 sm:h-14 md:h-17 w-[180px] sm:w-[220px] md:w-[280px]">
                <Image
                  src="/images/logos/logoInformatik-ai.png"
                  alt="Informatik-AI Logo (Light Mode)"
                  width={280}
                  height={70}
                  className={`absolute top-0 left-0 h-full w-auto transition-opacity ${
                    isDarkMode ? 'opacity-0' : 'opacity-100'
                  }`}
                  priority
                />
                <Image
                  src="/images/logos/logoInformatik-ai2.png"
                  alt="Informatik-AI Logo (Dark Mode)"
                  width={280}
                  height={70}
                  className={`absolute top-0 left-0 h-full w-auto transition-opacity ${
                    isDarkMode ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  isDarkMode
                    ? 'text-white hover:text-[#00F0FF]'
                    : 'text-[#111111] hover:text-[#007D84]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side elements */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <DataStreamButton href="/contact" className="w-auto">
                Contáctanos
              </DataStreamButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden focus:outline-none p-2 rounded-lg ${
                isDarkMode
                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                  : 'text-[#111111] bg-white/80 hover:bg-white shadow-sm'
              } transition-colors`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={navLinks}
      />
    </div>
  );
};

export default Header;
