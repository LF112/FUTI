import React from 'react';

import { motion } from 'motion/react';

import { Separator } from '@/components/ui/separator.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';

import { BasicsProps } from '@/components/type';

import { FutiIcon } from '@/assets/svg/futi.tsx';
import { cn } from '@/lib/utils.ts';

type IFooterProps = BasicsProps;

export const Footer: React.FC<IFooterProps> = ({ className, style }) => {
  return (
    <div className={cn('flex h-16 items-center gap-4 pl-6 max-sm:flex-col max-sm:pt-20 max-sm:pl-0', className)} style={style}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.a
            href="https://www.futiwolf.com"
            className={cn('futi-center font-russoOne text-opacity-15 relative cursor-pointer text-xs text-[#737373] select-none', className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1 } }}
            transition={{ duration: 0.2 }}
          >
            Drawn by NAVILAB
            <FutiIcon className="absolute h-7 [&>path]:fill-white/20" />
          </motion.a>
        </TooltipTrigger>
        <TooltipContent sideOffset={16}>Drawn by Navigator Kepler</TooltipContent>
      </Tooltip>

      <motion.div className="max-sm:!hidden" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.1 } }} transition={{ duration: 0.2 }}>
        <Separator orientation="vertical" className="!h-8 bg-white/20" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1.2 } }} transition={{ duration: 0.2 }}>
        <Separator className="futi-footer-line mb-0.5 h-[3px] rounded bg-transparent max-sm:my-2" />
        <div className="flex gap-1 space-x-1 text-xs select-none max-sm:flex-col max-sm:items-center max-sm:gap-2 max-sm:pb-6 [&_a]:cursor-pointer [&_a]:font-bold [&_a]:text-white/30 [&_p]:text-white/20">
          <p>
            Copyright &copy; 2017 - {new Date().getFullYear()}
            <Tooltip>
              <TooltipTrigger asChild>
                <a className="mx-1" href="https://www.lf112.net">
                  LF112
                </a>
              </TooltipTrigger>
              <TooltipContent sideOffset={16}>🙃 Independent Websites Developer</TooltipContent>
            </Tooltip>
            All rights reserved.
          </p>
          <p className="max-sm:hidden">/</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="https://github.com/LF112/FUTI" target="_blank" rel="noreferrer">
                Github Open Source
              </a>
            </TooltipTrigger>
            <TooltipContent sideOffset={16}>AGPL-3.0</TooltipContent>
          </Tooltip>
        </div>
      </motion.div>
    </div>
  );
};
