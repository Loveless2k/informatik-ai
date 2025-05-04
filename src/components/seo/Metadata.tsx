import React from 'react';
import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  canonical,
  noIndex = false
}: SEOProps): Metadata {
  // Construir título completo
  const fullTitle = `${title} | Informatik-AI`;
  
  // URL base para rutas absolutas
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://informatik-ai.com';
  
  // URL canónica
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined;
  
  // URL de la imagen OG
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'Informatik-AI',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImageUrl],
      creator: '@InformatikAI',
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
