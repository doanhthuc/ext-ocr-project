import { useState } from 'react';

type UseMergeStateProps<T> = {
  value?: T;
  defaultValue?: T;
};

export function useMergeState<T>({
  value,
  defaultValue,
}: UseMergeStateProps<T>) {
  const [innerValue, setInnerValue] = useState(defaultValue);

  return [value ?? innerValue, setInnerValue] as const;
}
