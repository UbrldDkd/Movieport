import { useEffect, useState, useRef } from 'react';

export default function WatchedPercentage({ watchedCount, totalCount }) {
  const percentage = totalCount
    ? Math.round((watchedCount / totalCount) * 100)
    : 0;

  const [animatedPercent, setAnimatedPercent] = useState(0);
  const requestRef = useRef();

  useEffect(() => {
    const duration = 500; // total animation duration in ms
    const startTime = performance.now();
    const startValue = animatedPercent;
    const endValue = percentage;

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 → 1
      const value = Math.round(startValue + (endValue - startValue) * progress);
      setAnimatedPercent(value);

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [percentage, animatedPercent]);

  return (
    <div className='bg-zinc-800/80 border border-zinc-700 rounded-sm p-2.5 pointer-events-none'>
      <div className='text-xs text-zinc-400 '>YOU HAVE WATCHED</div>
      <div className='text-2xl font-semibold'>{animatedPercent}%</div>

      <div className='text-xs text-zinc-400 my-1'>
        {watchedCount} of {totalCount} titles
      </div>

      {/* Progress bar */}
      <div className='w-full h-0.5 bg-zinc-700/90 rounded-full overflow-hidden'>
        <div
          className='h-full bg-red-950 transition-none'
          style={{ width: `${animatedPercent}%` }}
        />
      </div>
    </div>
  );
}
