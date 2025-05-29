import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  text,
  children,
  position = 'top',
  delay = 300,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Posicionamiento del tooltip
  const getPosition = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        };
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
    }
  };

  // Animación según la posición
  const getAnimation = () => {
    switch (position) {
      case 'top':
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        };
      case 'bottom':
        return {
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 10 },
          visible: { opacity: 1, x: 0 },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -10 },
          visible: { opacity: 1, x: 0 },
        };
      default:
        return {
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  // Flecha según la posición
  const getArrowStyle = () => {
    const baseStyle = {
      position: 'absolute',
      width: '0',
      height: '0',
      borderStyle: 'solid',
    } as React.CSSProperties;

    switch (position) {
      case 'top':
        return {
          ...baseStyle,
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '6px 6px 0 6px',
          borderColor: 'var(--tooltip-bg) transparent transparent transparent',
        };
      case 'bottom':
        return {
          ...baseStyle,
          top: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '0 6px 6px 6px',
          borderColor: 'transparent transparent var(--tooltip-bg) transparent',
        };
      case 'left':
        return {
          ...baseStyle,
          right: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '6px 0 6px 6px',
          borderColor: 'transparent transparent transparent var(--tooltip-bg)',
        };
      case 'right':
        return {
          ...baseStyle,
          left: '-6px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: '6px 6px 6px 0',
          borderColor: 'transparent var(--tooltip-bg) transparent transparent',
        };
      default:
        return {
          ...baseStyle,
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: '6px 6px 0 6px',
          borderColor: 'var(--tooltip-bg) transparent transparent transparent',
        };
    }
  };

  // Gestión de eventos de ratón
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsVisible(false), 100);
  };

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className='absolute z-50 pointer-events-none'
            style={getPosition()}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={getAnimation()}
            transition={{ duration: 0.2 }}
          >
            <div
              className='px-3 py-2 text-sm font-medium text-white rounded-md shadow-lg whitespace-nowrap'
              style={{
                backgroundColor: 'var(--tooltip-bg, rgba(15, 23, 42, 0.9))',
                backdropFilter: 'blur(4px)',
                maxWidth: '300px',
              }}
            >
              {text}
              <div style={getArrowStyle()} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
