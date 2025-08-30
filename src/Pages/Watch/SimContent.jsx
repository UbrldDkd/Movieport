import MiniMovieCard from './MiniMovieCard.jsx'
import { Keys } from '../../Components/Keys.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFetchSimilar } from './CustomHooks/useFetchSimilar.jsx';

// Display similar content as a block
export default function SimContent({ id, mediaType }) {

  const { API1 } = Keys;
  const { details } = API1;

  const navigate = useNavigate();

  const { content, error, isLoading } = useFetchSimilar({ id, mediaType });

  // Navigate to see more similar content
  function seeMore() {
    if (content)
      navigate(`/discover/${mediaType}/${id}`)
  }

  return (
    <div className="w-full pb-5">

      {/* Section header */}
      <h2 className='text-3xl font-light pb-4'>You also might like</h2>

      <div className="flex flex-wrap gap-4">

        {/* "View more" button */}
        <div className="flex w-full pb-3 justify-end pr-6">
          {content && !error && (
            <button
              onClick={seeMore}
              className="text-1xl cursor-pointer hover:text-red-950 transition-colors durations-100"
            >
              View more like this
            </button>
          )}
        </div>

        {/* Display similar content cards */}
        {content && Array.isArray(content) ? (
          content.slice(0, 9).map((item) => (
            <div key={item[details.id]} className='w-[160px]'>

              {/* Mini movie card link */}
              <Link 
                to={`/watch/${item[details.title] ? 'movie' : 'tv'}/${item[details.id]}`} 
                className='block'
              >
                <MiniMovieCard content={item} />
              </Link>

            </div>
          ))
        ) : (
          <p className='text-base text-red-900'>{error && error}</p>
        )}

      </div>
    </div>
  );
}
