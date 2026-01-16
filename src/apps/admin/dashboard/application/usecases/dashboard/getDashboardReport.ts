// src/apps/admin/dashboard/application/usecases/dashboard/getDashboardReport.ts

import { dashboardRepository } from '../../../infrastructure/api/dashboardApi';
import type { DashboardReport } from '../../../domain/models/DashboardStats';

export const getDashboardReport = async (): Promise<DashboardReport> => {
  return await dashboardRepository.getReport();
 };