// src/api/endpoints.ts
// ─────────────────────────────────────────────────────────────────────────────
// All API endpoint paths in one place.
// Import from here rather than hardcoding strings in service files.
// ─────────────────────────────────────────────────────────────────────────────

export const AUTH = {
  LOGIN:           '/auth/login',
  REGISTER:        '/auth/register',
  LOGOUT:          '/auth/logout',
  REFRESH_TOKEN:   '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD:  '/auth/reset-password',
  VERIFY_EMAIL:    '/auth/verify-email',
  SEND_OTP:        '/auth/send-otp',
  VERIFY_OTP:      '/auth/verify-otp',
} as const;


