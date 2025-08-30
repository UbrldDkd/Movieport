import React, { useEffect, useState } from 'react';
import PaginationPanel from './Pagination/PaginationPanel';
import { Keys } from '../Keys.js'
import { GenreMap } from '../GenreMap.js'
import { Link } from 'react-router-dom';

export default function HeroCarousel({movies, isLoading, error}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { API1 } = Keys;
  const { details } = API1
  const baseUrl = "https://image.tmdb.org/t/p/original";

  if(movies) {
    console.log('movies',movies)
  }
  
  // increments index by 1 every 5 seconds and loops
  useEffect(() => {
    const interval = setInterval(() => {
      if (movies.length > 0) return;
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);


      if (isLoading) {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid" />
    </div>
  );
}

if (error) {
  return (
    <div className="w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg">
      Something went wrong: {error.message || 'Unknown error'}
    </div>
  );
}

  

  return (
    <div className="w-full h-[85vh] overflow-hidden relative z-0">
 
       <div className="absolute inset-0 bg-zinc-950/40 z-0 pointer-events-none" />
  
       <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent z-10 pointer-events-none" />

       <div className="absolute top-0 bottom-0 left-0 w-1/5 bg-gradient-to-r from-zinc-950 via-transparent to-transparent z-20 pointer-events-none -mt-1" />
  
       <div className="absolute top-0 bottom-0 right-0 w-1/5 bg-gradient-to-l from-zinc-950 via-transparent to-transparent z-20 pointer-events-none -mt-1" />
      
     
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie[Keys.API1.details.id]}
            className="w-full flex-shrink-0 h-full bg-cover bg-center relative z-[30]"
            style={{ backgroundImage: movie[details.backDrop] ? `url(${baseUrl}${movie[details.backDrop]})` : 'none' }}

          >

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 pl-20 right-0 h-[40%] bg-gradient-to-t from-zinc-950/100 via-zinc-950/80 to-transparent z-10 ">

              
              <h2 className="text-3xl cursor-pointer font-bold text-zinc-200 mb-4"
              style={{textShadow: '0 1px 2px rgba(20, 20, 23, 0.4)'}}>
                {movie[details.title] || movie[details.title]}
              </h2>

              <div className="flex text-xs space-x-8 font-semibold text-droptext-xs text-zinc-50 mb-5"
              style={{ textShadow: `
                       0 0 5px rgba(24, 24, 27, 0.8),
                       0 0 10px rgba(24, 24, 27, 0.6),
                       0 0 15px rgba(24, 24, 27, 0.4)
                       
                        `
                     }}>

              {/* <p>
                Duration: <span className="ml-2">{movie[Keys.details.runtime]} min</span>
              </p> */}

              <p className='cursor-pointer'>
                TMDB: <span className="ml-2">{movie[details.rating]}</span>
              </p>

              <p className='cursor-pointer'>
                Genre: <span className="ml-2">{movie[details.genre]?.map(id => GenreMap[id]).join(' , ') || 'Unknown'}</span>
              </p>


              </div>
              <p className="text-sm mb-2 text-zinc-200 line-clamp-3 max-w-3xl z-[30] cursor-pointer">{movie[details.overview]}</p>
             
              <Link to={`/Watch/${movie[details.title] ? 'movie' : 'tv'}/${movie[details.id]}`} className="inline-block">
              <button className="mt-4 bg-transparent hover:bg-red-950 text-zinc-300 font-base outline-2 outline-zinc-400 transform-colors  py-2 px-4 rounded-3xl cursor-pointer duration-300 ">
                Watch Now
              </button>
              </Link>

            </div>


          </div>

        ))}
      
      </div>
           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
              <PaginationPanel
               totalPages={movies.length}
               currentPage={currentIndex}
               onPageChange={setCurrentIndex}
               />
          </div>
          
    </div>
    
  );
}

