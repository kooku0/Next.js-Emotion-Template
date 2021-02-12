import React, { createContext, ReactChild, useContext, useEffect, useState } from 'react';

import { MOBILE_WIDTH } from '@/styles/theme';

export const IsMobileContext = createContext<boolean | null>(null);

export default function IsMobileContextComp({ children }: { children: ReactChild | ReactChild[] }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setIsMobile(global.innerWidth <= MOBILE_WIDTH);
    };

    window.addEventListener('resize', updateWindowDimensions);

    updateWindowDimensions();

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  return (
    <IsMobileContext.Provider value={isMobile}>
      {isMobile !== null && children}
    </IsMobileContext.Provider>
  );
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const isMobile = () => useContext(IsMobileContext);
