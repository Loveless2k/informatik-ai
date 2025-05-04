'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Definir la estructura de los resultados de búsqueda
interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
}

// Datos de ejemplo para la búsqueda
const searchData: SearchResult[] = [
  {
    title: 'Formación In Company',
    description: 'Programas de formación personalizados en IA y tecnologías avanzadas para empresas.',
    url: '/services#formacion',
    category: 'Servicios'
  },
  {
    title: 'Asesoría Estratégica',
    description: 'Consultoría especializada para implementar soluciones de IA en tu negocio.',
    url: '/services#asesoria',
    category: 'Servicios'
  },
  {
    title: 'Desarrollo de Cursos',
    description: 'Creación de programas formativos a medida para tu equipo o clientes.',
    url: '/services#cursos',
    category: 'Servicios'
  },
  {
    title: 'Automatizaciones',
    description: 'Soluciones de automatización inteligente para optimizar procesos empresariales.',
    url: '/services#automatizaciones',
    category: 'Servicios'
  },
  {
    title: 'Desarrollo a Medida',
    description: 'Desarrollo de soluciones tecnológicas personalizadas con IA integrada.',
    url: '/services#desarrollo',
    category: 'Servicios'
  },
  {
    title: 'Caso de Éxito: CamiDevAI',
    description: 'Cómo ayudamos a CamiDevAI a crecer de 156 a más de 290,000 seguidores.',
    url: '/success-cases#camidevai',
    category: 'Casos de Éxito'
  },
  {
    title: 'Sobre Nosotros',
    description: 'Conoce más sobre Informatik-AI y nuestra misión.',
    url: '/about',
    category: 'Empresa'
  },
  {
    title: 'Contacto',
    description: 'Ponte en contacto con nuestro equipo para una consulta personalizada.',
    url: '/contact',
    category: 'Contacto'
  }
];

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Función para realizar la búsqueda
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ');

    const filteredResults = searchData.filter(item => {
      const titleMatch = searchTerms.some(term =>
        item.title.toLowerCase().includes(term)
      );

      const descriptionMatch = searchTerms.some(term =>
        item.description.toLowerCase().includes(term)
      );

      const categoryMatch = searchTerms.some(term =>
        item.category.toLowerCase().includes(term)
      );

      return titleMatch || descriptionMatch || categoryMatch;
    });

    setResults(filteredResults);
  };

  // Manejar cambios en el input de búsqueda
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  // Manejar la apertura del modal de búsqueda
  const openSearch = () => {
    setIsOpen(true);
    // Enfocar el input después de que se abra el modal
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Manejar el cierre del modal de búsqueda
  const closeSearch = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  // Manejar la navegación al seleccionar un resultado
  const handleResultClick = (url: string) => {
    router.push(url);
    closeSearch();
  };

  // Manejar clics fuera del componente de búsqueda para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        closeSearch();
      }
    };

    // Manejar la tecla Escape para cerrar la búsqueda
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    // Manejar el atajo de teclado Ctrl+K o Cmd+K para abrir la búsqueda
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (isOpen) {
          closeSearch();
        } else {
          openSearch();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Botón de búsqueda */}
      <button
        onClick={openSearch}
        className="flex items-center gap-0.5 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 whitespace-nowrap"
        aria-label="Buscar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 sm:h-3.5 sm:w-3.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden lg:inline text-xs font-medium">Buscar</span>
        <span className="hidden xl:inline text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 ml-0.5 px-1 py-0.5 rounded">⌘K</span>
      </button>

      {/* Modal de búsqueda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              ref={searchRef}
              className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Barra de búsqueda */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Buscar en Informatik-AI..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                  autoComplete="off"
                />
                <div className="text-xs text-gray-400 dark:text-gray-500 px-2 py-1 border border-gray-200 dark:border-gray-700 rounded">
                  Esc
                </div>
              </div>

              {/* Resultados de búsqueda */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() !== '' && (
                  <div className="p-2">
                    {results.length > 0 ? (
                      <div className="space-y-1">
                        {results.map((result, index) => (
                          <motion.div
                            key={result.url}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                            onClick={() => handleResultClick(result.url)}
                          >
                            <div className="flex items-start">
                              <div className="flex-1">
                                <h4 className="text-base font-medium text-gray-900 dark:text-white">
                                  {result.title}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                  {result.description}
                                </p>
                              </div>
                              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                                {result.category}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          No se encontraron resultados para "{query}"
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {query.trim() === '' && (
                  <div className="p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Búsquedas populares:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Formación', 'Automatización', 'Desarrollo', 'IA', 'Consultoría'].map(
                        (term) => (
                          <button
                            key={term}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => {
                              setQuery(term);
                              performSearch(term);
                            }}
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer con información */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                <span>Presiona Enter para seleccionar</span>
                <span>
                  <Link href="/sitemap" className="hover:text-primary dark:hover:text-primary-light" onClick={closeSearch}>
                    Ver mapa del sitio
                  </Link>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
