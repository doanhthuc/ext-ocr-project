export type Maybe<T> = T | undefined;
export type MaybePromise<T> = T | Promise<T>;

export type Id = string | number;

export type Dict<T> = Record<string, T>;

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
