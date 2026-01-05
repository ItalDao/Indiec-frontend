import { useState, useEffect } from 'react';
import type { GeneralSettings } from '../../domain/entities/GeneralSettings';
import { getGeneralSettings } from '../../application/use-cases/getGeneralSettings';
import { updateGeneralSettings } from '../../application/use-cases/updateGeneralSettings';
import { GeneralSettingsMock } from '../../infrastructure/mocks/GeneralSettingsMock';

const repository = new GeneralSettingsMock();

export const useGeneralSettings = () => {
  const [settings, setSettings] = useState<GeneralSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const getSettings = getGeneralSettings(repository);
      const data = await getSettings();
      setSettings(data);
    } catch (err) {
      setError('Error al cargar configuración');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: GeneralSettings) => {
    try {
      setLoading(true);
      setError(null);
      const updateSettings = updateGeneralSettings(repository);
      await updateSettings(newSettings);
      setSettings(newSettings);
      return true;
    } catch (err) {
      setError('Error al guardar configuración');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    saveSettings,
    reloadSettings: loadSettings,
  };
};