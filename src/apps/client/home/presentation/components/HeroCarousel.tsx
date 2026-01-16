import React from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../../../../shared/theme/colors';

export type SlideType = 'song' | 'event' | 'product';

export interface Slide {
  id: number | string;
  title: string;
  subtitle: string;
  image: string;
  type: SlideType;
}

interface HeroCarouselProps {
  data: Slide[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ data }) => {
  const [current, setCurrent] = React.useState(0);
  const navigate = useNavigate();

  const ctaConfig: Record<SlideType, { label: string; action: () => void }> = {
    song: {
      label: 'Escuchar ahora',
      action: () => navigate('/client/songs'),
    },
    event: {
      label: 'Ver eventos',
      action: () => navigate('/client/events'),
    },
    product: {
      label: 'Ver producto',
      action: () => navigate('/client/store'),
    },
  };

  React.useEffect(() => {
    if (data.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length]);

  if (!data || data.length === 0) return null;

  return (
    <div
      style={{
        position: 'relative',
        height: '500px',
        overflow: 'hidden',
        borderRadius: '16px',
        margin: '0 auto 4rem',
        maxWidth: '1280px',
      }}
    >
      {data.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === current ? 1 : 0,
            pointerEvents: index === current ? 'auto' : 'none',
            transition: 'opacity 1s ease-in-out',
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            padding: '0 4rem',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '2.5rem',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
            }}
          >
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: colors.text }}>
              {slide.title}
            </h1>
            <p style={{ fontSize: '1.5rem', color: colors.textSecondary, marginBottom: '2rem' }}>
              {slide.subtitle}
            </p>
            <button
              onClick={ctaConfig[slide.type].action}
              style={{
                padding: '0.875rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {ctaConfig[slide.type].label}
            </button>
          </div>
        </div>
      ))}

      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.75rem', zIndex: 10 }}>
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: index === current ? colors.primary : colors.borderLight,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;