import React from 'react';
import { Alert } from './Alert';
import type { AlertType } from './Alert';

export interface AlertMessage {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  autoClose?: number;
}

interface AlertContainerProps {
  alerts: AlertMessage[];
  onRemove: (id: string) => void;
}

export const AlertContainer: React.FC<AlertContainerProps> = ({ alerts, onRemove }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
        pointerEvents: 'none',
      }}
    >
      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={{ pointerEvents: 'auto' }}
        >
          <Alert
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => onRemove(alert.id)}
            autoClose={alert.autoClose}
          />
        </div>
      ))}
    </div>
  );
};

export default AlertContainer;
