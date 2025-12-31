// src/apps/client/support/presentation/pages/FAQPage.tsx
import { useState } from 'react';
import { Card } from '../../../../../shared/ui';
import { colors } from '../../../../../shared/theme/colors';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'compras' | 'eventos' | 'tecnico';
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    question: '¿Qué es INDIEC?',
    answer: 'INDIEC es una plataforma digital dedicada a promover y conectar artistas independientes con su público. Ofrecemos un espacio donde puedes descubrir música nueva, asistir a eventos y apoyar directamente a tus artistas favoritos.'
  },
  {
    category: 'general',
    question: '¿Cómo puedo crear una cuenta?',
    answer: 'Actualmente estamos en fase beta. Pronto habilitaremos el registro público. Mientras tanto, puedes explorar el catálogo y guardar tus canciones favoritas localmente.'
  },
  {
    category: 'general',
    question: '¿Es gratuito escuchar música?',
    answer: 'Sí, toda la música en INDIEC es gratuita para escuchar. Apoyamos el modelo de acceso libre para promover la música independiente.'
  },
  {
    category: 'compras',
    question: '¿Cómo compro merchandising?',
    answer: 'Navega a la sección "Tienda", selecciona el producto que te guste, elige tu talla y cantidad, y procede al checkout. Aceptamos múltiples métodos de pago.'
  },
  {
    category: 'compras',
    question: '¿Cuánto tarda el envío?',
    answer: 'Los envíos nacionales tardan entre 3-5 días hábiles. Los envíos internacionales pueden tardar entre 7-14 días hábiles dependiendo del destino.'
  },
  {
    category: 'compras',
    question: '¿Puedo devolver un producto?',
    answer: 'Sí, aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original. Contáctanos para iniciar el proceso.'
  },
  {
    category: 'eventos',
    question: '¿Cómo compro entradas para eventos?',
    answer: 'Ve a la sección "Eventos", selecciona el evento que te interesa y haz click en "Comprar entradas". Serás redirigido al proceso de checkout.'
  },
  {
    category: 'eventos',
    question: '¿Puedo transferir mis entradas?',
    answer: 'Sí, las entradas son transferibles. Contáctanos con el número de orden y los datos del nuevo titular.'
  },
  {
    category: 'tecnico',
    question: 'La música no se reproduce',
    answer: 'Verifica tu conexión a internet y recarga la página. Si el problema persiste, intenta con otro navegador o limpia el caché de tu navegador actual.'
  },
  {
    category: 'tecnico',
    question: 'No puedo guardar favoritos',
    answer: 'Los favoritos se guardan localmente en tu navegador. Asegúrate de tener las cookies habilitadas y de no estar en modo incógnito.'
  }
];

const categories = [
  { id: 'general', label: ' General', icon: '' },
  { id: 'compras', label: ' Compras', icon: '' },
  { id: 'eventos', label: ' Eventos', icon: '' },
  { id: 'tecnico', label: ' Técnico', icon: '' }
];

export const FAQPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [openItem, setOpenItem] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800',
        marginBottom: '0.5rem',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Preguntas Frecuentes
      </h1>
      <p style={{ color: colors.textMuted, marginBottom: '2rem' }}>
        Encuentra respuestas a las preguntas más comunes
      </p>

      {/* Categorías */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: selectedCategory === cat.id 
                ? colors.primary 
                : colors.backgroundCard,
              color: selectedCategory === cat.id 
                ? colors.text 
                : colors.textSecondary,
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '1rem',
              fontWeight: selectedCategory === cat.id ? '600' : '400'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQs */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredFAQs.map((faq, index) => (
          <Card 
            key={index}
            style={{ 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => setOpenItem(openItem === index ? null : index)}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <h3 style={{ 
                fontSize: '1.1rem', 
                color: colors.text,
                fontWeight: '600',
                margin: 0
              }}>
                {faq.question}
              </h3>
              <span style={{ 
                fontSize: '1.5rem',
                transition: 'transform 0.2s',
                transform: openItem === index ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>
            
            {openItem === index && (
              <p style={{ 
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: `1px solid ${colors.border}`,
                color: colors.textSecondary,
                lineHeight: '1.6'
              }}>
                {faq.answer}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Contacto adicional */}
      <Card style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: colors.text }}>
          ¿No encontraste lo que buscabas?
        </h3>
        <p style={{ color: colors.textSecondary, marginBottom: '1.5rem' }}>
          Nuestro equipo de soporte está aquí para ayudarte
        </p>
        <a 
          href="/client/contact"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: colors.primary,
            color: colors.text,
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
          Contactar Soporte
        </a>
      </Card>
    </div>
  );
};