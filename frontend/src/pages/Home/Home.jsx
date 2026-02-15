// React
import { useState } from 'react';

// Hooks
import { useFetchMainContent } from './hooks/useFetchMainContent.js';

// Components
import HeroCarousel from './HeroCarousel.jsx';
import ContentDisplayX from './../../components/ContentDisplays/ContentDisplayX.jsx';
import ContentDisplayBlock from './../../components/ContentDisplays/ContentDisplayBlock.jsx';
import ListsSection from '../../components/Sections/Lists/ListsSection.jsx';

export default function Home() {
  const [toShow, setToShow] = useState('movies');
  const { movies, tvShows, error, isLoading } = useFetchMainContent();

  return (
    <div
      className={`bg-zinc-950 pt-3.5 mt-2 relative overflow-x-hidden overflow-y-auto transition-opacity duration-700 ${
        movies && tvShows && !isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <HeroCarousel
        movies={movies.popular}
        isLoading={isLoading}
        error={error}
      />

      <div className='w-full flex justify-center mt-10 md:mt-20 px-2 md:px-0'>
        <div className='w-full max-w-[1140px] bg-zinc-900/90 rounded-sm flex py-3 flex-col gap-6 md:gap-10 px-2 md:px-3 items-center relative'>
          {/* Movies / TV Toggle */}
          <div className='w-full flex flex-col gap-3'>
            <div className='flex flex-wrap items-baseline gap-2 md:gap-3'>
              <h2 className='text-zinc-300 text-base -mb-1 tracking-wide font-semibold shrink-0'>
                What's your Pleasure?
              </h2>

              <button
                onClick={() => setToShow('films')}
                className={`px-3 py-1 md:px-4 md:py-1 cursor-pointer text-sm md:text-base font-semibold tracking-wider rounded-l-4xl transition-colors ${
                  toShow === 'films'
                    ? 'bg-red-950 text-zinc-300 hover:bg-zinc-300/90 hover:text-red-950'
                    : 'bg-zinc-800/70 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'
                }`}
              >
                Films
              </button>

              <button
                onClick={() => setToShow('tv')}
                className={`px-3 py-1 md:px-4 md:py-1 cursor-pointer text-sm md:text-base font-semibold tracking-wider rounded-e-4xl transition-colors ${
                  toShow === 'tv'
                    ? 'bg-red-950 text-zinc-300/90 hover:bg-zinc-700 hover:text-zinc-950'
                    : 'bg-red-950/70 text-zinc-400 hover:bg-red-950/90 hover:text-zinc-300'
                }`}
              >
                TV Shows
              </button>
            </div>
            <div className='border-b border-zinc-600  mb-3' />
            <ContentDisplayX
              content={toShow === 'films' ? movies.popular : tvShows.popular}
              view={'lg'}
            />
            <ListsSection
              header={'Popular lists this week'}
              posterAmount={10}
            />
          </div>

          {/* Now Playing */}
          <div className='w-full flex flex-col '>
            <h2 className='text-zinc-300/90 text-base -mb-1 tracking-wide font-semibold cursor-default'>
              Now Playing
            </h2>
            <div className='border-b border-zinc-600 mt-2 mb-3' />
            <ContentDisplayBlock
              content={movies.nowPlaying}
              displayAmount={14}
              view='lg'
            />
          </div>

          {/* Top Rated */}
          <div className='w-full flex flex-col'>
            <h2 className='text-zinc-300/90 text-base -mb-1 tracking-wide font-semibold cursor-default'>
              Top Rated
            </h2>
            <div className='border-b border-zinc-600 mt-2 mb-3' />
            <ContentDisplayBlock
              content={movies.topRated}
              displayAmount={14}
              view='lg'
            />
          </div>

          {/* Coming Soon */}
          <div className='w-full flex flex-col '>
            <h2 className='text-zinc-300/90 text-base -mb-1 tracking-wide font-semibold cursor-default'>
              Coming Soon
            </h2>
            <div className='border-b border-zinc-600 mt-2 mb-3' />
            <ContentDisplayBlock
              content={movies.upcoming}
              displayAmount={14}
              view='lg'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
