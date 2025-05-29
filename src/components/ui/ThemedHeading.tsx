'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

type ThemedHeadingProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'gradient' | 'white';
  animate?: boolean;
};

const ThemedHeading = ({
  title,
  subtitle,
  centered = false,
  className = '',
  size = 'lg',
  variant = 'primary',
  animate = true,
}: ThemedHeadingProps) => {
  // Get theme context
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Size styles for title
  const titleSizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
  };

  // Variant styles based on theme
  const variantStyles = {
    primary: isDarkMode ? 'text-white text-glow' : 'text-white text-glow',
    secondary: isDarkMode ? 'text-white text-glow' : 'text-white text-glow',
    gradient:
      'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 text-glow',
    white: 'text-white text-glow',
  };

  // Subtitle styles
  const subtitleStyles = isDarkMode ? 'text-[#A0A0A0]' : 'text-[#444444]';

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  };

  // Alignment styles
  const alignmentStyles = centered ? 'text-center mx-auto' : 'text-left';

  // Render with or without animation
  if (animate) {
    return (
      <div className={`mb-8 ${alignmentStyles} ${className}`}>
        <motion.h2
          className={`font-semibold mb-4 ${titleSizes[size]} ${variantStyles[variant]}`}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-100px' }}
          variants={headingVariants}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.div
            className={`${subtitleStyles} ${centered ? 'max-w-3xl mx-auto' : ''}`}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={subtitleVariants}
          >
            {typeof subtitle === 'string' ? (
              <p className='text-lg md:text-xl leading-relaxed'>{subtitle}</p>
            ) : (
              subtitle
            )}
          </motion.div>
        )}
      </div>
    );
  }

  // Non-animated version
  return (
    <div className={`mb-8 ${alignmentStyles} ${className}`}>
      <h2
        className={`font-semibold mb-4 ${titleSizes[size]} ${variantStyles[variant]}`}
      >
        {title}
      </h2>

      {subtitle && (
        <div
          className={`${subtitleStyles} ${centered ? 'max-w-3xl mx-auto' : ''}`}
        >
          {typeof subtitle === 'string' ? (
            <p className='text-lg md:text-xl leading-relaxed'>{subtitle}</p>
          ) : (
            subtitle
          )}
        </div>
      )}
    </div>
  );
};

export default ThemedHeading;
