import type { Metadata } from 'next';
import React from 'react';
import BlogContent from '@/components/blog/BlogContent';

export const metadata: Metadata = {
  title: 'Blog | Informatik-AI',
  description:
    'Artículos, tutoriales y noticias sobre inteligencia artificial, machine learning y transformación digital.',
  keywords:
    'blog, inteligencia artificial, machine learning, tutoriales, noticias de IA',
  alternates: {
    languages: {
      'en-US': '/en/blog',
      'es-ES': '/blog',
    },
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
