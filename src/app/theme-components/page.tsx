'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import ThemedSection from '@/components/ui/ThemedSection';
import ThemedHeading from '@/components/ui/ThemedHeading';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';

const ThemeComponentsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-[#E0FBFF]'} transition-colors duration-300`}>
      {/* Hero Section */}
      <ThemedSection variant="primary" withPattern withShapes>
        <ThemedHeading
          title="Componentes del Nuevo Tema"
          subtitle="Explora todos los componentes disponibles con el nuevo sistema de temas"
          centered
          size="xl"
          variant="gradient"
        />
        
        <div className="flex justify-center mt-8">
          <Button 
            variant="gradient" 
            size="lg"
            onClick={toggleTheme}
          >
            Cambiar a tema {isDarkMode ? 'claro' : 'oscuro'}
          </Button>
        </div>
      </ThemedSection>

      {/* Buttons Section */}
      <ThemedSection variant="secondary">
        <ThemedHeading
          title="Botones"
          subtitle="Diferentes variantes de botones disponibles"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Variantes
            </h3>
            
            <div className="space-y-4">
              <Button variant="primary" className="w-full">Botón Primario</Button>
              <Button variant="secondary" className="w-full">Botón Secundario</Button>
              <Button variant="accent" className="w-full">Botón Acento</Button>
              <Button variant="outline" className="w-full">Botón Outline</Button>
              <Button variant="gradient" className="w-full">Botón Gradient</Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Tamaños
            </h3>
            
            <div className="space-y-4">
              <Button variant="primary" size="sm">Botón Pequeño</Button>
              <Button variant="primary" size="md">Botón Mediano</Button>
              <Button variant="primary" size="lg">Botón Grande</Button>
              <Button variant="primary" size="xl">Botón Extra Grande</Button>
            </div>
          </div>
        </div>
      </ThemedSection>

      {/* Cards Section */}
      <ThemedSection variant="accent">
        <ThemedHeading
          title="Tarjetas"
          subtitle="Diferentes estilos de tarjetas para mostrar contenido"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <Card
            title="Tarjeta Básica"
            description="Esta es una tarjeta básica con título y descripción."
          />
          
          <Card
            title="Tarjeta con Imagen"
            description="Esta tarjeta incluye una imagen en la parte superior."
            imageSrc="/images/logos/logoInformatik-ai.png"
            imageAlt="Logo Informatik-AI"
          />
          
          <Card
            title="Tarjeta con Enlace"
            description="Esta tarjeta funciona como un enlace clickeable."
            href="/theme-example"
          />
        </div>
      </ThemedSection>

      {/* Typography Section */}
      <ThemedSection variant="gradient">
        <ThemedHeading
          title="Tipografía"
          subtitle="Estilos de texto con la fuente Outfit"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Encabezados
            </h3>
            
            <div className="space-y-4">
              <ThemedHeading title="Encabezado XL" size="xl" animate={false} />
              <ThemedHeading title="Encabezado LG" size="lg" animate={false} />
              <ThemedHeading title="Encabezado MD" size="md" animate={false} />
              <ThemedHeading title="Encabezado SM" size="sm" animate={false} />
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Variantes de Encabezados
            </h3>
            
            <div className="space-y-4">
              <ThemedHeading title="Variante Primary" variant="primary" animate={false} />
              <ThemedHeading title="Variante Secondary" variant="secondary" animate={false} />
              <ThemedHeading title="Variante Gradient" variant="gradient" animate={false} />
              <ThemedHeading title="Variante White" variant="white" animate={false} />
            </div>
          </div>
        </div>
      </ThemedSection>

      {/* Sections Showcase */}
      <ThemedSection variant="primary">
        <ThemedHeading
          title="Secciones"
          subtitle="Diferentes variantes de secciones disponibles"
          centered
        />
        
        <div className="grid grid-cols-1 gap-8 mt-12">
          <div className="p-4 rounded-lg border border-dashed border-white/20">
            <p className={`text-center ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Sección Primary (Actual)
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#111111]' : 'bg-white'} border border-dashed border-white/20`}>
            <p className={`text-center ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Sección Secondary
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-[#00F0FF]/10' : 'bg-[#007D84]/10'} border border-dashed border-white/20`}>
            <p className={`text-center ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Sección Accent
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            isDarkMode 
              ? 'bg-gradient-to-br from-black via-[#111111] to-black' 
              : 'bg-gradient-to-br from-[#E0FBFF] via-white to-[#E0FBFF]'
          } border border-dashed border-white/20`}>
            <p className={`text-center ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
              Sección Gradient
            </p>
          </div>
        </div>
      </ThemedSection>

      {/* CTA Section */}
      <ThemedSection variant="secondary" withShapes>
        <div className="text-center">
          <ThemedHeading
            title={<>¿Listo para implementar <br className="hidden md:inline" />el nuevo tema?</>}
            subtitle="Explora todas las posibilidades con nuestro sistema de temas moderno"
            centered
            variant="gradient"
          />
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" href="/theme-example">
              Ver Ejemplo Completo
            </Button>
            
            <Button variant="outline" size="lg" onClick={toggleTheme}>
              Cambiar Tema
            </Button>
          </div>
        </div>
      </ThemedSection>
    </div>
  );
};

export default ThemeComponentsPage;
