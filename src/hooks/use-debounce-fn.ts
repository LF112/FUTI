import { useMemo } from 'react';

import _ from 'underscore';

import useLatest from '@/hooks/use-latest';
import useUnmount from '@/hooks/use-unmount';

type noop = (...args: any[]) => any;

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
}

const useDebounceFn = <T extends noop>(fn: T, options?: DebounceOptions) => {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  // 主要调整点：使用 _.debounce 并转换参数
  const debounced = useMemo(
    () =>
      _.debounce(
        (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
        wait,
        options?.leading, // Underscore 的第三个参数对应 leading 选项
      ),
    [wait, options?.leading], // 依赖项需包含实际使用的参数
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
  };
};

export default useDebounceFn;
