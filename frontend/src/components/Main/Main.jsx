import HeroCarousel from './HeroCarousel.jsx';
import MovieDisplayX from './ContentDisplays/ContentDisplayX.jsx';
import MovieDisplayBlock from './ContentDisplays/ContentDisplayBlock.jsx';
import Footer from '../Footer/Footer.jsx';
import { useState } from 'react';
import { useFetchMainContent } from './hooks/useFetchMainContent.js';

export default function Main() {
  const [toShow, setToShow] = useState('Movies');
  const { movies, tvShows, error, isLoading } = useFetchMainContent();

  return (
    <div
      className={`bg-zinc-950 pt-5 relative overflow-x-hidden overflow-y-auto transition-opacity duration-700 ${
        movies && tvShows && !isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <HeroCarousel
        movies={movies.popular}
        isLoading={isLoading}
        error={error}
      />

      <div className='w-full mx-auto flex flex-col mt-20 gap-10 px-3 md:px-9 items-center'>
        {/* Movies / TV toggle + content */}
        <div className='w-full flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <h2 className='text-zinc-300 text-xl tracking-wide font-semibold flex-shrink-0'>
              Whats your Pleasure?
            </h2>

            <button
              onClick={() => setToShow('Movies')}
              className='bg-zinc-800 hover:bg-zinc-300/90 font-semibold tracking-wider hover:text-red-950 text-zinc-300 text-sm md:text-base transition-colors px-2 py-1 md:px-3 md:py-1 rounded-l-4xl'
            >
              Movies
            </button>

            <button
              onClick={() => setToShow('TV-Shows')}
              className='bg-red-950 hover:bg-zinc-700 font-semibold tracking-wider text-zinc-300/90 hover:text-zinc-950 px-3 py-1 md:px-4 md:py-1 text-sm md:text-base rounded-e-4xl transition-colors'
            >
              TV-shows
            </button>
          </div>

          {/* Divider */}
          <div className='h-[0.5px] bg-zinc-300/90 mb-1' />

          {/* Conditional content */}
          {toShow === 'Movies' ? (
            <MovieDisplayX fullContent={movies.popular} />
          ) : (
            <MovieDisplayX fullContent={tvShows.popular} />
          )}
        </div>

        {/* Now Playing */}
        <div className='w-full flex flex-col gap-2'>
          <h2 className='text-zinc-300 text-xl tracking-wide font-semibold'>
            Now Playing
          </h2>
          <div className='h-px bg-zinc-300/90 mb-1' />
          <MovieDisplayBlock fullContent={movies.nowPlaying} toDisplay={18} />
        </div>

        {/* Top Rated */}
        <div className='w-full flex flex-col gap-2'>
          <h2 className='text-zinc-300 text-xl tracking-wide font-semibold'>
            Top Rated
          </h2>
          <div className='h-px bg-zinc-300/90 mb-1' />
          <MovieDisplayBlock fullContent={movies.topRated} toDisplay={18} />
        </div>

        {/* Coming Soon */}
        <div className='w-full flex flex-col gap-2'>
          <h2 className='text-zinc-300 text-xl tracking-wide font-semibold'>
            Coming Soon
          </h2>
          <div className='h-px bg-zinc-300/90 mb-1' />
          <MovieDisplayBlock fullContent={movies.upcoming} toDisplay={16} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
