import { useState } from 'react';

export default function ContentCardPoster({ title, posterPath }) {
  const [loaded, setLoaded] = useState(false);
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;

  return (
    <div className="relative w-full h-full rounded-sm overflow-hidden bg-zinc-800 shadow-md
      border-2 border-zinc-800/90
      outline outline-transparent
      hover:outline-2 hover:outline-zinc-800/90
      transition-all duration-150"
    >
      {posterUrl ? (
        <>
          {!loaded && <div className="absolute inset-0 bg-zinc-700 animate-pulse" />}
          <img
            src={posterUrl}
            alt={title}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-700 text-zinc-500 text-[10px]">
          {title}
        </div>
      )}
    </div>
  );
}
