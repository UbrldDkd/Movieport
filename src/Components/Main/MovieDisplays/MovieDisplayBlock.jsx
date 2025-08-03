import MovieCard from './MovieCard';
import { Keys } from '../../Keys.js';

export default function MovieDisplayBlock({ fullContent, type }) {
  return (
    <div className="w-full py-10">
      <div className="flex flex-wrap gap-4">
        {fullContent.map((item) => (
          <div key={item[Keys.id]} className="w-[166px]">
            <MovieCard content={item} type={type} />
          </div>
        ))}
      </div>
    </div>
  );
}

