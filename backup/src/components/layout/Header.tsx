'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white shadow-md py-4'
        : 'bg-white/90 backdrop-blur-md py-6'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center">
              {/* Logo moderno perfecto */}
              <Image
                src="/images/informatik-ai-logo-modern-perfect.svg"
                alt="Informatik-AI Logo"
                width={300}
                height={100}
                className="h-20 w-auto transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-teal-500 font-medium transition-colors relative group">
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-500 font-medium transition-colors relative group">
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-teal-500 font-medium transition-colors relative group">
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/success-cases" className="text-gray-700 hover:text-teal-500 font-medium transition-colors relative group">
              Casos de Éxito
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-teal-500 font-medium transition-colors relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-teal-500 font-medium transition-colors relative group">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Contáctanos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-teal-500 font-medium transition-colors">
                Inicio
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-teal-500 font-medium transition-colors">
                Nosotros
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-teal-500 font-medium transition-colors">
                Servicios
              </Link>
              <Link href="/success-cases" className="text-gray-700 hover:text-teal-500 font-medium transition-colors">
                Casos de Éxito
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-teal-500 font-medium transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-teal-500 font-medium transition-colors">
                Contacto
              </Link>
              <Link
                href="/contact"
                className="bg-gradient-to-r from-teal-500 to-teal-400 text-white px-4 py-2 rounded-lg shadow-md transition-colors inline-block w-fit"
              >
                Contáctanos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
