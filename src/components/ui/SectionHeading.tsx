import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Types
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type GradientVariant = 'blue' | 'teal' | 'purple' | 'gradient' | 'none';

interface SectionHeadingProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  level?: HeadingLevel;
  size?: HeadingSize;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  gradient?: GradientVariant;
  glow?: boolean;
  animate?: boolean;
  id?: string;
  'aria-describedby'?: string;
}

// Style configuration
const HEADING_STYLES = {
  sizes: {
    sm: 'text-2xl md:text-3xl lg:text-4xl',
    md: 'text-3xl md:text-4xl lg:text-5xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
    xl: 'text-5xl md:text-6xl lg:text-7xl',
    '2xl': 'text-6xl md:text-7xl lg:text-8xl'
  },
  gradients: {
    blue: 'from-blue-400 via-blue-300 to-blue-200',
    teal: 'from-teal-400 via-cyan-300 to-blue-200',
    purple: 'from-purple-400 via-pink-300 to-blue-200',
    gradient: 'from-[#00B4DB] via-[#48D1CC] to-[#00BFFF]',
    none: ''
  }
} as const;

// Animation variants
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.2
      }
    }
  },
  title: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },
  subtitle: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
    }
  }
} as const;

/**
 * SectionHeading Component
 * A flexible heading component with customizable styling, animations, and accessibility features
 */
const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  level = 'h2',
  size = 'md',
  centered = false,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  gradient = 'blue',
  glow = true,
  animate = true,
  id,
  'aria-describedby': ariaDescribedBy,
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Memoize styles for performance
  const containerStyles = useMemo(() => {
    return `mb-12 ${centered ? 'text-center' : ''} ${className}`;
  }, [centered, className]);

  const titleStyles = useMemo(() => {
    const baseStyles = `${HEADING_STYLES.sizes[size]} font-bold mb-4`;
    const glowStyles = glow ? 'text-glow' : '';
    return `${baseStyles} ${glowStyles} ${titleClassName}`;
  }, [size, glow, titleClassName]);

  const subtitleStyles = useMemo(() => {
    const baseStyles = `text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl`;
    const centerStyles = centered ? 'mx-auto' : '';
    return `${baseStyles} ${centerStyles} ${subtitleClassName}`;
  }, [isDarkMode, centered, subtitleClassName]);

  // Render title content with gradient if needed
  const renderTitle = () => {
    if (typeof title === 'string' && gradient !== 'none') {
      return (
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${HEADING_STYLES.gradients[gradient]}`}>
          {title}
        </span>
      );
    }
    return title;
  };

  // Create the heading element dynamically
  const HeadingElement = level;

  if (animate) {
    return (
      <motion.div
        className={containerStyles}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={ANIMATION_VARIANTS.container}
      >
        <motion.div variants={ANIMATION_VARIANTS.title}>
          <HeadingElement
            id={id}
            className={titleStyles}
            aria-describedby={ariaDescribedBy}
          >
            {renderTitle()}
          </HeadingElement>
        </motion.div>

        {subtitle && (
          <motion.div variants={ANIMATION_VARIANTS.subtitle}>
            <p className={subtitleStyles}>
              {subtitle}
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className={containerStyles}>
      <HeadingElement
        id={id}
        className={titleStyles}
        aria-describedby={ariaDescribedBy}
      >
        {renderTitle()}
      </HeadingElement>

      {subtitle && (
        <p className={subtitleStyles}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
