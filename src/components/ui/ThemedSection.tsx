'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

type ThemedSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'gradient';
  withPattern?: boolean;
  withShapes?: boolean;
  animate?: boolean;
};

const ThemedSection = ({
  children,
  className = '',
  id,
  variant = 'primary',
  withPattern = false,
  withShapes = false,
  animate = true,
}: ThemedSectionProps) => {
  // Get theme context
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Variant styles based on theme
  const variantStyles = {
    primary: isDarkMode 
      ? 'bg-black text-white' 
      : 'bg-[#E0FBFF] text-[#111111]',
    secondary: isDarkMode 
      ? 'bg-[#111111] text-white' 
      : 'bg-white text-[#111111]',
    accent: isDarkMode 
      ? 'bg-[#00F0FF]/10 text-white' 
      : 'bg-[#007D84]/10 text-[#111111]',
    gradient: isDarkMode 
      ? 'bg-gradient-to-br from-black via-[#111111] to-black text-white' 
      : 'bg-gradient-to-br from-[#E0FBFF] via-white to-[#E0FBFF] text-[#111111]',
  };

  // Pattern styles
  const patternStyles = withPattern 
    ? isDarkMode 
      ? 'bg-grid-white/[0.03] bg-[length:30px_30px]' 
      : 'bg-grid-gray-200/[0.3] bg-[length:30px_30px]'
    : '';

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 overflow-hidden ${variantStyles[variant]} ${className}`}
    >
      {/* Background pattern */}
      {withPattern && (
        <div className={`absolute inset-0 ${patternStyles}`}></div>
      )}

      {/* Decorative shapes */}
      {withShapes && (
        <>
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full filter blur-3xl opacity-30 ${
            isDarkMode ? 'bg-[#00F0FF]' : 'bg-[#007D84]'
          }`}></div>
          <div className={`absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full filter blur-3xl opacity-20 ${
            isDarkMode ? 'bg-[#48D1CC]' : 'bg-[#00B4DB]'
          }`}></div>
        </>
      )}

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {animate ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            {React.Children.map(children, child => (
              <motion.div variants={childVariants}>
                {child}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default ThemedSection;
