import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  User,
  AuthTokens,
} from '../../types/global';

export interface AuthState extends AuthTokens {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,

  accessToken: null,
  refreshToken: null,

  user: null,

  loading: false,
};

type LoginPayload = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    /**
     * LOGIN SUCCESS
     */
    loginSuccess: (
      state,
      action: PayloadAction<LoginPayload>,
    ) => {
      state.isAuthenticated = true;

      state.user = action.payload.user;

      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      state.loading = false;
    },

    /**
     * LOGOUT
     */
    logout: state => {
      state.isAuthenticated = false;

      state.user = null;

      state.accessToken = null;
      state.refreshToken = null;

      state.loading = false;
    },

    /**
     * SET LOADING
     */
    setAuthLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload;
    },

    /**
     * UPDATE USER
     */
    updateUser: (
      state,
      action: PayloadAction<Partial<User>>,
    ) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const {
  loginSuccess,
  logout,
  setAuthLoading,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;