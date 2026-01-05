// src/apps/client/support/presentation/pages/FAQPage.tsx
import { useState } from 'react';
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
  { id: 'general', label: 'General' },
  { id: 'compras', label: 'Compras' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'tecnico', label: 'Técnico' }
];

export const FAQPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [openItem, setOpenItem] = useState<number | null>(null);

  const filteredFAQs = faqs.filter(faq => faq.category === selectedCategory);

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
            Preguntas Frecuentes
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            Encuentra respuestas a las preguntas más comunes sobre INDIEC
          </p>
        </div>

        {/* Categorías */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '12px 20px',
                borderRadius: '10px',
                border: selectedCategory === cat.id 
                  ? '1px solid #8b5cf6' 
                  : '1px solid rgba(139, 92, 246, 0.3)',
                background: selectedCategory === cat.id 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.2))'
                  : 'rgba(30, 27, 75, 0.5)',
                color: selectedCategory === cat.id 
                  ? '#8b5cf6' 
                  : '#cbd5e1',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '16px',
                fontWeight: selectedCategory === cat.id ? '600' : '500'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.6)';
                  e.currentTarget.style.background = 'rgba(139, 92, 246, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat.id) {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                }
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
          {filteredFAQs.map((faq, index) => (
            <div 
              key={index}
              onClick={() => setOpenItem(openItem === index ? null : index)}
              style={{
                background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  color: '#fff',
                  fontWeight: '600',
                  margin: 0,
                  flex: 1
                }}>
                  {faq.question}
                </h3>
                <span style={{ 
                  fontSize: '20px',
                  color: '#8b5cf6',
                  transition: 'transform 0.2s ease',
                  transform: openItem === index ? 'rotate(180deg)' : 'rotate(0deg)',
                  display: 'flex',
                  flexShrink: 0,
                }}>
                  ▼
                </span>
              </div>
              
              {openItem === index && (
                <p style={{ 
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid rgba(139, 92, 246, 0.2)',
                  color: '#cbd5e1',
                  lineHeight: '1.6',
                  fontSize: '16px',
                  margin: 0,
                }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contacto adicional */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        }}>
          <h3 style={{ fontSize: '24px', marginBottom: '16px', color: '#fff', fontWeight: '700', margin: 0 }}>
            ¿No encontraste lo que buscabas?
          </h3>
          <p style={{ color: '#cbd5e1', marginBottom: '24px', fontSize: '16px', margin: '16px 0 24px 0' }}>
            Nuestro equipo de soporte está aquí para ayudarte
          </p>
          <a 
            href="/client/contact"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: '#fff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
            }}
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </div>
  );
};