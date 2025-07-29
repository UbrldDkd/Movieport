import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import PaginationPanel from './Pagination/PaginationPanel';
import { Keys } from '../Keys.js'
import { GenreMap } from '../GenreMap.js'

export default function HeroCarousel({ movies }) {

  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const baseUrl = "https://image.tmdb.org/t/p/original";




  // increments index by 1 every 5 seconds and loops
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

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
            key={movie[Keys.id]}
            className="w-full flex-shrink-0 h-full bg-cover bg-center relative z-[30]"
            style={{ backgroundImage: movie[Keys.backDrop] ? `url(${baseUrl}${movie[Keys.backDrop]})` : 'none' }}

          >

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 pl-20 right-0 h-[40%] bg-gradient-to-t from-zinc-950/100 via-zinc-950/80 to-transparent z-10 ">

              
              <h2 className="text-3xl font-bold text-zinc-200 mb-4"
              style={{textShadow: '0 1px 2px rgba(20, 20, 23, 0.4)'}}>
                {movie[Keys.title] || movie.title}
              </h2>

              <div className="flex text-xs space-x-8 font-semibold text-droptext-xs text-zinc-50 mb-5"
              style={{ textShadow: `
                       0 0 5px rgba(24, 24, 27, 0.8),
                       0 0 10px rgba(24, 24, 27, 0.6),
                       0 0 15px rgba(24, 24, 27, 0.4)
                       
                        `
                     }}>

              <p>
                Duration: <span className="ml-2">{movie[Keys.runtime]} min</span>
              </p>

              <p>
                TMDB: <span className="ml-2">{movie[Keys.rating]}</span>
              </p>

              <p>
                Genre: <span className="ml-2">{movie[Keys.genres]?.map(id => GenreMap[id]).join(' , ') || 'Unknown'}</span>
              </p>


              </div>
              <p className="text-sm mb-2 text-zinc-200 line-clamp-3 z-[30]">{movie[Keys.overview]}</p>

              <button className="mt-4 bg-zinc-900 hover:bg-red-950 text-zinc-50 font-semibold py-2 px-4 rounded">
                Watch Now
              </button>

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

