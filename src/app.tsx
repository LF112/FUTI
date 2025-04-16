import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import { Header } from '@/components/page/header.tsx';

export const App: React.FC = () => {
  return (
    <ScrollArea className="futi-ui h-dvh w-dvw min-w-max [&>[data-radix-scroll-area-viewport]>div]:!flex [&>[data-radix-scroll-area-viewport]>div]:h-full [&>[data-radix-scroll-area-viewport]>div]:flex-col">
      <Header />
    </ScrollArea>
  );
};
