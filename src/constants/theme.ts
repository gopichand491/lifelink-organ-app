/**
 * Medical theme — red, white, blue palette for healthcare branding
 */
export const colors = {
  primary: '#C62828',
  primaryDark: '#8E0000',
  primaryLight: '#FF5F52',
  secondary: '#1565C0',
  secondaryDark: '#003C8F',
  secondaryLight: '#5E92F3',
  accent: '#FFFFFF',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  success: '#2E7D32',
  warning: '#F57C00',
  error: '#D32F2F',
  info: '#0288D1',
  overlay: 'rgba(0,0,0,0.45)',
  gradientStart: '#C62828',
  gradientEnd: '#1565C0',
  cardShadow: 'rgba(21, 101, 192, 0.12)',
  emergency: '#FF1744',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, color: colors.text },
  h2: { fontSize: 22, fontWeight: '700' as const, color: colors.text },
  h3: { fontSize: 18, fontWeight: '600' as const, color: colors.text },
  body: { fontSize: 16, fontWeight: '400' as const, color: colors.text },
  bodySmall: { fontSize: 14, fontWeight: '400' as const, color: colors.textSecondary },
  caption: { fontSize: 12, fontWeight: '400' as const, color: colors.textLight },
  button: { fontSize: 16, fontWeight: '600' as const },
};

export const shadows = {
  card: {
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  button: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
};
