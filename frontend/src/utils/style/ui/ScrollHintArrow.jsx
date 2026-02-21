// ScrollHintArrow.jsx
import { useState, useRef, useEffect } from 'react';

export default function ScrollHintArrow({
  direction = 'horizontal',
  className = '',
}) {
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current?.parentElement;
    if (!el) return;

    const checkScroll = () => {
      if (direction === 'horizontal') {
        const hasOverflow = el.scrollWidth > el.clientWidth;
        const scrolledToEnd =
          el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
        setShowScrollHint(hasOverflow && !scrolledToEnd);
      } else {
        const hasOverflow = el.scrollHeight > el.clientHeight;
        const scrolledToBottom =
          el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        setShowScrollHint(hasOverflow && !scrolledToBottom);
      }
    };

    checkScroll();
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [direction]);

  if (!showScrollHint) return <span ref={scrollRef} className='hidden' />;

  const arrowPath =
    direction === 'horizontal' ? 'M9 5l7 7-7 7' : 'M19 9l-7 7-7-7';

  const positionClasses =
    direction === 'horizontal'
      ? 'absolute right-2 top-1/2 -translate-y-1/2'
      : 'absolute bottom-1 left-1/2 -translate-x-1/2';

  return (
    <>
      <span ref={scrollRef} className='hidden' />
      <div className={`${positionClasses} pointer-events-none ${className}`}>
        <svg
          className={`w-6 h-6 animate-bounce text-zinc-400 ${direction === 'vertical' ? 'w-4 h-4' : ''}`}
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d={arrowPath} />
        </svg>
      </div>
    </>
  );
}
