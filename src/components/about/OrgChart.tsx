'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Definición de tipos para los datos del organigrama
interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  department?: string;
}

interface Leader extends TeamMember {
  team: TeamMember[];
}

// Datos del organigrama
const orgChartData: Leader[] = [
  {
    id: 'ceo1',
    name: 'Jorge Salgado Pons',
    position: 'Gerente General',
    image: '/images/nosotros/danielSalgado.jpg',
    department: 'Dirección General',
    team: [
      {
        id: 'team1-1',
        name: 'Camila Bañares',
        position: 'Chief Innovation Officer',
        image: '/images/nosotros/camidevai.jpg',
      },
      {
        id: 'team1-2',
        name: 'Gonzalo Figueroa',
        position: 'Chief Information Officer',
        image: '/images/nosotros/gonzalofigueroa.jpg',
      }
    ]
  },
  {
    id: 'cio1',
    name: 'Camila Bañares',
    position: 'Chief Innovation Officer',
    image: '/images/nosotros/camidevai.jpg',
    department: 'Investigación y Desarrollo',
    team: [
      {
        id: 'team2-1',
        name: 'José Osorio',
        position: 'Ingeniero de ML Senior',
        image: '/images/nosotros/fotoEquipo.jpg',
      },
      {
        id: 'team2-2',
        name: 'Carlos Vega',
        position: 'Científico de Datos',
        image: '/images/nosotros/fotoEquipo.jpg',
      },
      {
        id: 'team2-3',
        name: 'Laura Soto',
        position: 'Especialista en NLP',
        image: '/images/nosotros/fotoEquipo.jpg',
      }
    ]
  },
  {
    id: 'cio2',
    name: 'Gonzalo Figueroa',
    position: 'Chief Information Officer',
    image: '/images/nosotros/gonzalofigueroa.jpg',
    department: 'Tecnología e Infraestructura',
    team: [
      {
        id: 'team3-1',
        name: 'Javier Roa',
        position: 'Arquitecto de Soluciones',
        image: '/images/nosotros/fotoEquipo.jpg',
      },
      {
        id: 'team3-2',
        name: 'Daniela Rojas',
        position: 'DevOps Engineer',
        image: '/images/nosotros/fotoEquipo.jpg',
      },
      {
        id: 'team3-3',
        name: 'Javier Muñoz',
        position: 'Especialista en Seguridad',
        image: '/images/nosotros/fotoEquipo.jpg',
      }
    ]
  }
];

const OrgChart: React.FC = () => {
  // Estado para controlar qué equipos están expandidos
  const [expandedTeams, setExpandedTeams] = useState<string[]>([]);
  
  // Obtener el tema actual
  let themeContext;
  try {
    themeContext = useTheme();
  } catch (error) {
    themeContext = { theme: 'light' };
  }
  const isDarkMode = themeContext?.theme === 'dark';

  // Función para alternar la expansión de un equipo
  const toggleTeam = (leaderId: string) => {
    setExpandedTeams(prev => 
      prev.includes(leaderId) 
        ? prev.filter(id => id !== leaderId) 
        : [...prev, leaderId]
    );
  };

  // Verificar si un equipo está expandido
  const isExpanded = (leaderId: string) => expandedTeams.includes(leaderId);

  return (
    <div className="w-full">
      {/* Contenedor principal del organigrama */}
      <div className="flex flex-col items-center">
        {/* Título de la empresa */}
        <div className={`mb-12 p-6 rounded-xl shadow-lg ${
          isDarkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700 shadow-blue-900/20' 
            : 'bg-gradient-to-r from-white to-gray-50 shadow-blue-500/10'
        }`}>
          <h3 className="text-2xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#00B4DB] via-[#48D1CC] to-[#00BFFF] text-transparent bg-clip-text">
              Informatik-AI
            </span>
          </h3>
          <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Estructura Organizacional
          </p>
        </div>

        {/* Gerente General */}
        <div className="mb-8 w-full max-w-md">
          <motion.div 
            className={`relative w-full p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                : 'bg-white hover:bg-gray-50 border border-gray-100'
            }`}
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
            onClick={() => toggleTeam('ceo1')}
          >
            <div className="flex flex-col items-center">
              {/* Imagen del CEO */}
              <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-[#00B4DB]/30">
                <Image
                  src={orgChartData[0].image}
                  alt={orgChartData[0].name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Información del CEO */}
              <h4 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {orgChartData[0].name}
              </h4>
              <p className="text-[#00B4DB] dark:text-[#48D1CC] text-sm font-medium mb-2">
                {orgChartData[0].position}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {orgChartData[0].department}
              </p>
              
              {/* Indicador de expansión */}
              <div className="mt-4">
                <motion.div
                  animate={{ rotate: isExpanded('ceo1') ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
            
            {/* Decoración de fondo */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-[#00B4DB]/5 to-[#48D1CC]/5 rounded-full opacity-70"></div>
          </motion.div>
        </div>

        {/* Línea vertical conectora */}
        <div className={`w-1 h-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

        {/* Contenedor de los CIOs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {orgChartData.slice(1, 3).map((leader) => (
            <div key={leader.id} className="flex flex-col items-center">
              {/* Tarjeta del CIO */}
              <motion.div 
                className={`relative w-full p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                    : 'bg-white hover:bg-gray-50 border border-gray-100'
                }`}
                whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
                onClick={() => toggleTeam(leader.id)}
              >
                <div className="flex flex-col items-center">
                  {/* Imagen del CIO */}
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-[#00B4DB]/30">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  {/* Información del CIO */}
                  <h4 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {leader.name}
                  </h4>
                  <p className="text-[#00B4DB] dark:text-[#48D1CC] text-sm font-medium mb-2">
                    {leader.position}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {leader.department}
                  </p>
                  
                  {/* Indicador de expansión */}
                  <div className="mt-4">
                    <motion.div
                      animate={{ rotate: isExpanded(leader.id) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 9l-7 7-7-7" 
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decoración de fondo */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-[#00B4DB]/5 to-[#48D1CC]/5 rounded-full opacity-70"></div>
              </motion.div>

              {/* Línea vertical conectora */}
              {isExpanded(leader.id) && (
                <div className={`w-1 h-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              )}

              {/* Equipo del CIO */}
              <AnimatePresence>
                {isExpanded(leader.id) && (
                  <motion.div 
                    className="grid grid-cols-1 gap-4 w-full mt-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {leader.team.map((member) => (
                      <motion.div 
                        key={member.id}
                        className={`flex items-center p-4 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-800/80 border border-gray-700' 
                            : 'bg-white/90 border border-gray-100'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        {/* Imagen del miembro del equipo */}
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-[#00B4DB]/20">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        
                        {/* Información del miembro del equipo */}
                        <div>
                          <h5 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {member.name}
                          </h5>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {member.position}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;


