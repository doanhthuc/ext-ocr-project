/**
 * JWT Storage Service
 * Manages JWT tokens in localStorage with in-memory caching
 */

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ID_KEY = 'user_id';

export const jwtStorageService = (function () {
  // In-memory cache for better performance
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  let userId: string | null = null;

  /**
   * Get access token from memory or localStorage
   */
  const getAccessToken = (): string | null => {
    if (accessToken) return accessToken;

    // Try to get from localStorage if not in memory
    try {
      accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      return accessToken;
    } catch (error) {
      console.error('Failed to get access token from localStorage:', error);
      return null;
    }
  };

  /**
   * Set access token in memory and localStorage
   */
  const setAccessToken = (token: string): void => {
    accessToken = token;
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save access token to localStorage:', error);
    }
  };

  /**
   * Get refresh token from memory or localStorage
   */
  const getRefreshToken = (): string | null => {
    if (refreshToken) return refreshToken;

    // Try to get from localStorage if not in memory
    try {
      refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      return refreshToken;
    } catch (error) {
      console.error('Failed to get refresh token from localStorage:', error);
      return null;
    }
  };

  /**
   * Set refresh token in memory and localStorage
   */
  const setRefreshToken = (token: string): void => {
    refreshToken = token;
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save refresh token to localStorage:', error);
    }
  };

  /**
   * Get user ID from memory or localStorage
   */
  const getUserId = (): string | null => {
    if (userId) return userId;

    // Try to get from localStorage if not in memory
    try {
      userId = localStorage.getItem(USER_ID_KEY);
      return userId;
    } catch (error) {
      console.error('Failed to get user ID from localStorage:', error);
      return null;
    }
  };

  /**
   * Set user ID in memory and localStorage
   */
  const setUserId = (id: string): void => {
    userId = id;
    try {
      localStorage.setItem(USER_ID_KEY, id);
    } catch (error) {
      console.error('Failed to save user ID to localStorage:', error);
    }
  };

  /**
   * Set all tokens and user ID at once (typically after login)
   */
  const setTokens = (tokens: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  }): void => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    setUserId(tokens.userId);
  };

  /**
   * Clear all tokens and user ID from memory and localStorage
   */
  const clearTokens = (): void => {
    accessToken = null;
    refreshToken = null;
    userId = null;

    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
    } catch (error) {
      console.error('Failed to clear tokens from localStorage:', error);
    }
  };

  /**
   * Check if user is authenticated (has valid access token)
   */
  const isAuthenticated = (): boolean => {
    const token = getAccessToken();
    return token !== null && token.length > 0;
  };

  return {
    getAccessToken,
    getRefreshToken,
    getUserId,
    setAccessToken,
    setRefreshToken,
    setUserId,
    setTokens,
    clearTokens,
    isAuthenticated,
  };
})();

// Legacy export for backwards compatibility
export const jwtStorage = {
  get: jwtStorageService.getAccessToken,
  set: jwtStorageService.setAccessToken,
  clear: jwtStorageService.clearTokens,
};
