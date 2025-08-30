import { Keys } from '../../Keys.js';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useMemo } from 'react';

export default function SearchPreview({ content, isLoading, error, value, isOpen, setIsOpen }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { API1 } = Keys;
  const { details } = API1;

  const ITEMS_TO_SHOW = 6;

  // Memoize the items to display (limit to first 6)
  const items = useMemo(() => (Array.isArray(content) ? content.slice(0, ITEMS_TO_SHOW) : []), [content]);
  const hasResults = items.length > 0;

  // Track loaded images to decide when to show the "View more" button
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesExpected = useMemo(() => items.filter(it => it && it[details?.poster]).length, [items, details?.poster]);

  useEffect(() => {
    setImagesLoaded(0);
  }, [value, isLoading, content]);

  function onImgDone() {
    setImagesLoaded(prev => prev + 1);
  }

  const showViewMore = !isLoading && hasResults && imagesLoaded >= imagesExpected;

  function handleExpand() {
    navigate(`/search/${encodeURIComponent(value)}`);
    setIsOpen(false);
  }

  // Click outside dropdown to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  // Automatically open/close based on input value
  useEffect(() => {
    setIsOpen(value.trim() !== '');
  }, [value, setIsOpen]);

  if (error) {
    return (
      <div className="w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg">
        Something went wrong: {error.message || 'Unknown error'}
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="bg-zinc-900 rounded-md mt-3 shadow-lg inline-block p-2 animate-fade-in-up w-[320px] relative"
    >
      

      {/* Search results */}
      <div
        className={`transition-opacity duration-300 ${
          !isLoading && hasResults ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {items.map((item, index) => {
          const id = item?.[details.id];
          const isMovie = !!item?.[details.title];
          const title = item?.[details.title] || item?.[details.titleTv] || 'Untitled';
          const posterPath = item?.[details.poster];
          const rating = item?.[details.rating];

          return (
            <Link
              key={id ?? `placeholder-${index}`}
              to={id ? `/watch/${isMovie ? 'movie' : 'tv'}/${id}` : '#'}
              className="block"
              onClick={() => setIsOpen(false)}
            >
              <div className="inline-flex gap-2 p-2 w-full">
                {posterPath ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${posterPath}`}
                    alt={title}
                    className="w-16 h-24 object-cover rounded flex-shrink-0"
                    onLoad={onImgDone}
                    onError={onImgDone}
                  />
                ) : (
                  <div
                    className="w-16 h-24 bg-zinc-700 rounded flex-shrink-0"
                    role="img"
                    aria-label="No poster"
                    onLoad={onImgDone}
                    onError={onImgDone}
                  />
                )}

                <div className="flex flex-col gap-2 w-[24ch]">
                  <p className="font-semibold text-zinc-300 leading-snug text-sm truncate">{title}</p>
                  <p className="text-zinc-400 text-sm">{isMovie ? 'Movie' : 'Tv-show'}</p>
                  <p className="text-sm text-zinc-300 mt-auto text-right">
                    {typeof rating === 'number' ? rating.toFixed(1) : '—'}/10
                  </p>
                </div>
              </div>
            </Link>
          );
        })}

        {/* View more button */}
        {showViewMore && (
          <div className="mt-2 text-center my-2 w-full">
            <button
              onClick={handleExpand}
              className="text-zinc-300 hover:text-zinc-100 text-sm cursor-pointer"
            >
              See more like this
            </button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!isLoading && !hasResults && (
        <div className="w-full h-[120px] flex items-center justify-center text-zinc-400 text-sm">
          No results yet.
        </div>
      )}
    </div>
  );
}
