// src/api/interceptors.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './client';
import { AUTH } from './endpoints';

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await apiClient.post(AUTH.REFRESH_TOKEN, { refreshToken });
        const { accessToken: newAccess, refreshToken: newRefresh } = data;

        await AsyncStorage.setItem('accessToken', newAccess);
        if (newRefresh) {
          await AsyncStorage.setItem('refreshToken', newRefresh);
        }

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
