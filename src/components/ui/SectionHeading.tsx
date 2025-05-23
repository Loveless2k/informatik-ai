import React from 'react';
import { useTheme } from '@/context/ThemeContext';

type SectionHeadingProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
  subtitleClassName?: string;
};

const SectionHeading = ({
  title,
  subtitle,
  centered = false,
  className = '',
  subtitleClassName = '',
}: SectionHeadingProps) => {
  // Get theme context
  let themeContext: { theme: string } = { theme: 'light' };
  try {
    themeContext = useTheme();
  } catch (error) {
    // Mantener el valor por defecto
  }
  const isDarkMode = themeContext.theme === 'dark';

  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-glow">
        {typeof title === 'string' ? (
          title
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
