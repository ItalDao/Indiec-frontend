import type { GeneralSettingsRepository } from '../../domain/repositories/GeneralSettingsRepository';
import type { GeneralSettings } from '../../domain/entities/GeneralSettings';

const mockSettings: GeneralSettings = {
  id: '1',
  platformName: 'INDIEC',
  primaryColor: '#8B5CF6',
  secondaryColor: '#EC4899',
  instagram: '@indiec_oficial',
  facebook: '',
  twitter: '',
  footerText: '© 2025 INDIEC. Todos los derechos reservados.',
  logo: null,
};

export class GeneralSettingsMock implements GeneralSettingsRepository {
  private settings: GeneralSettings = { ...mockSettings };

  async getSettings(): Promise<GeneralSettings> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...this.settings });
      }, 300);
    });
  }

  async updateSettings(settings: GeneralSettings): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.settings = { ...settings };
        console.log('Settings actualizados (mock):', this.settings);
        resolve();
      }, 500);
    });
  }
}