import type { GeneralSettingsRepository } from '../../domain/repositories/GeneralSettingsRepository';
import type { GeneralSettings } from '../../domain/entities/GeneralSettings';

export const updateGeneralSettings = (repository: GeneralSettingsRepository) => {
  return async (settings: GeneralSettings) => {
    await repository.updateSettings(settings);
  };
};