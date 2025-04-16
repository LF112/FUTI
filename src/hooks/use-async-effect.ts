import { useEffect } from 'react';

import type { DependencyList } from 'react';

const isAsyncGenerator = (val: AsyncGenerator<void, void, void> | Promise<void>): val is AsyncGenerator<void, void, void> => {
  return val && typeof val === 'object' && Symbol.asyncIterator in val;
};

const useAsyncEffect = (effect: () => AsyncGenerator<void, void, void> | Promise<void>, deps?: DependencyList) => {
  useEffect(() => {
    const e = effect();
    let cancelled = false;
    const execute = async () => {
      if (isAsyncGenerator(e)) {
        while (true) {
          const result = await e.next();
          if (result.done || cancelled) {
            break;
          }
        }
      } else {
        await e;
      }
    };
    execute();
    return () => {
      cancelled = true;
    };
  }, deps);
};

export default useAsyncEffect;
