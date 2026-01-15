// src/apps/admin/dashboard/presentation/hooks/useDashboard.ts

import { useState, useEffect } from 'react';
import { getDashboardReport } from '../../application/usecases/dashboard/getDashboardReport';
import type { DashboardReport } from '../../domain/models/DashboardStats';

export const useDashboard = () => {
  const [report, setReport] = useState<DashboardReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDashboardReport();
      setReport(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar dashboard');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return {
    report,
    loading,
    error,
    refetch: fetchReport,
  };
};