import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import PaginationPanel from './Pagination/PaginationPanel';
import { Keys }from '../Keys.js'

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
    <div className="w-full h-[85vh] overflow-hidden relative">

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-0 bottom-0 left-0 w-1/5 bg-gradient-to-r from-zinc-950 via-transparent to-transparent z-10 pointer-events-none -mt-1" />

        <div className="absolute top-0 bottom-0 right-0 w-1/5 bg-gradient-to-l from-zinc-950 via-transparent to-transparent z-10 pointer-events-none -mt-1" />
    
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie[Keys.id]}
            className="w-full flex-shrink-0 h-full bg-cover bg-center relative"
            style={{ backgroundImage: movie[Keys.backDrop] ? `url(${baseUrl}${movie[Keys.backDrop]})` : 'none' }}

          >

            {/* Content overlay */}
            <div className="absolute bottom-0 p-6 pl-20 pb-15 text-zinc-300 max-w-3xl">

              
              <h2 className="text-3xl font-bold text-zinc-300 mb-2">
                {movie[Keys.title] || movie.title}
              </h2>

              <div >

              <p className="text-sm text-gray-300 mb-1">
                Release Date: {movie[Keys.releaseDate]}
              </p>

              </div>
              <p className="text-sm text-zinc-400 line-clamp-3">{movie[Keys.overview]}</p>

              <button className="mt-4 bg-zinc-900 hover:bg-red-950 text-zinc-200 font-semibold py-2 px-4 rounded">
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

