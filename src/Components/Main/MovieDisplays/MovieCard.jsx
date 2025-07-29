import { Keys } from '../../Keys.js';

export default function MovieCard({ movie }) {
  return (
    <div className="flex-shrink-0 w-[166px] text-white">

      <img
        src={`https://image.tmdb.org/t/p/w200${movie[Keys.poster]}`}
        alt={movie[Keys.title]}
        className="object-cover rounded max-w-[170px] h-auto"
      />

      <h3 className="mt-2 font-extralight truncate text-sm">
        {movie[Keys.title]}
      </h3>

      <div className="mt-1 text-sm space-y-1">
        <p className="text-gray-400">
          {movie[Keys.media] === 'tv' ? 'TV Show' : 'Movie'}
        </p>
        <p className="text-zinc-400">{movie[Keys.releaseYear]}</p>
        <p className="text-zinc-300 text-right pr-1">{movie[Keys.rating]}/10</p>
      </div>
    </div>
  );
}
