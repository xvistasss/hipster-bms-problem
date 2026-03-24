// Purpose:
// - Axios API interceptor request
// - Mananging Bearer Token in localStorage & using it to send requests
// - Implemented Retry mechanism by handling token refresh silently by calling the auth API in background

import axios from 'axios';
import { authService } from './authServices';
import { loggerService } from './loggerServices';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = 'https://dev.natureland.hipster-virtual.com/api/v1/';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise = null;

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = authService.login();
        }

        const newToken = await refreshPromise;
        refreshPromise = null;

        useAuthStore.getState().setToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (authError) {
        refreshPromise = null;
        loggerService.error('Token refresh failed', {
          error: authError.message,
        });

        useAuthStore.getState().clearToken();

        return Promise.reject(authError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
