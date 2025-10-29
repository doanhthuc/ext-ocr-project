import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import BG_AUTH from '~/assets/images/bg-auth.svg';

import { FeatureBadge } from './FeatureBadge';

const FEATURES = [
  'No upfront cost',
  'Fast setup',
  'Pay–as–you–go pricing plan',
  'Data security guaranteed',
];

const TRANSITION_DURATION = 3000; // 3 seconds

export function AuthBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % FEATURES.length);
    }, TRANSITION_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="rounded-xl overflow-hidden max-h-full w-fit relative">
        <img
          src={BG_AUTH}
          className="w-fit object-contain h-full"
          alt="auth-banner-background"
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            >
              <FeatureBadge value={FEATURES[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
