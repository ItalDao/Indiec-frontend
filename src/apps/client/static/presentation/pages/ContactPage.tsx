// src/apps/client/static/presentation/pages/ContactPage.tsx
import { useState } from 'react';
import { colors } from '../../../../../shared/theme/colors';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 12%, #2d1b69 25%, #1a1f3a 40%, #0f172a 60%, #1a0033 75%, #0f172a 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      paddingBottom: '60px',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 2rem' }}>
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
            Contacto
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cbd5e1', 
            fontWeight: '400', 
            lineHeight: '1.6',
            maxWidth: '600px',
          }}>
            ¿Tienes alguna pregunta o sugerencia? Envíanos un mensaje y te responderemos pronto.
          </p>
        </div>

        {submitted && (
          <div style={{
            padding: '16px',
            marginBottom: '30px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '12px',
            color: '#22c55e',
            fontSize: '16px',
            fontWeight: '500',
          }}>
            ✓ Mensaje enviado correctamente. Te responderemos pronto.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <form onSubmit={handleSubmit} style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'grid', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                  Asunto
                </label>
                <input
                  type="text"
                  placeholder="¿Sobre qué quieres hablar?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                  Mensaje
                </label>
                <textarea
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(30, 27, 75, 0.5)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '16px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.8)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.8)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.background = 'rgba(30, 27, 75, 0.5)';
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
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
                Enviar Mensaje
              </button>
            </div>
          </form>

          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.8), rgba(45, 27, 105, 0.6))',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '40px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}>
            <div>
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px', fontWeight: '700', margin: 0 }}>
                Información de Contacto
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>EMAIL</p>
                  <p style={{ color: '#cbd5e1', fontSize: '16px', margin: 0 }}>contacto@indiec.com</p>
                </div>
                <div>
                  <p style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '600', margin: '0 0 8px 0' }}>REDES SOCIALES</p>
                  <p style={{ color: '#cbd5e1', fontSize: '16px', margin: 0 }}>@indiec_music</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(139, 92, 246, 0.2)', paddingTop: '30px' }}>
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px', fontWeight: '700', margin: 0 }}>
                Horarios de Respuesta
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                Respondemos a todos los mensajes en un plazo máximo de 24-48 horas durante días hábiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};