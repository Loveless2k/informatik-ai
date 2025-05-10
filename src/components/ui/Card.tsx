import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

type CardProps = {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  children?: React.ReactNode;
};

const Card = ({
  title,
  description,
  imageSrc,
  imageAlt = '',
  href,
  className = '',
  children,
}: CardProps) => {
  // Get theme context
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const cardContent = (
    <>
      {imageSrc && (
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-t-lg">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}
      {children}
      <div className="px-3 py-4 pt-0">
        <h3 className={`text-lg font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-[#111111]'
        }`}>{title}</h3>
        {description && <p className={`mb-3 text-xs leading-relaxed ${
          isDarkMode ? 'text-[#A0A0A0]' : 'text-[#444444]'
        }`}>{description}</p>}
      </div>
    </>
  );

  const cardClasses = `rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
    isDarkMode
      ? 'bg-[#111111] text-white'
      : 'bg-white text-[#111111]'
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {cardContent}
      </Link>
    );
  }

  return <div className={cardClasses}>{cardContent}</div>;
};

export default Card;
