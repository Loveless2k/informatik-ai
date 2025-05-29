import React from 'react';
import { useTheme } from '@/context/ThemeContext';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark';
};

const Section = ({
  children,
  className = '',
  id,
  background = 'white',
}: SectionProps) => {
  // Get theme context
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Background styles based on theme
  const backgroundStyles = {
    white: isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]',
    light: isDarkMode ? 'bg-black text-white' : 'bg-[#E0FBFF] text-[#111111]',
    dark: isDarkMode ? 'bg-black text-white' : 'bg-[#007D84] text-white',
  };

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${backgroundStyles[background]} ${className}`}
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
    </section>
  );
};

export default Section;
