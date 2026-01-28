import HeroCarousel from './HeroCarousel.jsx';
import MovieDisplayX from './ContentDisplays/ContentDisplayX.jsx';
import MovieDisplayBlock from './ContentDisplays/ContentDisplayBlock.jsx';
import Footer from '../Footer/Footer.jsx';
import { useState } from 'react';
import { Keys } from '../../utils/Keys.js';
import { useFetchMainContent } from './hooks/useFetchMainContent.js';

export default function Main() {
  const [toShow, setToShow] = useState('movies');
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

      <div className='flex items-center px-3 md:px-15 mt-8 md:mt-25 mb-6 md:mb-10 space-x-2 md:space-x-4'>
        <h2 className='cursor-pointer text-zinc-200 text-xl md:text-3xl font-light flex-shrink-0'>
          Whats your Poison?
        </h2>

        <button
          onClick={() => setToShow('Movies')}
          className='cursor-pointer bg-zinc-800 hover:bg-zinc-300 hover:text-red-950 text-zinc-300 text-sm md:text-base font-normal transition-colors duration-300 px-2 py-1 md:px-3 md:py-2 rounded-l-4xl active:bg-zinc-400 active:text-red-900'
        >
          Movies
        </button>

        <button
          onClick={() => setToShow('TV-Shows')}
          className='cursor-pointer bg-red-950 hover:bg-zinc-700 text-zinc-300 hover:text-zinc-950 px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-e-4xl transition-colors duration-300 active:bg-zinc-500 active:text-zinc-900'
        >
          TV-shows
        </button>
      </div>

      <div className='w-full mx-auto px-3 md:px-7 items-center'>
        {toShow === 'Movies' ? (
          <MovieDisplayX fullContent={movies.popular} toDisplay={16} />
        ) : (
          <MovieDisplayX fullContent={tvShows.popular} toDisplay={16} />
        )}

        <h2 className='text-zinc-200 text-xl md:text-3xl mt-4 md:mt-7 font-light flex-shrink-0 cursor-pointer'>
          Now Playing
        </h2>

        <MovieDisplayBlock fullContent={movies.nowPlaying} toDisplay={16} />

        <h2 className='text-zinc-200 text-xl md:text-3xl mt-4 md:mt-6 font-light flex-shrink-0 cursor-pointer'>
          Top Rated
        </h2>

        <MovieDisplayBlock fullContent={movies.topRated} toDisplay={16} />

        <h2 className='text-zinc-200 text-xl md:text-3xl mt-4 md:mt-6 font-light flex-shrink-0 cursor-pointer'>
          Coming Soon
        </h2>

        <MovieDisplayBlock
          fullContent={movies.upcoming}
          toDisplay={16}
          showFullDate={true}
        />
      </div>

      <Footer />
    </div>
  );
}
