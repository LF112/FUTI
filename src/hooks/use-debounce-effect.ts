import { useEffect, useState } from 'react';

import type { DependencyList, EffectCallback } from 'react';

import useDebounceFn, { DebounceOptions } from '@/hooks/use-debounce-fn';
import useUpdateEffect from '@/hooks/use-update-effect';

const useDebounceEffect = (effect: EffectCallback, deps?: DependencyList, options?: DebounceOptions) => {
  const [flag, setFlag] = useState({});

  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => run(), deps);

  useUpdateEffect(effect, [flag]);
};

export default useDebounceEffect;
