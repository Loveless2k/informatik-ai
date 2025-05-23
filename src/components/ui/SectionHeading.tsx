import React from 'react';
import { useTheme } from '@/context/ThemeContext';

type SectionHeadingProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
  subtitleClassName?: string;
  noGlow?: boolean; // Opción para desactivar el efecto de resplandor
};

const SectionHeading = ({
  title,
  subtitle,
  centered = false,
  className = '',
  subtitleClassName = '',
  noGlow = false, // Por defecto, todos los títulos tendrán el efecto de resplandor
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
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${noGlow ? '' : 'text-glow'}`}>
        {typeof title === 'string' ? (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">
            {title}
          </span>
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
