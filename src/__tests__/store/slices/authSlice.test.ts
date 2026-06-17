import authReducer, {
  loginSuccess,
  logout,
  setAuthLoading,
  updateUser,
} from '../../../store/slices/authSlice';
import type { User } from '../../../types/global';

const mockUser: User = {
  id: '1',
  email: 'test@test.com',
  name: 'Test User',
  username: 'testuser',
  role: 'CREATOR',
  permissions: {
    canViewDashboard: true,
    canManageCampaigns: false,
    canManageContent: true,
    canManagePricing: false,
    canViewEarnings: true,
    canManageSettings: false,
  },
};

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    loading: false,
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginSuccess', () => {
    const payload = {
      user: mockUser,
      accessToken: 'access-token-123',
      refreshToken: 'refresh-token-456',
    };
    const state = authReducer(initialState, loginSuccess(payload));
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.accessToken).toBe('access-token-123');
    expect(state.refreshToken).toBe('refresh-token-456');
    expect(state.loading).toBe(false);
  });

  it('should handle logout', () => {
    const loggedInState = {
      isAuthenticated: true,
      accessToken: 'token',
      refreshToken: 'token',
      user: mockUser,
      loading: false,
    };
    const state = authReducer(loggedInState, logout());
    expect(state).toEqual(initialState);
  });

  it('should handle setAuthLoading (true)', () => {
    const state = authReducer(initialState, setAuthLoading(true));
    expect(state.loading).toBe(true);
  });

  it('should handle setAuthLoading (false)', () => {
    const loadingState = { ...initialState, loading: true };
    const state = authReducer(loadingState, setAuthLoading(false));
    expect(state.loading).toBe(false);
  });

  it('should handle updateUser when user exists', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const state = authReducer(stateWithUser, updateUser({ name: 'Updated Name' }));
    expect(state.user?.name).toBe('Updated Name');
    expect(state.user?.email).toBe('test@test.com');
  });

  it('should handle updateUser when user is null', () => {
    const state = authReducer(initialState, updateUser({ name: 'No Effect' }));
    expect(state.user).toBeNull();
  });
});
