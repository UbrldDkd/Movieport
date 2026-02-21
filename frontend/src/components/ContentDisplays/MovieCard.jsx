import { Keys } from '../../../utils/constants/Keys.js';
import { GenreMap } from '../../../utils/constants/GenreMap.js';
import { useState, useRef, useEffect } from 'react';

export default function MovieCard({ content, showFullDate = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showHoverCard, setShowHoverCard] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const cardRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const { API1 } = Keys;
  const { details, Url } = API1;

  // Handle hover timer and positioning
  useEffect(() => {
    if (isHovered) {
      // Shorter delay on mobile for better touch experience
      const delay = window.innerWidth < 768 ? 500 : 750; // 0.5s on mobile, 0.75s on desktop

      // Start timer for showing hover card
      hoverTimerRef.current = setTimeout(() => {
        setShowHoverCard(true);

        // Check positioning when showing
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const cardWidth = rect.width;

          // On mobile, prefer showing on right with more space consideration
          const spaceBuffer = window.innerWidth < 768 ? 10 : 20;
          setShowRight(rect.right + cardWidth < viewportWidth - spaceBuffer);
        }
      }, delay);
    } else {
      // Clear timer and hide hover card immediately when not hovering
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      setShowHoverCard(false);
    }

    // Cleanup timer on unmount
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [isHovered]);

  // Get genres for this content
  const genres = content[details.genre]
    ? content[details.genre]
        .map((genreId) => GenreMap[genreId])
        .filter(Boolean)
        .slice(0, 3)
    : [];

  return (
    <div
      ref={cardRef}
      className='w-[110px] md:w-[170px] flex-shrink-0 text-text-primary hover:text-zinc-400 transition-colors duration-300 relative'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Poster container with fixed aspect ratio and size */}
      <div className='aspect-[2/3] w-[110px] md:w-[170px] bg-bg-secondary rounded overflow-hidden select-none cursor-pointer'>
        <img
          src={`https://image.tmdb.org/t/p/original/${content[details.poster]}`}
          alt={content[details.movieTitle] || content[details.tvTitle]}
          className='object-cover w-full h-full'
          loading='lazy'
          decoding='async'
        />
      </div>

      {/* Title */}
      <h3
        className='mt-2 font-base truncate select-none cursor-pointer text-xs md:text-sm'
        title={content[details.movieTitle] || content[details.tvTitle]}
      >
        {content[details.movieTitle] || content[details.tvTitle]}
      </h3>

      {/* Additional info */}
      <div className='mt-1 text-xs md:text-sm space-y-1'>
        <div className='flex gap-4 text-gray-500 hover:text-zinc-600'>
          <p>
            {showFullDate
              ? content[details.movieReleaseDate]
                ? new Date(
                    content[details.movieReleaseDate]
                  ).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : content[details.tvReleaseDate] &&
                  new Date(content[details.tvReleaseDate]).toLocaleDateString(
                    'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }
                  )
              : content[details.movieReleaseDate]
                ? content[details.movieReleaseDate].slice(0, 4)
                : content[details.tvReleaseDate]?.slice(0, 4)}
          </p>
        </div>

        <p className='text-zinc-400 select-none cursor-pointer hover:text-zinc-500 transition-colors duration-300 text-xs md:text-sm'>
          {content[details.movieTitle] ? 'Movie' : 'TV Show'}
        </p>
        <p className='text-text-primary select-none cursor-pointer text-right pr-1 text-xs md:text-sm'>
          {Number(content?.[details.rating].toFixed(1))}/10
        </p>
      </div>

      {/* Hover Details Container */}
      {showHoverCard && (
        <div
          className={`absolute top-0 z-50 w-[130px] md:w-[183px] h-[185px] md:h-[255px] bg-zinc-950 border border-zinc-900 rounded p-2 md:p-3 shadow-lg flex flex-col overflow-hidden animate-fadeIn ${
            showRight ? 'left-full' : 'right-full'
          }`}
          style={{
            animation: 'fadeIn 0.3s ease-out forwards',
          }}
        >
          {/* Rating (Desktop only) */}
          <div className='mb-2 hidden md:block'></div>

          {/* Genres */}
          {genres.length > 0 && (
            <div className='mb-2'>
              <p className='text-zinc-400 text-xs mb-1'>Genres:</p>
              <div className='flex flex-wrap gap-1'>
                {genres.map((genre, index) => (
                  <span
                    key={index}
                    className='text-xs bg-zinc-700 px-1 py-0.5 rounded'
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Overview (scrollable if content overflows) */}
          <div className='flex-1 overflow-hidden min-h-0 '>
            <p className='text-zinc-400 text-xs mb-1'>Overview:</p>
            <div className='text-text-primary text-xs leading-tight overflow-auto pr-1 scrollbar-hide max-h-[5.5rem] md:max-h-[8.5rem]'>
              <p className='whitespace-normal'>
                {content[details.overview] || 'No overview available.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
