import { useEffect, useState } from 'react';

const posterGridConfig = {
  sm: { base: 55, sm: 60, md: 65, lg: 70, xl: 80 },
  similarSection: { base: 85, sm: 90, md: 100, lg: 109, xl: 120 },
  md: { base: 90, sm: 100, md: 110, lg: 120, xl: 140 },
  lg: { base: 110, sm: 120, md: 135, lg: 150, xl: 180 },
  xl: { base: 140, sm: 160, md: 180, lg: 200, xl: 220 },
};

function resolveWidth(view, screenWidth) {
  const sizes = posterGridConfig[view] || posterGridConfig.sm;

  if (screenWidth >= 1280) return sizes.xl;
  if (screenWidth >= 1024) return sizes.lg;
  if (screenWidth >= 768) return sizes.md;
  if (screenWidth >= 640) return sizes.sm;
  return sizes.base;
}

export function usePosterGridWidth(view) {
  const [width, setWidth] = useState(() =>
    resolveWidth(view, window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setWidth(resolveWidth(view, window.innerWidth));

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [view]);

  return width;
}
