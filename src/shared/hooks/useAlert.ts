import { useState, useCallback } from 'react';
import type { AlertMessage } from '../ui/AlertContainer';
import type { AlertType } from '../ui/Alert';

export const useAlert = () => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = useCallback((
    type: AlertType,
    title: string,
    message: string,
    autoClose: number = 5000
  ) => {
    const id = `${Date.now()}-${Math.random()}`;
    const newAlert: AlertMessage = { id, type, title, message, autoClose };
    
    setAlerts((prev) => [...prev, newAlert]);
    
    return id;
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const success = useCallback((title: string, message: string) => {
    return addAlert('success', title, message);
  }, [addAlert]);

  const error = useCallback((title: string, message: string) => {
    return addAlert('error', title, message, 6000); // Errores duran más
  }, [addAlert]);

  const warning = useCallback((title: string, message: string) => {
    return addAlert('warning', title, message);
  }, [addAlert]);

  const info = useCallback((title: string, message: string) => {
    return addAlert('info', title, message);
  }, [addAlert]);

  return {
    alerts,
    addAlert,
    removeAlert,
    success,
    error,
    warning,
    info,
  };
};
