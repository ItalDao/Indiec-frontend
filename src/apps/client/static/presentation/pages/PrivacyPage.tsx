// src/apps/client/static/presentation/pages/PrivacyPage.tsx
import { colors } from '../../../../../shared/theme/colors';

export const PrivacyPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800',
        marginBottom: '1rem',
        color: colors.text
      }}>
        Política de Privacidad
      </h1>
      
      <p style={{ color: colors.textMuted, marginBottom: '2rem' }}>
        Última actualización: Diciembre 2024
      </p>
      
      <div style={{ color: colors.textSecondary, lineHeight: '1.8' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            Información que Recopilamos
          </h2>
          <p>
            En INDIEC recopilamos información básica de los usuarios como nombre, email y 
            preferencias musicales para mejorar tu experiencia en la plataforma.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            Uso de la Información
          </h2>
          <p>
            Utilizamos tu información para personalizar recomendaciones musicales, 
            procesar compras y mantener la seguridad de la plataforma.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            Protección de Datos
          </h2>
          <p>
            Implementamos medidas de seguridad para proteger tu información personal. 
            No compartimos tus datos con terceros sin tu consentimiento.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            Cookies
          </h2>
          <p>
            Utilizamos cookies para mejorar tu experiencia de navegación y recordar 
            tus preferencias. Puedes desactivarlas en la configuración de tu navegador.
          </p>
        </section>
      </div>
    </div>
  );
};