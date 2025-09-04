import { Keys } from '../../Components/Keys.js';

export default function MiniMovieCard({ content }) {

  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className="w-[100px] sm:w-[160px] flex-shrink-0 text-zinc-300 hover:text-zinc-400 transition-colors duration-300">

      {/* Poster container with fixed aspect ratio and size */}
      <div className="w-[100px] h-[150px] sm:w-[170px] sm:h-[250px] bg-zinc-900 rounded overflow-hidden select-none cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/original/${content[details.poster] || content.poster}` }
          alt={content[details.title] || content[details.titleTv]}
          className="object-cover w-full h-full"
          loading="lazy" // lazy-load for performance
          decoding="async"
        />
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
