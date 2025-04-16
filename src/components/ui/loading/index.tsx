import React from 'react';

import { DOMMotionComponents, motion, MotionProps } from 'framer-motion';

import { AsComp, BasicsProps } from '@/components/type.ts';

import { cn } from '@/lib/utils';

type ILoadingProps = BasicsProps &
  MotionProps & {
    insideClassName?: string;
    as?: AsComp;
  };

export const Loading: React.FC<ILoadingProps> = ({ className, insideClassName, style, as: Element = motion.div, ...rest }) => {
  Element = Element as DOMMotionComponents['div'];
  return (
    <Element className={cn('relative size-10 animate-spin rounded-full border-[3px] border-transparent border-t-[#0da7e9]', className)} style={style ?? {}} {...rest}>
      <div className={cn('absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#6e6e6e]/55 border-r-[#6e6e6e]/55', insideClassName)} />
    </Element>
  );
};
