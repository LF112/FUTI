import React from 'react';

import { motion, MotionProps } from 'motion/react';

import { Separator } from '@/components/ui/separator.tsx';

import { BasicsProps } from '@/components/type.ts';

import { cn } from '@/lib/utils';

type INameProps = BasicsProps & MotionProps;

export const Name: React.FC<INameProps> = ({ className, style, ...rest }) => (
  <motion.div className={cn('flex h-12 flex-col justify-center gap-2', className)} style={style} {...rest}>
    <h1 className="font-kanit !m-0 my-0 px-4 !text-3xl font-light text-white/90">
      Hi, I&apos;m <span className="font-normal text-white/90">LF112</span>
    </h1>
    <Separator className="futi-profile-line !h-[3px] w-full rounded shadow" />
  </motion.div>
);
