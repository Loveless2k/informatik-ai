import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
      <div className="p-6 pt-0">
        <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
        {description && <p className="text-slate-700 mb-4">{description}</p>}
      </div>
    </>
  );

  const cardClasses = `bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg ${className}`;

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
