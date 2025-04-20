import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { buttonVariants } from '@/components/ui/button.tsx';

import { LINKS } from '@/components/page/profile/introduction/links/consts.tsx';
import { BasicsProps } from '@/components/type.ts';

import { cn } from '@/lib/utils';

type ILinksProps = BasicsProps;

export const Links: React.FC<ILinksProps> = ({ className, style }) => (
  <AnimatePresence>
    <motion.div
      className={cn('flex gap-4 max-sm:gap-1', className)}
      style={style}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2, staggerChildren: 0.1, delayChildren: 0.6 } },
      }}
      initial="hidden"
      animate="visible"
    >
      {LINKS.map(({ Icon, href, label }, i) => (
        <motion.a
          key={i}
          href={href}
          target="_blank"
          className={cn(buttonVariants({ variant: 'ghost' }), 'group hover:!bg-accent/20 cursor-pointer text-base font-bold text-[#ecf6ff]/85 hover:text-white max-sm:px-2')}
          rel="noreferrer"
          variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
        >
          <Icon className="size-4 fill-[#ecf6ff] stroke-[#ecf6ff]/85" />
          {label}
        </motion.a>
      ))}
    </motion.div>
  </AnimatePresence>
);
