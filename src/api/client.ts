// src/api/client.ts
// ─────────────────────────────────────────────────────────────────────────────
// Axios instance with base URL, timeout, and interceptors wired up.
// Set REACT_APP_API_BASE_URL in your .env file before connecting to a real server.
// ─────────────────────────────────────────────────────────────────────────────
import axios from 'axios';

// TODO: move to src/config/env.ts once backend URL is confirmed
const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? 'https://api.imb360.app/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request interceptor — attach auth token ──────────────────────────────────
apiClient.interceptors.request.use(
  async config => {
    // TODO: read token from react-native-keychain once auth is live
    // const credentials = await Keychain.getGenericPassword();
    // if (credentials) {
    //   config.headers.Authorization = `Bearer ${credentials.password}`;
    // }
    return config;
  },
  error => Promise.reject(error),
);

// ── Response interceptor — centralised error handling ────────────────────────
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // TODO: dispatch(logout()) and redirect to Login when 401 comes back
      // store.dispatch(logout());
    }
    return Promise.reject(error);
  },
);

export default apiClient;
