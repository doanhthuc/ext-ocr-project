/**
 * Users Hooks
 * TanStack Query hooks for user operations
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { UpdateUserDto, UserProfile } from '~/users/types';
import type { ApiError } from '~shared/api/client/api-client';

import { usersApiService } from '~/users/services/users-api.service';
import { QUERY_KEYS } from '~shared/api/constants/query-keys';

/**
 * Get User Profile Query
 */
export function useUserProfile(
  options?: UseQueryOptions<UserProfile, ApiError>
) {
  return useQuery<UserProfile, ApiError>({
    queryKey: QUERY_KEYS.USERS.PROFILE,
    queryFn: usersApiService.getProfile,
    ...options,
  });
}

/**
 * Update User Profile Mutation
 */
export function useUpdateUserProfile(
  options?: UseMutationOptions<UserProfile, ApiError, UpdateUserDto>
) {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, ApiError, UpdateUserDto>({
    mutationFn: usersApiService.updateProfile,
    onSuccess: data => {
      // Invalidate and refetch user profile
      queryClient.setQueryData(QUERY_KEYS.USERS.PROFILE, data);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.PROFILE });
    },
    ...options,
  });
}
