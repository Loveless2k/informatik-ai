'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  animate?: boolean;
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  icon,
  iconPosition = 'right',
  animate = true,
}: ButtonProps) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md';

  // Get theme context
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Variant styles based on theme
  const variantStyles = {
    primary: isDarkMode
      ? 'bg-[#00F0FF] text-black hover:bg-[#00D6E4] focus:ring-[#48F0FF]'
      : 'bg-[#007D84] text-white hover:bg-[#006A70] focus:ring-[#00B4DB]',
    secondary: isDarkMode
      ? 'bg-[#00B4DB] text-white hover:bg-[#0099B8] focus:ring-[#48D1CC]'
      : 'bg-[#00B4DB] text-white hover:bg-[#0099B8] focus:ring-[#48D1CC]',
    accent: isDarkMode
      ? 'bg-white text-black hover:bg-gray-200 focus:ring-white'
      : 'bg-black text-white hover:bg-gray-800 focus:ring-black',
    outline: isDarkMode
      ? 'bg-transparent border-2 border-[#00F0FF] text-[#00F0FF] hover:bg-[#00F0FF]/10 focus:ring-[#00F0FF]'
      : 'bg-transparent border-2 border-[#007D84] text-[#007D84] hover:bg-[#007D84]/10 focus:ring-[#007D84]',
    gradient: isDarkMode
      ? 'bg-gradient-to-r from-[#00F0FF] to-[#48D1CC] text-black hover:from-[#00D6E4] hover:to-[#3ec0c0] focus:ring-[#00F0FF]'
      : 'bg-gradient-to-r from-[#007D84] to-[#00B4DB] text-white hover:from-[#006A70] hover:to-[#0099B8] focus:ring-[#007D84]',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm',
    md: 'px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base',
    lg: 'px-4 sm:px-7 py-2.5 sm:py-3.5 text-base sm:text-lg font-semibold',
    xl: 'px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-bold',
  };

  // Disabled styles
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  // Content with icon
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );

  // Animation variants
  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.97
    }
  };

  // If href is provided, render as Link
  if (href) {
    return animate ? (
      <motion.div
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
      >
        <Link href={href} className={buttonStyles}>
          {content}
        </Link>
      </motion.div>
    ) : (
      <Link href={href} className={buttonStyles}>
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return animate ? (
    <motion.button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {content}
    </motion.button>
  ) : (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
