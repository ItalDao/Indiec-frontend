// src/apps/client/static/presentation/pages/TermsPage.tsx
import { colors } from '../../../../../shared/theme/colors';

export const TermsPage = () => {
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
            Términos y Condiciones
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
              1. Aceptación de Términos
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              Al acceder y utilizar INDIEC, aceptas estar vinculado por estos términos y condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestra plataforma.
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
              2. Uso de la Plataforma
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              INDIEC proporciona una plataforma para descubrir música independiente. Los usuarios 
              se comprometen a usar el servicio de manera responsable y legal.
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
              3. Propiedad Intelectual
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              Todo el contenido musical, imágenes y materiales en INDIEC están protegidos por 
              derechos de autor y pertenecen a sus respectivos artistas.
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
              4. Compras
            </h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '16px', margin: 0 }}>
              Las compras realizadas en nuestra tienda están sujetas a disponibilidad. 
              Nos reservamos el derecho de rechazar cualquier pedido.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};