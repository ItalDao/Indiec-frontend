// src/apps/admin/dashboard/domain/repositories/DashboardRepository.ts

import type { DashboardReport } from '../models/DashboardStats';

export interface DashboardRepository {
  getReport(): Promise<DashboardReport>;
}