import MovieCard from './MovieCard';
import { Keys } from '../../Keys.js';

export default function MovieDisplayBlock({ movies }) {
  return (
    <div className="w-full py-10">
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <div key={movie[Keys.id]} className="w-[166px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

