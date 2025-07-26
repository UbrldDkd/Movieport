import React, { useEffect, useState } from 'react';
import { useRef } from 'react';

export default function HeroCarousel({ movies }) {

  const containerRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const baseUrl = "https://image.tmdb.org/t/p/original";


  const keys = {
    poster: 'poster_path',
    title: 'original_title',   
    rating: 'vote_average',
    media: 'media_type',
    id: 'id',
    backDrop: 'backdrop_path',
    releaseDate: 'release_date',
    overview: 'overview',
  };

  // increments index by 1 every 5 seconds and loops
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  return (
    <div className="w-full h-[85vh] overflow-hidden relative">

      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie[keys.id]}
            className="w-full flex-shrink-0 h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${baseUrl}${movie[keys.backDrop]})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

            
            <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-zinc-950 via-transparent to-transparent z-10" />


            <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-zinc-950 via-transparent to-transparent z-10" />

            {/* Content overlay */}
            <div className="absolute bottom-0 p-6 pl-20 pb-15 text-zinc-300 max-w-3xl">

              
              <h2 className="text-3xl font-bold text-zinc-300 mb-2">
                {movie[keys.title] || movie.title}
              </h2>

              <div >

              <p className="text-sm text-gray-300 mb-1">
                Release Date: {movie[keys.releaseDate]}
              </p>

              </div>
              <p className="text-sm text-zinc-400 line-clamp-3">{movie[keys.overview]}</p>

              <button className="mt-4 bg-zinc-900 hover:bg-red-950 text-zinc-200 font-semibold py-2 px-4 rounded">
                Watch Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
    
  );
}

