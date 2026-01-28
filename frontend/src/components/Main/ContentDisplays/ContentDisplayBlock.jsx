import MovieCard from './MovieCard';
import { Keys } from '../../../utils/Keys';
import { Link } from 'react-router-dom';

//display content as a block
export default function MovieDisplayBlock({
  fullContent,
  toDisplay,
  showFullDate = false,
}) {
  const { API1 } = Keys;
  const { details } = API1;

  return (
    <div className='w-full py-4 md:py-10'>
      <div className='flex flex-wrap gap-2 md:gap-4 justify-center md:justify-start'>
        {fullContent && Array.isArray(fullContent) ? (
          fullContent.slice(0, toDisplay).map((item) => (
            <div key={item[details.id]} className='w-[110px] md:w-[166px]'>
              <Link
                to={`/watch/${item[details.title] ? 'movie' : 'tv'}/${item[details.id]}`}
                className='block'
              >
                <MovieCard content={item} showFullDate={showFullDate} />
              </Link>
            </div>
          ))
        ) : (
          <p className='text-base text-red-900'>Content not found</p>
        )}
      </div>
    </div>
  );
}
