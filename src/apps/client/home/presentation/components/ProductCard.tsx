// src/apps/client/home/presentation/components/ProductCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../../../../shared/theme/colors';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  talla?: string;
  stock?: number;
  descuento?: number; // porcentaje
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const placeholderImage = 'https://placehold.co/600x600/1E293B/64748B?text=Merch+Indie';

  const finalPrice = product.descuento
    ? product.precio * (1 - product.descuento / 100)
    : product.precio;

  const hasDiscount = product.descuento && product.descuento > 0;

  return (
    <Link to={`/client/store/${product.id}`} style={{ textDecoration: 'none' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}

        whileHover={{
          scale: 1.06,
          y: -20,
          rotateY: 8,
          rotateX: 4,
          transition: { duration: 0.4, ease: 'easeOut' },
        }}

        style={{
          borderRadius: '24px',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Contenedor glassmorphism */}
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = `1px solid ${colors.primary}`;
            e.currentTarget.style.boxShadow = '0 30px 60px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = '1px solid rgba(139, 92, 246, 0.3)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.4)';
          }}
        >
          {/* Imagen con zoom */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <motion.img
              src={product.imagen || placeholderImage}
              alt={product.nombre}
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.6 }}
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Badge de descuento pulsante */}
            {hasDiscount && (
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: colors.secondary,
                  color: colors.text,
                  padding: '0.6rem 1.1rem',
                  borderRadius: '999px',
                  fontWeight: '800',
                  fontSize: '0.925rem',
                  boxShadow: '0 6px 20px rgba(236, 72, 153, 0.6)',
                  zIndex: 10,
                }}
              >
                -{product.descuento}%
              </motion.div>
            )}
          </div>

          {/* Información inferior */}
          <div style={{ padding: '1.75rem' }}>
            {/* Nombre con gradiente permanente (mejor rendimiento y visual) */}
            <h4
              style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                marginBottom: '1rem',
                minHeight: '3.5em',
                textAlign: 'center',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {product.nombre}
            </h4>

            {/* Precio */}
            <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
              {hasDiscount && (
                <span
                  style={{
                    color: colors.textMuted,
                    textDecoration: 'line-through',
                    fontSize: '1rem',
                    marginRight: '0.75rem',
                  }}
                >
                  ${product.precio.toFixed(2)}
                </span>
              )}
              <span
                style={{
                  color: colors.primary,
                  fontWeight: '800',
                  fontSize: '1.6rem',
                }}
              >
                ${finalPrice.toFixed(2)}
              </span>
            </div>

            {/* Talla */}
            {product.talla && (
              <p style={{ color: colors.textSecondary, fontSize: '0.975rem', textAlign: 'center', marginBottom: '1.25rem' }}>
                Talla: {product.talla}
              </p>
            )}

            {/* Botón Añadir al carrito */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              style={{
                width: '100%',
                padding: '1.125rem',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: colors.text,
                border: 'none',
                borderRadius: '16px',
                fontWeight: '700',
                fontSize: '1.125rem',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              Añadir al carrito
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;