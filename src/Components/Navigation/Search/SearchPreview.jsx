import { Keys } from '../../Keys.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

export default function SearchPreview({content, isLoading, error, value, isOpen, setIsOpen}) {
  const ref = useRef(null)
  const navigate = useNavigate();
  const { API1 } = Keys;
  const { details, Url } = API1;
  

  function handleExpand() {
    navigate(`/search/${encodeURIComponent(value)}`);
    setIsOpen(false)
  }

   useEffect(() => {
    function handleClickOutside(event) {
      // If click is outside the ref element, close it
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  useEffect(() => {
  if (value.trim() !== '') {
    setIsOpen(true);
  } else {
    setIsOpen(false);
  }
}, [value]);


if (error) {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg">
      Something went wrong: {error.message || 'Unknown error'}
    </div>
  );
}

if (!isOpen) return null;



return (
  <div 
  ref={ref}
  className="bg-zinc-900 rounded-md mt-3 shadow-lg inline-block p-2 animate-fade-in-up w-[320px]">
    {content.slice(0,6).map((item, index) => (
      <Link
        key={item ? item[details.id] : `placeholder-${index}`}
        to={
          item
            ? `/watch/${item[details.title] ? 'movie' : 'tv'}/${item[details.id]}`
            : "#"
        }
        className="block"
        onClick={() => setIsOpen(false)}
      >
        <div className="inline-flex gap-2 p-2 w-full">
          {item ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${item[details.poster]}`}
              alt={item[details.title] || item[details.titleTv]}
              className="w-16 h-24 object-cover rounded flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-24 bg-zinc-700 rounded flex-shrink-0 animate-pulse" />
          )}

          <div className="flex flex-col gap-2 w-[24ch]">
            {item ? (
              <>
                <p className="font-semibold text-zinc-300 leading-snug text-sm truncate">
                  {item[details.title] || item[details.titleTv]}
                </p>
                <p className="text-zinc-400 text-sm">
                  {item[details.media] === 'tv' ? 'TV Show' : 'item'}
                </p>
                <p className="text-sm text-zinc-300 mt-auto text-right">
                  {item[details.rating]}/10
                </p>
              </>
            ) : (
              <>
                <div className="h-4 bg-zinc-700 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-zinc-700 rounded w-1/2 animate-pulse" />
                <div className="h-3 bg-zinc-700 rounded w-1/4 animate-pulse mt-auto" />
              </>
            )}
          </div>
        </div>
      </Link>
    ))}

    <div className="mt-2 text-center my-2 w-full">
      <button
        onClick={handleExpand}
        className="text-zinc-300 hover:text-zinc-100 text-sm cursor-pointer"
      >
        See more like this
      </button>
    </div>
  </div>
);
}