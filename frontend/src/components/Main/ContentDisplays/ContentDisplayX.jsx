import MovieCard from './MovieCard.jsx';
import { Keys } from '../../../utils/Keys.js';
import { Link } from 'react-router-dom';

export default function MovieDisplayX({ fullContent }) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-2 md:px-4'>
        {fullContent.map((item) => (
          <Link
            key={item[details.id]}
            to={`/watch/${item[details.title] ? 'movie' : 'tv'}/${item[details.id]}`}
          >
            <div
              key={item[details.id]}
              className='snap-start flex-shrink-0 w-[120px] md:w-[166px]'
            >
              <MovieCard content={item} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
