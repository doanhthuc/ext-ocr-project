import { apiClient } from '@mobile/lib/api-client';
import { useQuery } from '@tanstack/react-query';

export type HelloResponse = {
  message: string;
};

const fallbackResponse: HelloResponse = {
  message: 'Everything is ready to go!'
};

async function fetchHelloMessage(): Promise<HelloResponse> {
  try {
    const { data } = await apiClient.get<HelloResponse>('/health');
    return data;
  } catch (_error) {
    return fallbackResponse;
  }
}

export function useHelloQuery() {
  return useQuery({
    queryKey: ['hello'],
    queryFn: fetchHelloMessage,
    staleTime: 60 * 1000
  });
}
