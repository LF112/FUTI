import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { ScrollArea } from '@/components/ui/scroll-area';

import { DetroitBackground } from '@/components/page/background.tsx';
import { Footer } from '@/components/page/footer.tsx';
import { Header } from '@/components/page/header.tsx';
import { Description } from '@/components/page/profile/introduction/description';
import { Links } from '@/components/page/profile/introduction/links';
import { Name } from '@/components/page/profile/introduction/name.tsx';
import { ProfileWrapper } from '@/components/page/profile/wrapper.tsx';

import profileImage from '@/assets/webp/futiwolf.webp';

export const App: React.FC = () => {
  const [profileImageVisible] = useState(true);
  const [nameVisible, setNameVisible] = useState(false);

  return (
    <ScrollArea className="futi-ui relative h-dvh w-dvw min-w-max overflow-hidden [&>[data-radix-scroll-area-viewport]>div]:!flex [&>[data-radix-scroll-area-viewport]>div]:h-full [&>[data-radix-scroll-area-viewport]>div]:flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <DetroitBackground />
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
          <ProfileWrapper
            className="futi-center relative overflow-hidden"
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: 1, width: 256, height: 256 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence>
              {profileImageVisible && (
                <motion.div key="futi-profile-image" className="absolute top-0 left-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <img src={profileImage} alt="futiwolf,LF112" className="size-64" />
                </motion.div>
              )}
            </AnimatePresence>
          </ProfileWrapper>
          <Name initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }} transition={{ duration: 0.2 }} onAnimationComplete={() => setNameVisible(true)} />
          <div className="h-7">{nameVisible && <Description />}</div>
          <Links />
        </div>
      </main>
      <Footer />
    </ScrollArea>
  );
};
