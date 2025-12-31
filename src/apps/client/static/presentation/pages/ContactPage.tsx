// src/apps/client/static/presentation/pages/ContactPage.tsx
import { useState } from 'react';
import { Button, Input } from '../../../../../shared/ui';
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
    // Aquí iría la lógica de envío real
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: '800',
        marginBottom: '1rem',
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        Contacto
      </h1>
      
      <p style={{ color: colors.textSecondary, marginBottom: '2rem' }}>
        ¿Tienes alguna pregunta o sugerencia? Envíanos un mensaje y te responderemos pronto.
      </p>

      {submitted && (
        <div style={{
          padding: '1rem',
          marginBottom: '2rem',
          background: `${colors.success}20`,
          border: `1px solid ${colors.success}`,
          borderRadius: '8px',
          color: colors.success
        }}>
          ✓ Mensaje enviado correctamente. Te responderemos pronto.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        
        <Input
          label="Asunto"
          placeholder="¿Sobre qué quieres hablar?"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
        />
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: colors.text,
            fontSize: '0.875rem',
            fontWeight: '500',
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
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              background: colors.backgroundLight,
              border: `1px solid ${colors.border}`,
              borderRadius: '8px',
              color: colors.text,
              outline: 'none',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <Button type="submit" variant="primary" size="lg">
          Enviar Mensaje
        </Button>
      </form>

      <div style={{ 
        marginTop: '3rem', 
        padding: '2rem',
        background: colors.backgroundCard,
        borderRadius: '12px',
        border: `1px solid ${colors.border}`
      }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: colors.text }}>
          Otras formas de contacto
        </h3>
        <p style={{ color: colors.textSecondary, marginBottom: '0.5rem' }}>
           Email: contacto@indiec.com
        </p>
        <p style={{ color: colors.textSecondary }}>
           Redes sociales: @indiec_music
        </p>
      </div>
    </div>
  );
};