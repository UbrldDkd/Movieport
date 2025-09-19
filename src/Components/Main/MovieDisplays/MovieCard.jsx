import { Keys } from '../../Keys.js';
import { GenreMap } from '../../GenreMap.js';
import { useState, useRef, useEffect } from 'react';

export default function MovieCard({ content, showFullDate = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showHoverCard, setShowHoverCard] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const cardRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const { API1 } = Keys;
  const { details, Url } = API1

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
    ? content[details.genre].map(genreId => GenreMap[genreId]).filter(Boolean).slice(0, 3)
    : [];

  return (
    <div 
      ref={cardRef}
      className="w-[110px] md:w-[170px] flex-shrink-0 text-zinc-300 hover:text-zinc-400 transition-colors duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      
      {/* Poster container with fixed aspect ratio and size */}
      <div className="w-[110px] h-[165px] md:w-[170px] md:h-[255px] bg-zinc-900 rounded overflow-hidden select-none cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/original/${content[details.poster]}`}
          alt={content[details.title] || content[details.titleTv]}
          className="object-cover w-full h-full"
          loading="lazy" // lazy-load for performance
          decoding="async"
        />
      </div>

      {/* Title */}
      <h3 className="mt-2 font-base truncate select-none cursor-pointer text-xs md:text-sm" title={content[details.title] || content[details.titleTv]}>
        {content[details.title] || content[details.titleTv]}
      </h3>

      {/* Additional info */}
      <div className="mt-1 text-xs md:text-sm space-y-1">
        <div className="flex gap-4 text-gray-500 hover:text-zinc-600">
          <p>
            {showFullDate 
              ? (content[details.releaseDate] 
                  ? new Date(content[details.releaseDate]).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric', 
                      year: 'numeric'
                    })
                  : content[details.releaseDateTv] && new Date(content[details.releaseDateTv]).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }))
              : (content[details.releaseDate]
                  ? content[details.releaseDate].slice(0, 4)
                  : content[details.releaseDateTv]?.slice(0, 4))
            }
          </p>
        </div>

        <p className="text-zinc-400 select-none cursor-pointer hover:text-zinc-500 transition-colors duration-300 text-xs md:text-sm">
          {content[details.title] ? 'Movie' : 'TV Show' }
        </p>
        <p className="text-zinc-300 select-none cursor-pointer text-right pr-1 text-xs md:text-sm">
          {Number(content?.[details.rating].toFixed(1))}/10
        </p>
      </div>

      {/* Hover Details Container */}
      {showHoverCard && (
        <div 
          className={`absolute top-0 z-50 w-[130px] md:w-[174px] h-[185px] md:h-[255px] bg-zinc-900 border border-zinc-700 rounded p-2 md:p-3 shadow-lg flex flex-col overflow-hidden animate-fadeIn ${
            showRight ? 'left-full' : 'right-full'
          }`}
          style={{ 
            animation: 'fadeIn 0.3s ease-out forwards'
          }}
        >
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-zinc-200 font-semibold text-xs md:text-sm line-clamp-2 flex-1 mr-1">
              {content[details.title] || content[details.titleTv]}
            </h4>
            <div className="flex-shrink-0 md:hidden">
              <span className="text-yellow-400 text-xs font-medium">{Number(content?.[details.rating].toFixed(1))}</span>
            </div>
          </div>
          
          {/* Rating (Desktop only) */}
          <div className="mb-2 hidden md:block">
            <p className="text-zinc-300 text-xs">
              Rating: <span className="text-yellow-400">{Number(content?.[details.rating].toFixed(1))}/10</span>
            </p>
          </div>
          
          {/* Genres */}
          {genres.length > 0 && (
            <div className="mb-2">
              <p className="text-zinc-400 text-xs mb-1">Genres:</p>
              <div className="flex flex-wrap gap-1">
                {genres.map((genre, index) => (
                  <span key={index} className="text-xs bg-zinc-700 px-1 py-0.5 rounded">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Overview */}
          <div className="flex-1 overflow-hidden">
            <p className="text-zinc-400 text-xs mb-1">Overview:</p>
            <p className="text-zinc-300 text-xs leading-tight line-clamp-4 md:line-clamp-6">
              {content[details.overview] || 'No overview available.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
