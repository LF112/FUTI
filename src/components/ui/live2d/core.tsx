'use client';
import React from 'react';

import { motion, MotionProps } from 'motion/react';
import { Application, Ticker } from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display/cubism4';

import { Live2DEvent } from '@/components/ui/live2d/index.tsx';

import { BasicsProps } from '@/components/type.ts';

import useAsyncEffect from '@/hooks/use-async-effect.ts';
import { EventEmitter } from '@/hooks/use-event-emitter.ts';

Live2DModel.registerTicker(Ticker);

type ILive2DCoreProps = BasicsProps<'canvas'> &
  MotionProps & {
    event$?: EventEmitter<Live2DEvent>;
  };

const Live2DCore: React.FC<ILive2DCoreProps> = ({ event$, ...rest }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useAsyncEffect(async () => {
    if (canvasRef.current) {
      const pixiApp = new Application({
        view: canvasRef.current,
        resizeTo: canvasRef.current,
        backgroundAlpha: 0,
        resolution: 2,
        antialias: true,
      });

      const model = await Live2DModel.from('/live2d/futiwolf/futi.model3.json', { autoInteract: false });

      model.scale.set(0.125);

      model.position.x = -70;
      model.position.y = 10;
      model.anchor.set(0, 0);

      pixiApp.stage.addChild(model);

      event$?.emit(Live2DEvent.INIT);
    }
  }, []);

  return <motion.canvas ref={canvasRef} {...rest} />;
};

export default Live2DCore;
