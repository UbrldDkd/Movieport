import MovieCard from './MovieCard'
import { Keys } from '../../Keys.js'

export default function MovieDisplayX({ movies }) {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-4"
      >
        {movies.map((movie) => (
          <div key={movie[Keys.id]} className="snap-start flex-shrink-0 w-[166px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
