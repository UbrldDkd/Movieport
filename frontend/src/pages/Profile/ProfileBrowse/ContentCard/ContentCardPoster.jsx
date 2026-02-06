import { useState } from 'react';

export default function ContentCardPoster({ title, posterPath, view }) {
  const [loaded, setLoaded] = useState(false);

  // Size is owned here
  const sizeConfig = {
    sm: { width: 'w-[90px]', tmdb: 'w342' },
    md: { width: 'w-[120px]', tmdb: 'w500' },
    lg: { width: 'w-[150px]', tmdb: 'w500' }, // avoid `original` at small sizes
  };

  const { width, tmdb } = sizeConfig[view] || sizeConfig.sm;

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/${tmdb}${posterPath}`
    : null;

  return (
    <div
      className={`relative ${width} aspect-[2/3] rounded-sm overflow-hidden bg-zinc-800 shadow-md
        border-2 border-zinc-800/90
        outline outline-transparent
        hover:outline-2 hover:outline-zinc-800/90
        transition-all duration-150`}
    >
      {posterUrl ? (
        <>
          {/* Loading pulse */}
          {!loaded && (
            <div className='absolute inset-0 bg-zinc-700 animate-pulse-slow' />
          )}

          <img
            src={posterUrl}
            alt={title}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover
              transition-opacity duration-500
              will-change-transform
              transform-gpu
              backface-hidden
              ${loaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
        </>
      ) : (
        <div className='w-full h-full flex items-center justify-center bg-zinc-700 text-zinc-500 text-[10px] text-center px-1'>
          {title}
        </div>
      )}
    </div>
  );
}
