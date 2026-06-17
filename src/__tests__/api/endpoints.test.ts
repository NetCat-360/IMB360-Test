import { AUTH } from '../../api/endpoints';

describe('AUTH endpoints', () => {
  it('has all auth paths', () => {
    expect(AUTH.LOGIN).toBe('/auth/login');
    expect(AUTH.REGISTER).toBe('/auth/register');
    expect(AUTH.LOGOUT).toBe('/auth/logout');
    expect(AUTH.REFRESH_TOKEN).toBe('/auth/refresh');
    expect(AUTH.FORGOT_PASSWORD).toBe('/auth/forgot-password');
    expect(AUTH.RESET_PASSWORD).toBe('/auth/reset-password');
    expect(AUTH.VERIFY_EMAIL).toBe('/auth/verify-email');
    expect(AUTH.SEND_OTP).toBe('/auth/send-otp');
    expect(AUTH.VERIFY_OTP).toBe('/auth/verify-otp');
  });

  it('AUTH values are strings', () => {
    for (const value of Object.values(AUTH)) {
      expect(typeof value).toBe('string');
    }
  });

  it('all auth paths start with /auth/', () => {
    for (const value of Object.values(AUTH)) {
      expect(value.startsWith('/auth/')).toBe(true);
    }
  });
});
