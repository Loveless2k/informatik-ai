'use client';

import React, { useEffect, useRef, useState } from 'react';

// Definición de tipos para nodos y conexiones
type Node = {
  id: number;
  x: number;
  y: number;
  radius: number;
  pulseState: number;
  pulseSpeed: number;
  layer: number;
};

type Connection = {
  fromId: number;
  toId: number;
  active: boolean;
  progress: number;
  speed: number;
  lifetime: number;
  currentLife: number;
};

const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar modo oscuro usando matchMedia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar si el documento tiene la clase 'dark'
      setIsDarkMode(document.documentElement.classList.contains('dark'));

      // Observar cambios en la clase 'dark' del documento
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // Estado para nodos y conexiones
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  // Configuración adaptativa según el dispositivo
  const getConfig = () => {
    // Detectar si estamos en un dispositivo móvil
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isLowPower = typeof window !== 'undefined' &&
      (window.navigator.userAgent.includes('Mobile') ||
       window.navigator.userAgent.includes('Android'));

    return {
      // Reducir la complejidad en dispositivos móviles
      nodeCount: isMobile ? 30 : 50,
      layerCount: isMobile ? 4 : 5,
      connectionProbability: isMobile ? 0.2 : 0.25,
      maxConnections: isMobile ? 60 : 100,
      pulseFrequency: isMobile ? 0.01 : 0.015,
      signalSpeed: isMobile ? 0.01 : 0.008,
      nodeMinRadius: isMobile ? 1 : 1.5,
      nodeMaxRadius: isMobile ? 2.5 : 3.5,
      // Optimizaciones para dispositivos de baja potencia
      optimizeForLowPower: isLowPower,
    };
  };

  // Obtener configuración adaptativa
  const config = getConfig();

  // Colores según el tema - Paleta más sofisticada
  const getColors = () => {
    if (isDarkMode) {
      return {
        // Modo oscuro - Tonos más profundos y elegantes
        node: 'rgba(45, 85, 155, 0.6)', // Azul más oscuro y menos saturado
        nodePulse: 'rgba(100, 155, 255, 0.8)', // Destello azul más intenso
        connection: 'rgba(30, 58, 138, 0.15)', // Conexiones más sutiles
        activeConnection: 'rgba(100, 155, 255, 0.7)', // Conexiones activas más visibles
        // Añadir un segundo color para variedad
        secondaryNode: 'rgba(30, 64, 175, 0.5)', // Azul oscuro alternativo
        secondaryActive: 'rgba(80, 140, 240, 0.7)', // Azul brillante alternativo
      };
    } else {
      return {
        // Modo claro - Tonos más profundos y profesionales
        node: 'rgba(17, 24, 39, 0.5)', // Casi negro con transparencia
        nodePulse: 'rgba(37, 99, 235, 0.7)', // Azul brillante
        connection: 'rgba(17, 24, 39, 0.1)', // Conexiones sutiles
        activeConnection: 'rgba(37, 99, 235, 0.6)', // Conexiones activas visibles
        // Añadir un segundo color para variedad
        secondaryNode: 'rgba(30, 58, 138, 0.4)', // Azul oscuro
        secondaryActive: 'rgba(59, 130, 246, 0.6)', // Azul medio
      };
    }
  };

  // Inicializar la red neural
  const initializeNetwork = (width: number, height: number) => {
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    // Crear nodos en capas con distribución mejorada
    for (let layer = 0; layer < config.layerCount; layer++) {
      // Distribución no lineal de nodos por capa para un aspecto más orgánico
      const nodesInLayer = Math.floor(config.nodeCount / config.layerCount) +
                          (layer === 0 ? 3 : layer === config.layerCount - 1 ? 3 :
                           layer === Math.floor(config.layerCount / 2) ? 2 : 0);

      for (let i = 0; i < nodesInLayer; i++) {
        // Distribución horizontal no lineal para un aspecto más natural
        const layerWidth = width * 0.85;
        const layerMargin = width * 0.075;

        // Curva suave para la distribución de capas
        const layerPosition = layer / (config.layerCount - 1);
        const x = layerMargin + Math.pow(layerPosition, 0.9) * layerWidth;

        // Distribución vertical con variación controlada
        const segmentHeight = height / (nodesInLayer + 1);
        const baseY = segmentHeight * (i + 1);
        const variance = segmentHeight * 0.25; // Menos variación para más orden
        const y = baseY + (Math.random() * variance * 2 - variance);

        nodes.push({
          id: nodes.length,
          x,
          y,
          radius: config.nodeMinRadius + Math.random() * (config.nodeMaxRadius - config.nodeMinRadius),
          pulseState: Math.random(),
          pulseSpeed: 0.003 + Math.random() * 0.007, // Velocidades más lentas y variadas
          layer
        });
      }
    }

    // Crear conexiones entre capas adyacentes con patrón mejorado
    for (let layer = 0; layer < config.layerCount - 1; layer++) {
      const fromNodes = nodes.filter(node => node.layer === layer);
      const toNodes = nodes.filter(node => node.layer === layer + 1);

      fromNodes.forEach(fromNode => {
        // Conexiones más estructuradas - cada nodo se conecta a 2-3 nodos de la siguiente capa
        const targetCount = 2 + Math.floor(Math.random() * 2); // 2-3 conexiones por nodo
        const shuffledTargets = [...toNodes].sort(() => Math.random() - 0.5);

        for (let i = 0; i < Math.min(targetCount, shuffledTargets.length); i++) {
          if (connections.length < config.maxConnections) {
            connections.push({
              fromId: fromNode.id,
              toId: shuffledTargets[i].id,
              active: false,
              progress: 0,
              speed: 0.003 + Math.random() * 0.006, // Velocidades más lentas para mayor elegancia
              lifetime: 70 + Math.random() * 130, // Duración más larga
              currentLife: 0
            });
          }
        }
      });
    }

    nodesRef.current = nodes;
    connectionsRef.current = connections;
  };

  // Actualizar la animación
  const updateAnimation = () => {
    const nodes = nodesRef.current;
    const connections = connectionsRef.current;

    // Actualizar estado de pulso de los nodos
    nodes.forEach(node => {
      node.pulseState = (node.pulseState + node.pulseSpeed) % 1;
    });

    // Activar nuevas conexiones aleatoriamente con patrón mejorado
    if (Math.random() < config.pulseFrequency) {
      // Seleccionar nodos de entrada (primera capa) aleatoriamente
      const inputNodes = nodes.filter(node => node.layer === 0);
      const randomInputNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];

      // Activar conexiones desde este nodo
      connections
        .filter(conn => conn.fromId === randomInputNode.id && !conn.active)
        .forEach(conn => {
          conn.active = true;
          conn.progress = 0;
          conn.currentLife = 0;
        });
    }

    // Actualizar conexiones activas
    connections.forEach(conn => {
      if (conn.active) {
        conn.progress += conn.speed;
        conn.currentLife += 1;

        // Si la conexión llega al final, activar el nodo destino y posibles conexiones siguientes
        if (conn.progress >= 1) {
          conn.progress = 0;
          conn.active = false;

          // Activar el nodo destino
          const toNode = nodes.find(node => node.id === conn.toId);
          if (toNode) {
            toNode.pulseState = 0; // Reiniciar el pulso

            // Activar conexiones salientes desde el nodo destino
            if (toNode.layer < config.layerCount - 1) {
              // Limitar la cantidad de conexiones activadas para evitar sobrecarga visual
              const outgoingConnections = connections
                .filter(nextConn => nextConn.fromId === toNode.id && !nextConn.active);

              // Seleccionar solo 1-2 conexiones para activar
              const connectionsToActivate = outgoingConnections
                .sort(() => Math.random() - 0.5)
                .slice(0, 1 + Math.floor(Math.random() * 2));

              connectionsToActivate.forEach(nextConn => {
                nextConn.active = true;
                nextConn.progress = 0;
                nextConn.currentLife = 0;
              });
            }
          }
        }

        // Desactivar conexiones que han superado su tiempo de vida
        if (conn.currentLife > conn.lifetime) {
          conn.active = false;
        }
      }
    });
  };

  // Dibujar la red neural con estilo mejorado
  const drawNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes = nodesRef.current;
    const connections = connectionsRef.current;
    const colors = getColors();

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar conexiones con estilo mejorado
    connections.forEach(conn => {
      const fromNode = nodes.find(node => node.id === conn.fromId);
      const toNode = nodes.find(node => node.id === conn.toId);

      if (fromNode && toNode) {
        ctx.beginPath();

        // Líneas más finas para conexiones inactivas
        ctx.lineWidth = conn.active ? 1 : 0.5;

        ctx.moveTo(fromNode.x, fromNode.y);

        // Conexiones ligeramente curvas para un aspecto más orgánico
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2 + (Math.random() * 10 - 5);

        // Usar curvas cuadráticas para conexiones más elegantes
        ctx.quadraticCurveTo(midX, midY, toNode.x, toNode.y);

        if (conn.active) {
          // Dibujar conexión activa con gradiente mejorado
          const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
          gradient.addColorStop(0, colors.connection);
          gradient.addColorStop(conn.progress, colors.activeConnection);
          gradient.addColorStop(Math.min(conn.progress + 0.05, 1), colors.connection);
          gradient.addColorStop(1, colors.connection);
          ctx.strokeStyle = gradient;
        } else {
          ctx.strokeStyle = colors.connection;
        }

        ctx.stroke();
      }
    });

    // Dibujar nodos con estilo mejorado
    nodes.forEach(node => {
      // Añadir un sutil efecto de glow para nodos activos
      if (node.pulseState < 0.2) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = node.layer % 2 === 0
          ? `rgba(37, 99, 235, ${0.1 * (1 - node.pulseState * 5)})`  // Azul
          : `rgba(14, 165, 233, ${0.1 * (1 - node.pulseState * 5)})`; // Azul claro
        ctx.fill();
      }

      // Dibujar el nodo principal
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

      // Alternar colores entre capas para crear más profundidad visual
      const isAlternateLayer = node.layer % 2 === 0;
      const baseColor = isAlternateLayer ? colors.node : colors.secondaryNode;
      const pulseColor = isAlternateLayer ? colors.nodePulse : colors.secondaryActive;

      // Color del nodo basado en su estado de pulso con transición más suave
      const pulseIntensity = Math.sin(node.pulseState * Math.PI * 2) * 0.5 + 0.5;
      ctx.fillStyle = node.pulseState < 0.2
        ? pulseColor
        : baseColor;

      ctx.fill();
    });
  };

  // Loop de animación optimizado
  const animate = () => {
    // Reducir la frecuencia de actualización en dispositivos de baja potencia
    if (config.optimizeForLowPower) {
      // Usar un contador para actualizar la animación con menos frecuencia
      if (!animationRef.current || animationRef.current % 2 === 0) {
        updateAnimation();
      }
      drawNetwork();
      // Incrementar el contador
      animationRef.current = (animationRef.current || 0) + 1;
      // Usar setTimeout en lugar de requestAnimationFrame para reducir la carga
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / 30); // Limitar a aproximadamente 30 FPS
    } else {
      // Comportamiento normal para dispositivos de alta potencia
      updateAnimation();
      drawNetwork();
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // Manejar cambios de tamaño
  const handleResize = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const container = canvas.parentElement;

    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      // Reinicializar la red con las nuevas dimensiones
      initializeNetwork(canvas.width, canvas.height);
    }
  };

  // Efecto para inicializar y limpiar
  useEffect(() => {
    setIsMounted(true);

    // Comprobar preferencia de reducción de movimiento
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
        setPrefersReducedMotion(event.matches);
      };

      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', handleMotionPreferenceChange);
        return () => mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      }
    }
  }, []);

  // Efecto para configurar el canvas y la animación
  useEffect(() => {
    if (!isMounted || !canvasRef.current) return;

    handleResize();

    // Configurar listener para cambios de tamaño
    window.addEventListener('resize', handleResize);

    // Iniciar animación si no se prefiere reducción de movimiento
    if (!prefersReducedMotion) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Si se prefiere reducción de movimiento, dibujar una versión estática
      drawNetwork();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      // Limpiar la animación según el tipo de referencia
      if (typeof animationRef.current === 'number' && !config.optimizeForLowPower) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, prefersReducedMotion, isDarkMode]);

  // No renderizar nada durante SSR
  if (!isMounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        opacity: config.optimizeForLowPower ? 0.3 : 0.4, // Reducir opacidad en dispositivos de baja potencia
        willChange: 'transform', // Optimización de rendimiento
      }}
      aria-hidden="true" // Mejora de accesibilidad
    />
  );
};

export default NeuralNetworkBackground;
