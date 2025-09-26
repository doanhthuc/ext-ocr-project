import type {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  UndefinedInitialDataInfiniteOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { BaseError } from '~/shared/types/error.type';

export type Pagination = {
  total: number;
  page: number;
  size: number;
};

export type QueryFunctionCtx = QueryFunctionContext<
  QueryKey,
  Pick<Pagination, 'page' | 'size'>
>;

export type QueryProps<
  Response,
  Input = null,
  OmittedProps = Omit<
    UseQueryOptions<Response, AxiosError>,
    'queryKey' | 'queryFn'
  >,
> = Input extends null ? OmittedProps : OmittedProps & Input;

export type InfiniteQueryProps<Response, Input = never> = Omit<
  UndefinedInitialDataInfiniteOptions<
    Response,
    BaseError,
    InfiniteData<Response>,
    QueryKey,
    Pick<Pagination, 'page' | 'size'>
  >,
  | 'queryKey'
  | 'queryFn'
  | 'getPreviousPageParam'
  | 'getNextPageParam'
  | 'initialPageParam'
> & {
  input: Input;
  initialPageParam?: Pick<Pagination, 'page' | 'size'>;
};

export type MutationProps<Response, Input = never> = Omit<
  UseMutationOptions<Response, AxiosError<BaseError>, Input>,
  'mutationFn'
>;
