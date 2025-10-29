import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import type { ApiError } from '~shared/api/types/api.types';

import { jwtStorageService } from '~/auth/services/jwt-storage.service';

const API_ENDPOINT =
  import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api';

// Create axios instance with case conversion
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = jwtStorageService.getAccessToken();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - Token refresh logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = jwtStorageService.getRefreshToken();
        const userId = jwtStorageService.getUserId();

        if (refreshToken && userId) {
          // Try to refresh the token
          const response = await axios.post(`${API_ENDPOINT}/auth/refresh`, {
            userId,
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          // Update tokens
          jwtStorageService.setAccessToken(accessToken);
          jwtStorageService.setRefreshToken(newRefreshToken);

          // Retry the original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }

          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        jwtStorageService.clearTokens();
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    // Format error for consistent error handling
    const apiError: ApiError = {
      statusCode: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred',
      error: error.response?.data?.error,
    };

    return Promise.reject(apiError);
  }
);

export { axiosInstance as apiClient };
export type { ApiError };
