import type { GeneralSettings } from '../entities/GeneralSettings';

export interface GeneralSettingsRepository {
  getSettings(): Promise<GeneralSettings>;
  updateSettings(settings: GeneralSettings): Promise<void>;
}