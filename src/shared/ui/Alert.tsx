import React from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type: AlertType;
  title: string;
  message: string;
  onClose?: () => void;
  autoClose?: number; // ms, 0 = no auto close
}

export const Alert: React.FC<AlertProps> = ({ 
  type, 
  title, 
  message, 
  onClose,
  autoClose = 5000 
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  const colorSchemes = {
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: '#10b981',
      text: '#10b981',
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: '#ef4444',
      text: '#ef4444',
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: '#f59e0b',
      text: '#f59e0b',
    },
    info: {
      bg: 'rgba(139, 92, 246, 0.1)',
      border: '#8b5cf6',
      text: '#8b5cf6',
    },
  };

  const colors = colorSchemes[type];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        borderRadius: '10px',
        background: colors.bg,
        border: `1.5px solid ${colors.border}`,
        backdropFilter: 'blur(16px)',
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
        animation: 'slideInDown 0.3s ease-out',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          color: colors.text,
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" style={{color: colors.text}}>
          {type === 'success' && <polyline points="20 6 9 17 4 12" />}
          {type === 'error' && (
            <>
              <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
              <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            </>
          )}
          {type === 'warning' && (
            <>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </>
          )}
          {type === 'info' && (
            <>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </>
          )}
        </svg>
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h4
          style={{
            margin: '0 0 4px 0',
            fontSize: '14px',
            fontWeight: '700',
            color: colors.text,
            letterSpacing: '-0.3px',
          }}
        >
          {title}
        </h4>
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            fontWeight: '500',
            color: '#cbd5e1',
            lineHeight: '1.4',
          }}
        >
          {message}
        </p>
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.text,
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.6,
            transition: 'opacity 0.2s ease',
            flexShrink: 0,
            marginTop: '2px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
