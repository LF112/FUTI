import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { FUTIDynamicText } from '@/components/ui/dynamic-text';

import { TextDeveloper, TextDeveloperEvent } from '@/components/page/profile/introduction/description/text-developer.tsx';
import { BasicsProps } from '@/components/type.ts';

import useEventEmitter from '@/hooks/use-event-emitter.ts';
import { cn } from '@/lib/utils';

type IDescriptionProps = BasicsProps;

export const Description: React.FC<IDescriptionProps> = ({ className, style }) => {
  const [inAnimation, setInAnimation] = useState<boolean>(true);

  const typingEvent$ = useEventEmitter<TextDeveloperEvent>();

  return (
    <div className={cn('flex h-7 min-w-[245.47px] items-center gap-1 after:-ml-2 [&>h2]:text-lg [&>h2]:text-white/80', inAnimation && 'futi-cursor', className)} style={style}>
      <FUTIDynamicText className="font-ubuntu !leading-none" as={motion.h2} onAnimationComplete={() => typingEvent$.emit(TextDeveloperEvent.START)}>
        A Full Stack
      </FUTIDynamicText>
      <TextDeveloper event$={typingEvent$} onAnimationComplete={() => setInAnimation(false)} />
    </div>
  );
};
