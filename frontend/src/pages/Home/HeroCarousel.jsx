import { useEffect, useState } from 'react';
import PaginationPanel from './Pagination/PaginationPanel.jsx';
import { Keys } from '../../utils/constants/Keys.js';
import { GenreMap } from '../../utils/constants/GenreMap.js';
import { Link } from 'react-router-dom';

export default function HeroCarousel({ movies, isLoading, error }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { details } = Keys.API1;
  const baseUrl = 'https://image.tmdb.org/t/p/original';

  console.log(movies);

  useEffect(() => {
    const interval = setInterval(() => {
      if (movies.length > 0) return;
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies.length]);

  if (isLoading) {
    return (
      <div className='flex h-[85vh] w-full items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-red-900' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-[85vh] w-full items-center justify-center text-lg font-semibold text-red-900' />
    );
  }

  return (
    <div className='relative -mt-5 h-[400px] w-full overflow-hidden md:h-[85vh]'>
      <div className='h-1.5 w-full bg-gradient-l-to-r from-zinc-950/40 via-zinc-900/20s to-zinc-950/40' />

      <div className='pointer-events-none absolute inset-0 bg-zinc-950/40' />
      <div className='pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent' />

      <div className='pointer-events-none absolute inset-y-0 left-0 z-20 w-1/5 bg-gradient-to-r from-zinc-950 via-transparent' />
      <div className='pointer-events-none absolute inset-y-0 right-0 z-20 w-1/5 bg-gradient-to-l from-zinc-950 via-transparent' />

      <div
        className='flex h-full transition-transform duration-1000 ease-in-out'
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie) => (
          <div
            key={movie[details.id]}
            className='relative h-full w-full flex-shrink-0 bg-cover bg-top'
            style={{
              backgroundImage: movie[details.backdrop]
                ? `url(${baseUrl}${movie[details.backdrop]})`
                : 'none',
            }}
          >
            <div className='absolute bottom-0 left-0 right-0 z-10 h-[45%] bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pl-4 md:h-[40%] md:pl-20'>
              <h2
                className='mb-2 cursor-pointer text-xl font-bold text-zinc-200 md:mb-4 md:text-3xl'
                style={{ textShadow: '0 1px 2px rgba(20,20,23,.4)' }}
              >
                {movie[details.movieTitle] || movie[details.tvTitle]}
              </h2>

              <div
                className='mb-2 flex space-x-3 text-xs font-semibold text-zinc-50 md:mb-5 md:space-x-8'
                style={{
                  textShadow:
                    '0 0 5px rgba(24,24,27,.8),0 0 10px rgba(24,24,27,.6),0 0 15px rgba(24,24,27,.4)',
                }}
              >
                {movie[details.runtime] && (
                  <p>
                    Duration:
                    <span className='ml-2'>
                      {movie?.[Keys.details.runtime]} min
                    </span>
                  </p>
                )}

                <p className='cursor-pointer'>
                  TMDB:
                  <span className='ml-2'>{movie?.[details.voteAverage]}</span>
                </p>

                <p className='cursor-pointer'>
                  {movie.genreIds > 1 ? 'Genres' : 'Genre'}:
                  <span className='ml-2'>
                    {movie[details.genreIds]
                      ?.map((id) => GenreMap[id])
                      .join(' , ') || 'Unknown'}
                  </span>
                </p>
              </div>

              <p className='mb-2 max-w-xl cursor-pointer pr-4 text-xs text-zinc-200 line-clamp-2 md:max-w-3xl md:text-sm md:line-clamp-3'>
                {movie[details.overview]}
              </p>

              <Link
                to={`/${movie[details.movieTitle] ? 'film' : 'tv'}/${movie[details.id]}`}
                className='inline-block'
              >
                <button className='mt-2 rounded-3xl border-2 border-zinc-500 bg-transparent px-2 py-1 text-sm font-semibold text-zinc-300 cursor-pointer hover:border-red-950 transition-colors duration-300 hover:bg-red-950 md:mt- md:px-3 md:text-base'>
                  View now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className='absolute bottom-1 left-1/2 z-20 -translate-x-1/2 md:bottom-0'>
        <PaginationPanel
          totalPages={movies.length}
          currentPage={currentIndex}
          onPageChange={setCurrentIndex}
        />
      </div>
    </div>
  );
}
