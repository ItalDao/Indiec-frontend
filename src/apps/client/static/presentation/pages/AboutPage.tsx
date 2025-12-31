// src/apps/client/static/presentation/pages/AboutPage.tsx
import { colors } from '../../../../../shared/theme/colors';

export const AboutPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800',
        marginBottom: '1rem',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Sobre INDIEC
      </h1>
      
      <div style={{ color: colors.textSecondary, lineHeight: '1.8' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          INDIEC es una plataforma dedicada a promover y conectar artistas independientes 
          con su público, ofreciendo un espacio digital donde la música alternativa encuentra su hogar.
        </p>
        
        <h2 style={{ fontSize: '1.5rem', color: colors.text, marginTop: '2rem', marginBottom: '1rem' }}>
          Nuestra Misión
        </h2>
        <p style={{ marginBottom: '1.5rem' }}>
          Democratizar el acceso a la música independiente y proporcionar herramientas 
          para que los artistas emergentes puedan compartir su trabajo con el mundo.
        </p>
        
        <h2 style={{ fontSize: '1.5rem', color: colors.text, marginTop: '2rem', marginBottom: '1rem' }}>
          ¿Qué Ofrecemos?
        </h2>
        <ul style={{ paddingLeft: '1.5rem' }}>
          <li style={{ marginBottom: '0.5rem' }}>Catálogo de canciones de artistas independientes</li>
          <li style={{ marginBottom: '0.5rem' }}>Información sobre eventos y conciertos</li>
          <li style={{ marginBottom: '0.5rem' }}>Tienda de merchandising oficial</li>
          <li style={{ marginBottom: '0.5rem' }}>Soporte directo a los artistas</li>
        </ul>
      </div>
    </div>
  );
};