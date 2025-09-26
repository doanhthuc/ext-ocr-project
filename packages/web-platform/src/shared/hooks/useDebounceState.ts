import { isFunction } from 'lodash-es';
import { useDebounceValue } from 'usehooks-ts';

import { DEBOUNCE_DELAY } from '~config/app.config';

export function useDebounceState<T>(initialValue?: T | (() => T)) {
  const defaultValue = isFunction(initialValue) ? initialValue() : initialValue;
  return useDebounceValue(defaultValue, DEBOUNCE_DELAY);
}
