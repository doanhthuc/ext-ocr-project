import { MaybePromise } from '@ocr-platform/shared';
import { useEffect, useRef } from 'react';

export function useEffectOnce(fn: () => MaybePromise<unknown>) {
  const isMounted = useRef(false);

  useEffect(() => {
    !isMounted.current && fn();
    isMounted.current = true;
  }, [fn]);
}
