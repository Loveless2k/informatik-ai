'use client';

import React from 'react';
import ThemeExample from '@/components/ui/ThemeExample';
import { useTheme } from '@/context/ThemeContext';

const ThemeExamplePage = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-[#E0FBFF]'} transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className={`text-5xl font-semibold text-center mb-8 ${isDarkMode ? 'text-[#00F0FF]' : 'text-[#007D84]'}`}>
          Ejemplo del Nuevo Sistema de Temas
        </h1>
        
        <p className="subtitle text-center max-w-3xl mx-auto mb-12">
          Esta página muestra el nuevo sistema de temas con la fuente Outfit y los colores personalizados para los modos claro y oscuro.
        </p>
        
        <ThemeExample />
        
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className={`text-3xl font-semibold text-center mb-6 ${isDarkMode ? 'text-[#00F0FF]' : 'text-[#007D84]'}`}>
            Características del Nuevo Sistema
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#111111]' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-[#00F0FF]' : 'text-[#007D84]'}`}>
                Modo Oscuro
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Fondo negro (#000000)</li>
                <li>Elementos primarios en calipso vibrante (#00F0FF)</li>
                <li>Texto en blanco puro</li>
                <li>Subtítulos en gris claro (#A0A0A0)</li>
              </ul>
            </div>
            
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-[#111111]' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-[#00F0FF]' : 'text-[#007D84]'}`}>
                Modo Claro
              </h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Fondo calipso muy claro (#E0FBFF)</li>
                <li>Texto principal casi negro (#111111)</li>
                <li>Subtítulos en gris oscuro (#444444)</li>
                <li>Elementos destacados en calipso medio (#007D84)</li>
              </ul>
            </div>
          </div>
          
          <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-[#111111]' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-[#00F0FF]' : 'text-[#007D84]'}`}>
              Tipografía
            </h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Fuente principal: Outfit de Google Fonts</li>
              <li>Títulos grandes y redondeados (text-4xl a text-5xl, font-semibold, centrados)</li>
              <li>Subtítulos un poco más pequeños, color secundario, con interlineado cómodo</li>
              <li>Transiciones suaves entre estados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeExamplePage;
