import { useQuery } from '@tanstack/react-query';

import { authClient as client } from '~/auth/services/client.service';
import { UserResponse } from '~/auth/types/auth.type';
import { API_ENDPOINT } from '~shared/constants/api.constant';
import { QueryProps } from '~shared/types/query.type';

export type GetMeResponse = UserResponse;
export type UseGetMeProps = QueryProps<GetMeResponse>;

export const genGetMeKey = () => ['GET', API_ENDPOINT.GET_ME];

export async function getMe(): Promise<GetMeResponse> {
  const { data } = await client<GetMeResponse>({
    method: 'GET',
    url: API_ENDPOINT.GET_ME,
  });

  return data;
}

export function useGetMe(options: UseGetMeProps = {}) {
  return useQuery({
    queryKey: genGetMeKey(),
    queryFn: () => getMe(),
    ...options,
  });
}
