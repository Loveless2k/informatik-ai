'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // No renderizar nada durante SSR
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Elemento flotante izquierdo */}
      <div className="absolute -bottom-16 left-10 w-40 h-40 opacity-30 animate-float hidden md:block">
        <motion.div 
          className="relative w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full opacity-60"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-9 h-9 bg-white rounded-full opacity-50"></div>
        </motion.div>
      </div>

      {/* Elemento flotante derecho */}
      <div className="absolute -bottom-10 right-10 w-32 h-32 opacity-30 animate-float-delay hidden md:block">
        <motion.div 
          className="relative w-full h-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-10 h-10 bg-white rounded-full opacity-80"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-9 h-9 bg-white rounded-full opacity-50"></div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full opacity-70"></div>
        </motion.div>
      </div>
    </>
  );
};

export default FloatingElements;
