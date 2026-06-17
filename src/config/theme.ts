// src/config/theme.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for every design token used across the app.
// Import from here instead of hardcoding hex strings in StyleSheets.
// ─────────────────────────────────────────────────────────────────────────────

export const Colors = {
  // Brand
  teal: '#00b9c0',
  lime: '#b6d82c',
  cyan: '#00D5FF',

  // Backgrounds
  bgBlack: '#000000',
  bgSurface: '#0A0A0A',
  bgCard: '#0D0D0D',
  bgInput: '#1C1C1E',
  bgInputBorder: '#2C2C2E',
  bgModalOverlay: 'rgba(0,0,0,0.8)',
  bgModalSheet: '#121214',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  textMuted: '#888888',
  textDim: '#666666',

  // Borders
  borderDefault: '#1C1C1E',
  borderStrong: '#2C2C2E',
  borderTeal: '#00b9c0',
  borderCyan: '#00D5FF',

  // Status
  success: '#22C55E',
  error: '#FF3B30',
  pending: '#FF4D4D',

  // Social platforms
  instagram: '#E1306C',
  youtube: '#FF0000',
  facebook: '#1877F2',
  twitter: '#1DA1F2',
} as const;

const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

const Radius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 18,
  xxl: 20,
  full: 9999,
} as const;
