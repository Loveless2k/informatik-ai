'use client';

import React, { forwardRef, useMemo } from 'react';
import Link from 'next/link';
import { motion, MotionProps } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'gradient';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type IconPosition = 'left' | 'right';

interface BaseButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  animate?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
  id?: string;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  href?: never;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  onClick?: never;
  type?: never;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

// Style configuration
const BUTTON_STYLES = {
  base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',

  variants: {
    primary: {
      light: 'bg-[#007D84] text-white hover:bg-[#006A70] focus:ring-[#00B4DB] active:bg-[#005A60]',
      dark: 'bg-[#00F0FF] text-black hover:bg-[#00D6E4] focus:ring-[#48F0FF] active:bg-[#00C4D1]'
    },
    secondary: {
      light: 'bg-[#00B4DB] text-white hover:bg-[#0099B8] focus:ring-[#48D1CC] active:bg-[#007D95]',
      dark: 'bg-[#00B4DB] text-white hover:bg-[#0099B8] focus:ring-[#48D1CC] active:bg-[#007D95]'
    },
    accent: {
      light: 'bg-black text-white hover:bg-gray-800 focus:ring-black active:bg-gray-900',
      dark: 'bg-white text-black hover:bg-gray-200 focus:ring-white active:bg-gray-300'
    },
    outline: {
      light: 'bg-transparent border-2 border-[#007D84] text-[#007D84] hover:bg-[#007D84]/10 focus:ring-[#007D84] active:bg-[#007D84]/20',
      dark: 'bg-transparent border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 focus:ring-[#00F0FF] active:bg-[#00F0FF]/20'
    },
    gradient: {
      light: 'bg-gradient-to-r from-[#007D84] to-[#00B4DB] text-white hover:from-[#006A70] hover:to-[#0099B8] focus:ring-[#007D84] active:from-[#005A60] active:to-[#007D95]',
      dark: 'bg-gradient-to-r from-[#00F0FF] to-[#48D1CC] text-black hover:from-[#00D6E4] hover:to-[#3ec0c0] focus:ring-[#00F0FF] active:from-[#00C4D1] active:to-[#35b3b3]'
    }
  },

  sizes: {
    sm: 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm',
    md: 'px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base',
    lg: 'px-4 sm:px-7 py-2.5 sm:py-3.5 text-base sm:text-lg font-semibold',
    xl: 'px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-bold'
  }
} as const;

// Animation variants
const ANIMATION_VARIANTS = {
  hover: {
    scale: 1.03,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 }
  },
} as const;

/**
 * Button Component
 * A versatile button component that can render as either a button or link
 * with comprehensive styling, animations, and accessibility features
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
  iconPosition = 'right',
  animate = true,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  id,
  ...props
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Memoize styles for performance
  const buttonStyles = useMemo(() => {
    const themeKey = isDarkMode ? 'dark' : 'light';
    const variantStyle = BUTTON_STYLES.variants[variant][themeKey];
    const sizeStyle = BUTTON_STYLES.sizes[size];

    return `${BUTTON_STYLES.base} ${variantStyle} ${sizeStyle} ${className}`;
  }, [variant, size, isDarkMode, className]);

  // Memoize content to prevent unnecessary re-renders
  const content = useMemo(() => (
    <>
      {icon && iconPosition === 'left' && (
        <span className='mr-2 flex-shrink-0' aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className='ml-2 flex-shrink-0' aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  ), [children, icon, iconPosition]);

  // Common props for accessibility
  const commonProps = {
    className: buttonStyles,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    id,
    ...(disabled && { 'aria-disabled': true }),
  };

  // Render as Link if href is provided
  if ('href' in props && props.href) {
    const linkProps = {
      ...commonProps,
      href: props.href,
      target: props.target,
      rel: props.rel || (props.target === '_blank' ? 'noopener noreferrer' : undefined),
    };

    if (animate && !disabled) {
      return (
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={ANIMATION_VARIANTS}
          className="inline-block"
        >
          <Link {...linkProps}>
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <Link {...linkProps}>
        {content}
      </Link>
    );
  }

  // Render as Button
  const buttonProps = {
    ...commonProps,
    type: (props as ButtonAsButtonProps).type || 'button',
    onClick: (props as ButtonAsButtonProps).onClick,
    disabled,
  };

  if (animate && !disabled) {
    return (
      <motion.button
        {...buttonProps}
        whileHover="hover"
        whileTap="tap"
        variants={ANIMATION_VARIANTS}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button {...buttonProps}>
      {content}
    </button>
  );
};

export default Button;
