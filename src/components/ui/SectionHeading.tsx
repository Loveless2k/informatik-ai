import React from 'react';

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
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">{title}</h2>
      {subtitle && (
        <p className={`text-xl text-slate-700 max-w-3xl mx-auto ${subtitleClassName}`}>{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
