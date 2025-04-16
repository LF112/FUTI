import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import { DetroitBackground } from '@/components/page/background.tsx';
import { Footer } from '@/components/page/footer.tsx';
import { Header } from '@/components/page/header.tsx';

export const App: React.FC = () => {
  return (
    <ScrollArea className="futi-ui relative h-dvh w-dvw min-w-max overflow-hidden [&>[data-radix-scroll-area-viewport]>div]:!flex [&>[data-radix-scroll-area-viewport]>div]:h-full [&>[data-radix-scroll-area-viewport]>div]:flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <DetroitBackground />
      </main>
      <Footer />
    </ScrollArea>
  );
};
