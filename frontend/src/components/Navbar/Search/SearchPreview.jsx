import { Keys } from '../../../utils/constants/Keys.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useFetchPreview } from './hooks/useFetchPreview.js';
import MediaIcon from '../../ContentDisplays/ContentCard/MediaIcon.jsx';
import { Tooltip } from '../../Common/Tooltip.jsx';

export default function SearchPreview({ value, setValue, setIsOpen }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { details } = Keys.API1;

  const [loadedCount, setLoadedCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { previewContent: content, isLoading, error } = useFetchPreview(value);

  const mediaType = content?.[0]?.[details.movieTitle] ? 'movie' : 'tv';
  const displayCount = isMobile ? 4 : 5;
  const items = Array.isArray(content) ? content.slice(0, displayCount) : [];
  const expectedImages = items.filter((i) => i?.[details.poster]).length;
  const showMore = !isLoading && items.length && loadedCount >= expectedImages;

  const handleExpand = () => {
    navigate(`/search/${encodeURIComponent(value)}`);
    setIsOpen('searchPreview', false);
    setValue('');
  };

  const handleItemClick = (id, isFilm) => {
    navigate(`/${isFilm ? 'film' : 'tv'}/${id}`);
    setIsOpen('searchPreview', false);
    setValue('');
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

  if (error)
    return (
      <div className='w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg'>
        Something went wrong: {error.message || 'Unknown error'}
      </div>
    );

  return (
    <div
      ref={ref}
      className='rounded-b-md  bg-zinc-900 scrollbar-hide transition-all duration-100 shadow-lg  min-w-full p-2 relative'
    >
      <div
        className={`transition-opacity duration-300 ${!isLoading && items.length ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {items.map((item, idx) => {
          const id = item?.[details.id];
          const isFilm = !!item?.[details.movieTitle];
          const title =
            item?.[details.movieTitle] || item?.[details.tvTitle] || 'Untitled';
          const poster = item?.[details.poster];
          const rating = item?.[details.rating];

          return (
            <button
              key={id ?? `placeholder-${idx}`}
              type='button'
              onMouseDown={() => handleItemClick(id, isFilm)}
              className='block w-full text-left cursor-pointer'
            >
              <div className='inline-flex gap-2 p-2 w-full hover:bg-zinc-800 rounded transition-colors duration-100'>
                {poster ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${poster}`}
                    alt={title}
                    className='max-w-12 h-18 md:max-w-16 md:h-24 object-cover rounded shrink-0'
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
                  <p className='font-semibold max-w-30.5  md:max-w-43  lg:max-w-48    text-zinc-300 leading-snug text-xs md:text-sm truncate'>
                    {title}
                  </p>
                  <div className='flex justify-between items-center'>
                    <p className='text-zinc-400 text-xs md:text-sm'>
                      <MediaIcon mediaType={mediaType} />
                    </p>
                    <p className='text-xs md:text-sm text-zinc-300'>
                      {rating && rating.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {showMore && (
          <div className='mt-2 text-center w-full'>
            <button
              onClick={handleExpand}
              className='text-zinc-300 hover:text-zinc-200 text-xs md:text-xs  font-semibold tracking-wider cursor-pointer bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded transition-colors duration-200'
            >
              See more results
            </button>
          </div>
        )}
      </div>

      {!isLoading && !items.length && (
        <div className=' w-full h-20 md:h-30    font-semibold tracking-wider flex items-center justify-center text-zinc-400 text-xs md:text-sm '>
          No results yet.
        </div>
      )}

      {isLoading && (
        <div className='w-full h-20 md:h-30  font-semibold tracking-wider flex items-center justify-center text-zinc-400 text-xs md:text-sm '>
          <div className='animate-spin rounded-full h-8 w-8 border-t-4 border-red-900 border-solid' />
        </div>
      )}
    </div>
  );
}
