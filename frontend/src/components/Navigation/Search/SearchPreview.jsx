import { Keys } from '../../../utils/Keys.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function SearchPreview({
  content,
  isLoading,
  error,
  value,
  isOpen,
  setIsOpen,
}) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { details } = Keys.API1;

  const [loadedCount, setLoadedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const displayCount = isMobile ? 4 : 6;
  const items = Array.isArray(content) ? content.slice(0, displayCount) : [];
  const expectedImages = items.filter((i) => i?.[details.poster]).length;
  const showMore = !isLoading && items.length && loadedCount >= expectedImages;

  const handleExpand = () => {
    navigate(`/search/${encodeURIComponent(value)}`);
    setIsOpen('searchPreview', false);
  };

  const handleImgLoad = () => setLoadedCount((c) => c + 1);

  // Mobile resize
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Reset loaded count when search changes
  useEffect(() => setLoadedCount(0), [value, isLoading, content]);

  // Auto open/close
  useEffect(
    () => setIsOpen('searchPreview', value.trim() !== ''),
    [value, setIsOpen]
  );

  // Click outside to close
  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target))
        setIsOpen('searchPreview', false);
    };
    if (isOpen) document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen, setIsOpen]);

  if (error)
    return (
      <div className='w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg'>
        Something went wrong: {error.message || 'Unknown error'}
      </div>
    );
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className='rounded-md mt-2 bg-zinc-950/90 scrollbar-hide transition-all duration-200 backdrop-blur-3xl shadow-lg inline-block p-2 w-[calc(100vw-2rem)] max-w-[280px] md:w-[320px] relative'
    >
      <div
        className={`transition-opacity duration-300 ${!isLoading && items.length ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {items.map((item, idx) => {
          const id = item?.[details.id];
          const isMovie = !!item?.[details.movieTitle];
          const title =
            item?.[details.movieTitle] || item?.[details.tvTitle] || 'Untitled';
          const poster = item?.[details.poster];
          const rating = item?.[details.rating];

          return (
            <Link
              key={id ?? `placeholder-${idx}`}
              to={id ? `/watch/${isMovie ? 'movie' : 'tv'}/${id}` : '#'}
              className='block'
              onClick={() => setIsOpen('searchPreview', false)}
            >
              <div className='inline-flex gap-2 p-1.5 md:p-2 w-full hover:bg-zinc-800 rounded transition-colors duration-200'>
                {poster ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${poster}`}
                    alt={title}
                    className='w-12 h-18 md:w-16 md:h-24 object-cover rounded shrink-0'
                    onLoad={handleImgLoad}
                    onError={handleImgLoad}
                  />
                ) : (
                  <div
                    className='w-12 h-18 md:w-16 md:h-24 bg-zinc-700 rounded shrink-0'
                    role='img'
                    aria-label='No poster'
                    onLoad={handleImgLoad}
                    onError={handleImgLoad}
                  />
                )}
                <div className='flex flex-col gap-1 md:gap-2 flex-1 min-w-0'>
                  <p className='font-semibold text-zinc-300 leading-snug text-xs md:text-sm truncate'>
                    {title}
                  </p>
                  <div className='flex justify-between items-center'>
                    <p className='text-zinc-400 text-xs md:text-sm'>
                      {isMovie ? 'Movie' : 'TV Show'}
                    </p>
                    <p className='text-xs md:text-sm text-zinc-300'>
                      {typeof rating === 'number' ? rating.toFixed(1) : '—'}/10
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {showMore && (
          <div className='mt-2 text-center w-full'>
            <button
              onClick={handleExpand}
              className='text-zinc-300 hover:text-zinc-100 text-xs md:text-sm cursor-pointer bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors duration-200'
            >
              See more results
            </button>
          </div>
        )}
      </div>

      {!isLoading && !items.length && (
        <div className='w-full h-20 md:h-30 flex items-center justify-center text-zinc-400 text-xs md:text-sm'>
          No results yet.
        </div>
      )}
    </div>
  );
}
