import React from 'react';
import { colors } from '../theme/colors';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.95) 100%)',
          borderRadius: '20px',
          padding: '48px',
          maxWidth: '600px',
          width: '90%',
          border: '1.5px solid rgba(139, 92, 246, 0.2)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            style={{
              marginBottom: '24px',
              color: '#e2e8f0',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontWeight: 700,
              margin: 0,
              marginBottom: '24px',
            }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};