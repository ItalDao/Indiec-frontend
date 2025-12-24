import React from 'react';
import { colors } from '../theme/colors';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, style, onClick }) => {
  const cardStyles: React.CSSProperties = {
    background: colors.backgroundCard,
    borderRadius: '12px',
    padding: '1.5rem',
    border: `1px solid ${colors.border}`,
    transition: 'all 0.3s ease',
    ...style,
  };

  return (
    <div className={className} style={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};