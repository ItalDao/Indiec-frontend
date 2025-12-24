import React from 'react';
import { colors } from '../theme/colors';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
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
        background: colors.overlay,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: colors.backgroundCard,
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '90%',
          border: `1px solid ${colors.border}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            style={{
              marginBottom: '1.5rem',
              color: colors.text,
              fontSize: '1.5rem',
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