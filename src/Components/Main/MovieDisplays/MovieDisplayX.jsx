import MovieCard from './MovieCard'
import { Keys } from '../../Keys.js'
import { Link } from 'react-router-dom'

export default function MovieDisplayX({ fullContent }) {

  const { API1 } = Keys;
  const { details } = API1

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-4"
      >
        {fullContent.map((item) => (

          <Link 
          key={item[details.id]} 
          to={`/watch/${item[details.title]?'movie':'tv'}/${item[details.id]}`}>

          <div key={item[details.id]} className="snap-start flex-shrink-0 w-[166px]">
            <MovieCard content={item} />
          </div>

          </Link>

        ))}
      </div>
    </div>
  );
}
