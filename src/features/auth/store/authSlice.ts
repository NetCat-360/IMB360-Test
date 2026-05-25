import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'ADMIN' | 'CREATOR' | 'BRAND';

export type UserPermissions = {
  canManageUsers: boolean;
  canCreateCampaigns: boolean;
  canViewPayments: boolean;
  canEditProfile: boolean;
};

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  permissions: UserPermissions;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: AuthUser;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },

    logout: state => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;