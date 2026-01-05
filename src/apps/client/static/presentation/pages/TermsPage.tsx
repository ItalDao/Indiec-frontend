// src/apps/client/static/presentation/pages/TermsPage.tsx
import { colors } from '../../../../../shared/theme/colors';

export const TermsPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800',
        marginBottom: '1rem',
        color: colors.text
      }}>
        Términos y Condiciones
      </h1>
      
      <p style={{ color: colors.textMuted, marginBottom: '2rem' }}>
        Última actualización: Diciembre 2024
      </p>
      
      <div style={{ color: colors.textSecondary, lineHeight: '1.8' }}>
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            1. Aceptación de Términos
          </h2>
          <p>
            Al acceder y utilizar INDIEC, aceptas estar vinculado por estos términos y condiciones. 
            Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestra plataforma.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            2. Uso de la Plataforma
          </h2>
          <p>
            INDIEC proporciona una plataforma para descubrir música independiente. Los usuarios 
            se comprometen a usar el servicio de manera responsable y legal.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            3. Propiedad Intelectual
          </h2>
          <p>
            Todo el contenido musical, imágenes y materiales en INDIEC están protegidos por 
            derechos de autor y pertenecen a sus respectivos artistas.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', color: colors.text, marginBottom: '1rem' }}>
            4. Compras
          </h2>
          <p>
            Las compras realizadas en nuestra tienda están sujetas a disponibilidad. 
            Nos reservamos el derecho de rechazar cualquier pedido.
          </p>
        </section>
      </div>
    </div>
  );
};