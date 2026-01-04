// src/shared/theme/colors.ts

export const colors = {
  // Colores principales - Indie/Moderno
  primary: '#8B5CF6',       // Púrpura vibrante
  primaryDark: '#7C3AED',
  primaryLight: '#A78BFA',
  
  secondary: '#EC4899',     // Rosa indie
  secondaryDark: '#DB2777',
  secondaryLight: '#F472B6',
  
  accent: '#10B981',        // Verde para éxito/activo
  accentDark: '#059669',
  
  // Fondos
  background: '#0F172A',    // Fondo oscuro principal
  backgroundLight: '#1E293B',
  backgroundCard: '#1E293B',
  
  // Textos
  text: '#F1F5F9',          // Texto principal (claro)
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  
  // Bordes
  border: '#334155',
  borderLight: '#475569',
  
  // Estados
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Overlay
  overlay: 'rgba(15, 23, 42, 0.8)',

  //boton cancelar
  cancelar: 'transparent',
};

export type ColorKey = keyof typeof colors;