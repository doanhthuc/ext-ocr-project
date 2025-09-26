const ACCESS_TOKEN_KEY = 'access_token';

export const jwtStorage = (function () {
  let accessToken: string | null = null;

  const get = () => {
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

  const set = (token: string) => {
    accessToken = token;
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to save access token to localStorage:', error);
    }
  };

  const clear = () => {
    accessToken = null;
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to clear access token from localStorage:', error);
    }
  };

  return { set, get, clear };
})();
