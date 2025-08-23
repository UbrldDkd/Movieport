import MiniMovieCard from './MiniMovieCard.jsx'
import { Keys } from '../../Components/Keys.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetchSimilar from './CustomHooks/useFetchSimilar.jsx';


//display content as a block
export default function SimContent({id, mediaType}) {

  
  const { API1 } = Keys;
  const { details } = API1

  const navigate = useNavigate();
  
  
  const { content, error, isLoading } = useFetchSimilar({ id, mediaType });
  
  function seeMore() {
    navigate(`/${content?.[details.mediaType]}/discover/${content[details.id]}`)
  }
  console.log(id,mediaType + 'id/m')
  console.log('Content:' + content)
  return (

    <div className="w-full pb-5 ">

        <h2 className='text-3xl font-light pb-4'> You also might like</h2>
      <div className="flex flex-wrap gap-4">

        <div>
          <button
          onClick={seeMore}
          >View more like this

          </button>
        </div>



        {content && Array.isArray(content) ? (
         content.slice(0, 9).map((item) => (

          <div key={item[details.id]} className='w-[160px]'>
            
            {/* ${item[Keys.details.id] later add this */}

            <Link 
              to={`/watch/${item[details.title]? 'movie': 'tv'}/${item[details.id]}`} 
              className='block'
              onClick={console.log(item)}
            >
              <MiniMovieCard content={item} />
            </Link>

          </div>
        ))):(
          <p className='text-base text-red-900'>{error && error}</p>
        )}

      </div>

    </div>
  );
}
