import MovieCard from './MovieCard';
import { Keys } from '../../Keys.js';
import { Link } from 'react-router-dom';

//display content as a block
export default function MovieDisplayBlock({ fullContent, toDisplay }) {
  
  const { API1 } = Keys;
  const { details } = API1


  return (

    <div className="w-full py-10">

      <div className="flex flex-wrap gap-4">

        {fullContent && Array.isArray(fullContent) ? (
          fullContent.slice(0, toDisplay).map((item) => (

          <div key={item[details.id]} className='w-[166px]'>
            

            <Link 
              to={`/watch/${item[details.title]? 'movie': 'tv'}/${item[details.id]}`} 
              className='block'
            >
              <MovieCard content={item} />
            </Link>

          </div>
        ))):(
          <p className='text-base text-red-900'>Content not found</p>
        )}

      </div>

    </div>
  );
}
