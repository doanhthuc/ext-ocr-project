import { keepPreviousData, UseQueryResult } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { AxiosError } from 'axios';

import { QueryProps } from '~shared/types/query.type';

type BaseInput = { body: { page: number; size: number } };

type OmitPagination<T extends BaseInput> = Omit<T, 'body'> &
  (keyof Omit<T['body'], 'page' | 'size'> extends never
    ? { body?: undefined }
    : { body?: Omit<T['body'], 'page' | 'size'> });

export function usePaginationQuery<Response, Input extends BaseInput>(
  useQueryHook: (
    opts: QueryProps<Response, Input>
  ) => UseQueryResult<Response, AxiosError>,
  options: OmitPagination<Input> = {} as OmitPagination<Input>
) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const page = Number((search as Record<string, unknown>)?.page) || 1;
  const size = Number((search as Record<string, unknown>)?.size) || 10;

  const setPagination = (page: number, size: number) => {
    // NOTE: Unsure why we need to cast the type to `never`. Should investigate in the future.
    navigate({
      search: ((prev: Record<string, unknown>) => ({
        ...prev,
        page,
        size,
      })) as never,
    });
  };

  return [
    useQueryHook({
      placeholderData: keepPreviousData,
      ...options,
      body: { ...options.body, page: page - 1, size },
    } as QueryProps<Response, Input>),
    { page, size, setPagination },
  ] as const;
}
