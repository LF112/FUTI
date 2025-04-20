import { useMemo, useRef } from 'react';

type noop = (this: any, ...args: any[]) => any;

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>;

const useMemoizedFn = <T extends noop>(fn: T) => {
  const fnRef = useRef<T>(fn);

  fnRef.current = useMemo<T>(() => fn, [fn]);

  const memoizedFn = useRef<PickFunction<T>>(void 0);
  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args);
    };
  }

  return memoizedFn.current as PickFunction<T>;
};

export default useMemoizedFn;
