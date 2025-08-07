import { Keys } from '../../Keys.js';

export default function MovieCard({ content }) {
  return (
    <div className="w-[170px] flex-shrink-0 text-zinc-300 hover:text-zinc-400 transition-colors duration-300">
      
      {/* Poster container with fixed aspect ratio and size */}
      <div className="w-[170px] h-[255px] bg-zinc-900 rounded overflow-hidden select-none cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/original/${content[Keys.details.poster]}`}
          alt={content[Keys.details.title] || content[Keys.details.titleTv]}
          className="object-cover w-full h-full"
          loading="lazy" // lazy-load for performance
          decoding="async"
        />
      </div>

      {/* Title */}
      <h3 className="mt-2 font-base truncate select-none cursor-pointer text-sm" title={content[Keys.details.title] || content[Keys.details.titleTv]}>
        {content[Keys.details.title] || content[Keys.details.titleTv]}
      </h3>

      {/* Additional info */}
      <div className="mt-1 text-sm space-y-1">
        <div className="flex gap-4 text-gray-500 hover:text-zinc-600">
          <p>
            {content[Keys.details.releaseDate]
              ? content[Keys.details.releaseDate].slice(0, 4)
              : content[Keys.details.releaseDateTv]?.slice(0, 4)}
          </p>
        </div>

        <p className="text-zinc-400 select-none cursor-pointer hover:text-zinc-500 transition-colors duration-300">
          {content[Keys.details.media] === 'tv' ? 'TV Show' : 'Movie'}
        </p>
        <p className="text-zinc-300 select-none cursor-pointer text-right pr-1">
          {content[Keys.details.rating]}/10
        </p>
      </div>
    </div>
  );
}
