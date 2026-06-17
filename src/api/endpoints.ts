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

const USER = {
  PROFILE:         '/user/profile',
  UPDATE_PROFILE:  '/user/profile',
  AVATAR:          '/user/avatar',
} as const;

const CAMPAIGNS = {
  LIST:            '/campaigns',
  DETAIL:          (id: string) => `/campaigns/${id}`,
  APPLY:           (id: string) => `/campaigns/${id}/apply`,
} as const;

const EARNINGS = {
  SUMMARY:         '/earnings/summary',
  LIST:            '/earnings',
  WITHDRAW:        '/earnings/withdraw',
} as const;

const CONTENT = {
  LIST:            '/content',
  DETAIL:          (id: string) => `/content/${id}`,
} as const;

const ANALYTICS = {
  OVERVIEW:        '/analytics/overview',
  PLATFORMS:       '/analytics/platforms',
} as const;
