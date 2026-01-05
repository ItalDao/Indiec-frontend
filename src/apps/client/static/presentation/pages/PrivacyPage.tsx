// src/apps/client/static/presentation/pages/PrivacyPage.tsx
import { colors } from '../../../../../shared/theme/colors';

export const PrivacyPage = () => {
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
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #fff 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
            letterSpacing: '-2px',
          }}>
            Política de Privacidad
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '0px' }}>
            Última actualización: Diciembre 2024
          </p>
        </div>
        
        <div style={{ display: 'grid', gap: '30px' }}>
          <section style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px', fontWeight: '700', margin: 0 }}>
              Información que Recopilamos
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              En INDIEC recopilamos información básica de los usuarios como nombre, email y 
              preferencias musicales para mejorar tu experiencia en la plataforma.
            </p>
          </section>

          <section style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px', fontWeight: '700', margin: 0 }}>
              Uso de la Información
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              Utilizamos tu información para personalizar recomendaciones musicales, 
              procesar compras y mantener la seguridad de la plataforma.
            </p>
          </section>

          <section style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px', fontWeight: '700', margin: 0 }}>
              Protección de Datos
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              Implementamos medidas de seguridad para proteger tu información personal. 
              No compartimos tus datos con terceros sin tu consentimiento.
            </p>
          </section>

          <section style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '32px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
          }}>
            <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px', fontWeight: '700', margin: 0 }}>
              Cookies
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              Utilizamos cookies para mejorar tu experiencia de navegación y recordar 
              tus preferencias. Puedes desactivarlas en la configuración de tu navegador.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};