import React from 'react';

import { motion, MotionProps } from 'framer-motion';

import { BasicsProps } from '@/components/type.ts';

import { cn } from '@/lib/utils';

type IProfileWrapperProps = BasicsProps<'div', 'children'> & MotionProps;

export const ProfileWrapper: React.FC<IProfileWrapperProps> = ({ children, className, style, ...rest }) => (
  <motion.div className={cn('relative', className)} style={style} {...rest}>
    {children}
    <div className="absolute top-0 flex size-full justify-between before:absolute before:top-0 before:left-0 before:z-10 before:size-12 before:rounded before:border-t-4 before:border-l-4 before:border-[#0295e5]/85 after:absolute after:top-0 after:right-0 after:z-10 after:size-12 after:rounded after:border-t-4 after:border-r-4 after:border-[#0295e5]/85">
      <div className="z-0 my-4 h-[calc(100%-2rem)] w-[3.5px] bg-[#6e6e6e]/55" />
      <div className="z-0 my-4 h-[calc(100%-2rem)] w-[3.5px] bg-[#6e6e6e]/55" />
      <div className="absolute bottom-12 w-full before:absolute before:top-0 before:left-0 before:z-10 before:size-12 before:rounded before:border-b-4 before:border-l-4 before:border-[#0295e5]/85 after:absolute after:top-0 after:right-0 after:z-10 after:size-12 after:rounded after:border-r-4 after:border-b-4 after:border-[#0295e5]/85" />
    </div>
  </motion.div>
);
