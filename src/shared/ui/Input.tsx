import React from 'react';
import { colors } from '../theme/colors';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  const inputStyles: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    background: colors.backgroundLight,
    border: `1px solid ${error ? colors.error : colors.border}`,
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    ...style,
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: colors.text,
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          {label}
        </label>
      )}
      <input style={inputStyles} {...props} />
      {error && (
        <span
          style={{
            display: 'block',
            marginTop: '0.25rem',
            color: colors.error,
            fontSize: '0.875rem',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};