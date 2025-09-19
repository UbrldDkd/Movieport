import { Keys } from '../../Components/Keys.js';
import { useState } from 'react';

export default function MiniMovieCard({ content }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className="w-[100px] sm:w-[160px] flex-shrink-0 text-zinc-300 hover:text-zinc-400 transition-colors duration-300">

      {/* Poster container with fixed aspect ratio and size */}
      <div className="w-[100px] h-[150px] sm:w-[170px] sm:h-[250px] bg-zinc-900 rounded overflow-hidden select-none cursor-pointer relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 rounded">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-red-500 border-solid"></div>
          </div>
        )}
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 text-xs">
            No Image
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${content[details.poster] || content.poster}`}
            alt={content[details.title] || content[details.titleTv]}
            className="object-cover w-full h-full"
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}
      </div>

      {/* Title */}
      <h3 
        className="mt-2 font-base truncate select-none cursor-pointer text-xs sm:text-sm" 
        title={content[details.title] || content[details.titleTv]}
      >
        {content[details.title] || content[details.titleTv]}
      </h3>

      {/* Additional info */}
      <div className="mt-1 text-xs sm:text-sm space-y-1">

        {/* Release year */}
        <div className="flex gap-4 text-gray-500 hover:text-zinc-600">
          <p>
            {content[details.releaseDate]
              ? content[details.releaseDate].slice(0, 4)
              : content[details.releaseDateTv]?.slice(0, 4)}
          </p>
        </div>

        {/* Type: Movie or TV */}
        <p className="text-zinc-400 select-none cursor-pointer hover:text-zinc-500 transition-colors duration-300">
          {content[details.title] ? 'Movie' : 'TV Show'}
        </p>

        {/* Rating */}
        <p className="text-zinc-300 select-none cursor-pointer text-right pr-1">
          {Number(content[details.rating].toFixed(1))}/10
        </p>

      </div>

    </div>
  );
}
