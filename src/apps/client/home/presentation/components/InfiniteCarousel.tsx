import React, { useState } from 'react'; // Importamos useState
import { motion } from 'framer-motion';

interface InfiniteCarouselProps {
  children: React.ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ 
  children, 
  speed = 30, 
  direction = 'left' 
}) => {
  // Estado para saber si alguna canción se está reproduciendo
  const [isPausedByCard, setIsPausedByCard] = useState(false);

  // Clonamos los hijos para inyectarles la función que pausa el carrusel
  const childrenWithExtraProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onTogglePlay: (playing: boolean) => setIsPausedByCard(playing)
      });
    }
    return child;
  });

  const duplicatedChildren = [...(childrenWithExtraProps || []), ...(childrenWithExtraProps || []), ...(childrenWithExtraProps || [])];

  const initialX = direction === 'left' ? '0%' : '-33.33%';
  const animateX = direction === 'left' ? '-33.33%' : '0%';

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative', padding: '1.5rem 0' }}>
      {/* Gradientes laterales omitidos por brevedad... */}

      <motion.div
        style={{
          display: 'flex',
          gap: '20px',
          width: 'max-content',
        }}
        animate={isPausedByCard ? { x: undefined } : { x: [initialX, animateX] }} // Si está pausado, mantenemos la posición actual
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
        // Esto permite que el carrusel se detenga si isPausedByCard es true
        // O si el usuario pone el mouse encima
      >
        {duplicatedChildren.map((child, index) => (
          <div key={index} style={{ flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;