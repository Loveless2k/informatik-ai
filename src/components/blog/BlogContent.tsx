'use client';

import React, { useEffect, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import { motion } from 'framer-motion';

// Clave para almacenar los datos en localStorage
const CACHE_KEY = 'gnews_cache';
const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1 hora en milisegundos

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

// Función para guardar datos en caché
const saveToCache = (data: NewsResponse) => {
  if (typeof window !== 'undefined') {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error al guardar en caché:', error);
    }
  }
};

// Función para obtener datos de la caché
const getFromCache = (): { data: NewsResponse | null; isExpired: boolean } => {
  if (typeof window !== 'undefined') {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);

      if (!cachedData) {
        return { data: null, isExpired: true };
      }

      const { data, timestamp } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY_TIME;

      return { data, isExpired };
    } catch (error) {
      console.error('Error al recuperar de caché:', error);
    }
  }

  return { data: null, isExpired: true };
};

export default function BlogContent() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingCache, setUsingCache] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setUsingCache(false);

        // Intentar obtener datos de la caché primero
        const { data: cachedData, isExpired } = getFromCache();

        // Si tenemos datos en caché y no están expirados, usarlos
        if (
          cachedData &&
          !isExpired &&
          Array.isArray(cachedData.articles) &&
          cachedData.articles.length > 0
        ) {
          console.log('Usando datos de caché:', cachedData);
          setNews(cachedData.articles);
          setLoading(false);
          return;
        }

        const apiKey = process.env.NEXT_PUBLIC_GNEWS_API_KEY;

        if (!apiKey) {
          setError('Error de configuración: Clave API no disponible');
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://gnews.io/api/v4/search?q=inteligencia+artificial&lang=es&max=6&token=${apiKey}`
        );

        if (!res.ok) {
          // Manejar específicamente el error 429 (Too Many Requests)
          if (res.status === 429) {
            console.error('Error 429: Límite de solicitudes a la API excedido');

            // Si tenemos datos en caché (aunque estén expirados), usarlos como fallback
            if (
              cachedData &&
              Array.isArray(cachedData.articles) &&
              cachedData.articles.length > 0
            ) {
              console.log(
                'Usando datos de caché expirados como fallback:',
                cachedData
              );
              setNews(cachedData.articles);
              setUsingCache(true);
              setError(
                'Se ha excedido el límite de solicitudes a la API. Mostrando datos almacenados anteriormente.'
              );
            } else {
              setError(
                'Se ha excedido el límite de solicitudes a la API. Por favor, intenta más tarde.'
              );
            }
          } else {
            console.error(`Error de API: ${res.status} ${res.statusText}`);
            setError(
              `Error al cargar las noticias (${res.status}). Por favor, intenta más tarde.`
            );
          }
          setLoading(false);
          return;
        }

        const data: NewsResponse = await res.json();
        console.log('Datos recibidos de la API:', data);

        if (Array.isArray(data.articles) && data.articles.length > 0) {
          // Guardar los datos en caché para uso futuro
          saveToCache(data);
          setNews(data.articles);
        } else {
          console.warn('No se encontraron artículos en la respuesta:', data);
          setError('No se encontraron noticias disponibles en este momento.');
        }
      } catch (error) {
        console.error('Error fetching news:', error);

        // Intentar usar caché como último recurso en caso de error
        const { data: cachedData } = getFromCache();
        if (
          cachedData &&
          Array.isArray(cachedData.articles) &&
          cachedData.articles.length > 0
        ) {
          console.log(
            'Error en la solicitud, usando datos de caché como fallback:',
            cachedData
          );
          setNews(cachedData.articles);
          setUsingCache(true);
          setError(
            'Error al conectar con el servicio de noticias. Mostrando datos almacenados anteriormente.'
          );
        } else {
          setError(
            'No se pudieron cargar las noticias. Por favor, intenta más tarde.'
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className='py-20 bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <SectionHeading
          title='Noticias de Inteligencia Artificial'
          subtitle={
            <>
              <span className='text-gray-600 dark:text-gray-300'>
                Últimas noticias del mundo de la IA actualizadas automáticamente
              </span>
              {usingCache && (
                <span className='mt-2 text-amber-600 dark:text-amber-400 text-sm flex items-center justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-4 w-4 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                  <span>Mostrando datos almacenados en caché</span>
                </span>
              )}
            </>
          }
          centered
          className='mb-12'
        />

        {error && (
          <div className="">
            
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {loading ? (
            <p className='text-center col-span-full text-gray-500 dark:text-gray-400'>
              Cargando noticias...
            </p>
          ) : news.length > 0 ? (
            news.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target='_blank'
                rel='noopener noreferrer'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group flex flex-col h-full'
              >
                {article.image && (
                  <div className='mb-4 overflow-hidden rounded-lg'>
                    <img
                      src={article.image}
                      alt={article.title}
                      className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                )}
                <div className='flex-1'>
                  <div className='text-xs text-gray-500 dark:text-gray-400 mb-2'>
                    {article.source.name} •{' '}
                    {new Date(article.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white group-hover:text-[#00B4DB] mb-2'>
                    {article.title}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3'>
                    {article.description}
                  </p>
                </div>
                <div className='mt-auto pt-3 text-[#00B4DB] font-medium text-sm'>
                  Leer más →
                </div>
              </motion.a>
            ))
          ) : (
            <p className='text-center col-span-full text-gray-500 dark:text-gray-400'>
              No se encontraron noticias.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
