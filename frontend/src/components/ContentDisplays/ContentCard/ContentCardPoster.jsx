import { useState } from 'react';

export default function ContentCardPoster({ title, posterPath, view }) {
  const [loaded, setLoaded] = useState(false);

  const sizeConfig = {
    sm: {
      width: 'w-[55px] sm:w-[60px] md:w-[65px] lg:w-[70px]',
      tmdb: 'w500',
    },
    similarSection: {
      width: 'w-[85px] sm:w-[90px] md:w-[100px] lg:w-[109px]',
      tmdb: 'w500',
    },
    md: {
      width: 'w-[90px] sm:w-[100px] md:w-[110px] lg:w-[120px]',
      tmdb: 'w500',
    },
    lg: {
      width: 'w-[110px] sm:w-[120px] md:w-[135px] lg:w-[150px]',
      tmdb: 'w500',
    },
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
          {!loaded && (
            <div className='absolute inset-0 bg-zinc-700 animate-pulse-slow' />
          )}

          <img
            src={posterUrl}
            alt={title}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 will-change-transform transform-gpu backface-hidden ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
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
