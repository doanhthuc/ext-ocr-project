import { BREAKPOINTS } from '@ocr-platform/shared';
import { useEffect, useState } from 'react';

const BREAKPOINT = {
  Mobile: BREAKPOINTS.md,
  Tablet: BREAKPOINTS.lg,
};

export function useResponsive() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= BREAKPOINT.Mobile;
  const isTablet = BREAKPOINT.Mobile < width && width <= BREAKPOINT.Tablet;
  const isDesktop = BREAKPOINT.Tablet < width;

  return { isMobile, isTablet, isDesktop };
}
