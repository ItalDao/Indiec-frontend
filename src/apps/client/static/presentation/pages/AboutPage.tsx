// src/apps/client/static/presentation/pages/AboutPage.tsx
import { colors } from '../../../../../shared/theme/colors';

export const AboutPage = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 2rem' }}>
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: 'clamp(42px, 7vw, 64px)', 
            fontWeight: '900',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-2px',
          }}>
            Sobre INDIEC
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Descubre nuestra plataforma y cómo estamos revolucionando la música independiente
          </p>
        </div>
        
        <div style={{ display: 'grid', gap: '40px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '40px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '20px', fontWeight: '700', margin: 0 }}>
              Nuestra Misión
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '16px', margin: 0 }}>
              Democratizar el acceso a la música independiente y proporcionar herramientas para que los artistas emergentes puedan compartir su trabajo con el mundo sin barreras.
            </p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '40px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '20px', fontWeight: '700', margin: 0 }}>
              ¿Qué Ofrecemos?
            </h2>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li style={{ marginBottom: '15px', color: '#cbd5e1', fontSize: '16px', lineHeight: '1.6' }}>🎵 Catálogo de canciones de artistas independientes</li>
              <li style={{ marginBottom: '15px', color: '#cbd5e1', fontSize: '16px', lineHeight: '1.6' }}>🎤 Información sobre eventos y conciertos</li>
              <li style={{ marginBottom: '15px', color: '#cbd5e1', fontSize: '16px', lineHeight: '1.6' }}>🛍️ Tienda de merchandising oficial</li>
              <li style={{ marginBottom: '15px', color: '#cbd5e1', fontSize: '16px', lineHeight: '1.6' }}>⭐ Soporte directo a los artistas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};