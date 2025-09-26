import {
  useInfiniteQuery as useTanstackInfiniteQuery,
  UseInfiniteQueryOptions,
  InfiniteData,
} from '@tanstack/react-query';

type PaginationParams = { page: number; size: number };

type UseInfiniteQueryProps<Response extends { count: number }> = Omit<
  UseInfiniteQueryOptions<
    Response,
    Error,
    InfiniteData<Response, PaginationParams>,
    Array<unknown>,
    { page: number; size: number }
  >,
  'initialPageParam' | 'getNextPageParam' | 'getPreviousPageParam'
>;

export function useInfiniteQuery<Response extends { count: number }>(
  props: UseInfiniteQueryProps<Response>
) {
  return useTanstackInfiniteQuery({
    ...props,
    initialPageParam: { page: 0, size: 10 },
    getNextPageParam: ({ count }, _allPages, { page, size }) => {
      const totalPages = Math.ceil(count / size);
      return { page: Math.min(page + 1, totalPages), size };
    },
    getPreviousPageParam: (_lastPage, _allPages, { page, size }) => {
      return { page: Math.max(page - 1, 0), size };
    },
  });
}
