'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/3 rounded-full filter blur-[120px] bg-[#00B4DB]/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-[150px] bg-[#48D1CC]/15"></div>
        <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:30px_30px]"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-extrabold text-white mb-4">404</h1>
          
          <div className="h-2 w-40 bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] mx-auto mb-8 rounded-full"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Página no encontrada
          </h2>
          
          <p className="text-xl text-gray-300 mb-10">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/"
              size="lg"
              className="bg-gradient-to-r from-[#0ea5e9] to-[#14b8a6] border-0 px-8 py-4 text-xl font-bold"
            >
              Volver al Inicio
            </Button>
            
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="bg-white text-[#0f172a] border-0 px-8 py-4 text-xl font-bold"
            >
              Contactar Soporte
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-[#00B4DB]/30 rounded-full animate-pulse"
           style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-20 right-10 w-32 h-32 border border-[#48D1CC]/20 rounded-full animate-pulse"
           style={{ animationDuration: '12s' }}></div>
    </div>
  );
}
