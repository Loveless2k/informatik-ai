'use client';

import React, { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';

interface NewsSource {
  name: string;
  url: string;
}

interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: NewsSource;
}

interface NewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
}

export default function BlogContent() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;

        if (!apiKey) {
          setError('Error de configuración: Clave API no disponible');
          setLoading(false);
          return;
        }

        const res = await fetch(`https://gnews.io/api/v4/search?q=inteligencia+artificial&lang=es&max=6&token=${apiKey}`);

        if (!res.ok) {
          throw new Error(`Error de API: ${res.status} ${res.statusText}`);
        }

        const data: NewsResponse = await res.json();

        if (Array.isArray(data.articles) && data.articles.length > 0) {
          setNews(data.articles);
        } else {
          setError('No se encontraron noticias.');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('No se pudieron cargar las noticias. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] font-bold">
              Noticias de Inteligencia Artificial
            </span>
          }
          subtitle={
            <span className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Últimas noticias del mundo de la IA actualizadas automáticamente
            </span>
          }
          centered
          className="mb-12"
        />

        {error && (
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              Cargando noticias...
            </p>
          ) : news.length > 0 ? (
            news.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group flex flex-col h-full"
              >
                {article.image && (
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {article.source.name} •{' '}
                    {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#00B4DB] mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                    {article.description}
                  </p>
                </div>
                <div className="mt-auto pt-3 text-[#00B4DB] font-medium text-sm">
                  Leer más →
                </div>
              </motion.a>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
              No se encontraron noticias.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
