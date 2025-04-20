/* eslint-disable react-refresh/only-export-components,react-compiler/react-compiler */
import React, { lazy, Suspense, useEffect, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Loading } from '@/components/ui/loading';

import { BasicsProps } from '@/components/type.ts';

import useEventEmitter, { EventEmitter } from '@/hooks/use-event-emitter.ts';
import useExternal from '@/hooks/use-external.ts';

const Live2DCore = lazy(() => import('./core.tsx'));

export enum Live2DEvent {
  INIT = 'init',
  SHOW = 'show',
}

type ILive2DProps = BasicsProps & {
  event$?: EventEmitter<Live2DEvent>;
};

export const Live2D: React.FC<ILive2DProps> = ({ event$ }) => {
  const cubismSDKStatus = useExternal('/live2d/live2dcubismcore.min.js', {
    js: {
      async: true,
    },
  });

  const [cubismSdkInit, setCubismSdkInit] = useState(false);
  useEffect(() => {
    if (cubismSDKStatus === 'ready') {
      setCubismSdkInit(true);
    }
  }, [cubismSDKStatus]);

  const [init, setInit] = useState(false);
  const live2dEvent$ = useEventEmitter<Live2DEvent>();
  live2dEvent$.useSubscription((target) => {
    switch (target) {
      case Live2DEvent.INIT: {
        setInit(true);
        event$?.emit(Live2DEvent.INIT);
        break;
      }
    }
  });

  return (
    <div className="relative size-64">
      <AnimatePresence>
        {!init && (
          <Loading
            key="futi-live2d-loading"
            className="absolute top-4 right-4 size-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
        <Suspense fallback={null}>
          {cubismSdkInit && (
            <Live2DCore
              key="futi-live2d"
              className="size-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: init ? 1 : 0, transition: { delay: 0.2 } }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() => event$?.emit(Live2DEvent.SHOW)}
              event$={live2dEvent$}
            />
          )}
        </Suspense>
      </AnimatePresence>
    </div>
  );
};
