import { useRef, useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import ContentCard from './ContentCard/ContentCard.jsx';
import PosterStats from './Common/PosterStats/PosterStats.jsx';
import { Keys } from '../../utils/constants/Keys.js';

export default function ContentDisplayX({
  content,
  view = 'lg',
  includeStats = false,
}) {
  const { API1 } = Keys;
  const { details } = API1;

  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // update arrow state
  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
  }, [content]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;

    const firstItem = el.firstChild;
    const itemWidth = firstItem?.offsetWidth || 150;
    const gap = 10; // approximate gap matching md:space-x-2.5
    const visibleCount = Math.floor(el.clientWidth / (itemWidth + gap)) || 1;

    el.scrollBy({
      left: dir * visibleCount * (itemWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <div className='relative w-full'>
      {/* LEFT ARROW */}
      <button
        onClick={() => scroll(-1)}
        disabled={!canLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 ${
          canLeft ? 'opacity-100' : 'opacity-30 pointer-events-none'
        }`}
      >
        <FiChevronLeft className='text-3xl text-zinc-200' />
      </button>

      {/* TRACK */}
      <div
        ref={trackRef}
        onScroll={updateArrows}
        className='flex space-x-2.5 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2 md:px-6'
      >
        {content?.map((item) => (
          <div key={item[details.id]} className='snap-start flex-shrink-0 '>
            <ContentCard item={item} view={view} />
            {includeStats && <PosterStats />}
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll(1)}
        disabled={!canRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 ${
          canRight ? 'opacity-100' : 'opacity-30 pointer-events-none'
        }`}
      >
        <FiChevronRight className='text-3xl text-zinc-200' />
      </button>
    </div>
  );
}
