import type { GeneralSettingsRepository } from '../../domain/repositories/GeneralSettingsRepository';

export const getGeneralSettings = (repository: GeneralSettingsRepository) => {
  return async () => {
    return await repository.getSettings();
  };
};