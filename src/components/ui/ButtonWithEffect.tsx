import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Tooltip from './Tooltip';

interface ButtonWithEffectProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  effectType?: 'ripple' | 'particles' | 'glow' | 'none';
  disabled?: boolean;
}

const ButtonWithEffect: React.FC<ButtonWithEffectProps> = ({
  href,
  onClick,
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  tooltip,
  effectType = 'ripple',
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [, setIsPressed] = useState(false);
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; color: string }>
  >([]);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const particleCount = 15;
  const particleTimeout = useRef<NodeJS.Timeout | null>(null);

  // Estilos base según variante
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] text-white hover:from-[#00a0c2] hover:to-[#3ec0c0] shadow-lg hover:shadow-[#00B4DB]/20';
      case 'secondary':
        return 'bg-white text-[#0f172a] border-0 hover:bg-opacity-90 shadow-md hover:shadow-lg';
      case 'outline':
        return 'bg-transparent border-2 border-[#00B4DB]/50 text-[#00B4DB] hover:bg-[#00B4DB]/10 dark:border-[#48D1CC]/50 dark:text-[#48D1CC] dark:hover:bg-[#48D1CC]/10';
      case 'ghost':
        return 'bg-transparent text-[#00B4DB] hover:bg-[#00B4DB]/10 dark:text-[#48D1CC] dark:hover:bg-[#48D1CC]/10';
      default:
        return 'bg-gradient-to-r from-[#00B4DB] to-[#48D1CC] text-white hover:from-[#00a0c2] hover:to-[#3ec0c0] shadow-lg hover:shadow-[#00B4DB]/20';
    }
  };

  // Estilos según tamaño
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  // Efecto de partículas
  const createParticles = (e: React.MouseEvent) => {
    if (effectType !== 'particles' || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x,
        y: y,
        size: Math.random() * 6 + 2,
        color:
          variant === 'primary'
            ? `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 180 + 180)}, ${Math.floor(Math.random() * 180 + 180)}, ${Math.random() * 0.5 + 0.5})`
            : `rgba(${Math.floor(Math.random() * 180 + 180)}, ${Math.floor(Math.random() * 180 + 180)}, ${Math.floor(Math.random() * 180 + 180)}, ${Math.random() * 0.5 + 0.5})`,
      });
    }

    setParticles(newParticles);

    if (particleTimeout.current) {
      clearTimeout(particleTimeout.current);
    }

    particleTimeout.current = setTimeout(() => {
      setParticles([]);
    }, 1000);
  };

  // Efecto de ripple
  const createRipple = (e: React.MouseEvent) => {
    if (effectType !== 'ripple' || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-effect');

    const ripple = button.getElementsByClassName('ripple-effect')[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  };

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (particleTimeout.current) {
        clearTimeout(particleTimeout.current);
      }
    };
  }, []);

  // Contenido del botón
  const buttonContent = (
    <>
      {/* Efecto de glow */}
      {effectType === 'glow' && isHovered && (
        <div className='absolute inset-0 rounded-full bg-[#00B4DB]/20 blur-md animate-pulse-slow'></div>
      )}

      {/* Partículas */}
      <AnimatePresence>
        {particles.map(particle => (
          <motion.span
            key={particle.id}
            className='absolute rounded-full pointer-events-none'
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y + (Math.random() - 0.5) * 100,
              opacity: 0,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Contenido del botón */}
      <span className='relative z-10'>{children}</span>
    </>
  );

  // Clases comunes
  const commonClasses = `relative overflow-hidden rounded-full font-medium transition-all duration-300 ${getVariantClasses()} ${getSizeClasses()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer neural-cursor-hover'}`;

  // Renderizar como Link o Button
  const ButtonComponent = href ? (
    <Link
      href={href}
      ref={buttonRef as React.RefObject<HTMLAnchorElement>}
      className={commonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={e => {
        setIsPressed(true);
        createParticles(e);
        createRipple(e);
      }}
      onMouseUp={() => setIsPressed(false)}
      {...(onClick && { onClick })}
      style={{ pointerEvents: disabled ? 'none' : 'auto' }}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={commonClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={e => {
        setIsPressed(true);
        createParticles(e);
        createRipple(e);
      }}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );

  // Envolver en tooltip si es necesario
  return tooltip ? (
    <Tooltip text={tooltip}>{ButtonComponent}</Tooltip>
  ) : (
    ButtonComponent
  );
};

export default ButtonWithEffect;
