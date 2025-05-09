'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary-light',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary-light',
    accent: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary',
    gradient: 'bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] text-white hover:from-[#00a0c2] hover:to-[#3ec0c0] focus:ring-[#00B4DB]',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg font-semibold',
    xl: 'px-10 py-4 text-xl font-bold',
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
