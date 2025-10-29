/**
 * Users API Service
 * All user-related API calls
 */

import type { UpdateUserDto, UserProfile } from '~/users/types';

import { apiClient } from '~shared/api/client/api-client';
import { API_PATHS } from '~shared/api/constants/api-paths';

export const usersApiService = {
  /**
   * Get current user profile
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>(API_PATHS.USERS.PROFILE);
    return response.data;
  },

  /**
   * Update current user profile
   */
  updateProfile: async (data: UpdateUserDto): Promise<UserProfile> => {
    const response = await apiClient.put<UserProfile>(
      API_PATHS.USERS.PROFILE,
      data
    );
    return response.data;
  },
};
