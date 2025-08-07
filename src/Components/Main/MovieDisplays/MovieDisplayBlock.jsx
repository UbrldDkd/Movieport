import MovieCard from './MovieCard';
import { Keys } from '../../Keys.js';
import { Link } from 'react-router-dom';

//display content as a block
export default function MovieDisplayBlock({ fullContent, toDisplay }) {
  return (

    <div className="w-full py-10">

      <div className="flex flex-wrap gap-4">

        {fullContent.slice(0,toDisplay).map((item) => (

          <div key={item[Keys.details.id]} className='w-[166px]'>
            
            {/* ${item[Keys.details.id] later add this */}

            <Link 
              to={`/watch/${item[Keys.details.title]? 'movie': 'tv'}/${item[Keys.details.id]}`} 
              className='block'
              onClick={console.log(item)}
            >
              <MovieCard content={item} />
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}
