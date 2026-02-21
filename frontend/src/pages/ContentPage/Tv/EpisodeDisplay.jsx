import React, { useState, useEffect } from 'react';
import { useFetchEpisode } from './hooks/useFetchEpisode';

export default function EpisodeDisplay({
  seasonNumber,
  episodeNumber,
  id,
  onClose,
}) {
  const [openDesc, setOpenDesc] = useState(true);

  const { episode, isLoading, error } = useFetchEpisode({
    id,
    seasonNumber,
    episodeNumber,
  });

  // Reset description when episode changes
  useEffect(() => {
    setOpenDesc(true);
  }, [episode]);

  if (!episode) return null;

  const {
    still_path,
    name,
    overview,
    air_date,
    episode_number,
    season_number,
    vote_average,
    runtime,
  } = episode;

  const imageUrl = still_path
    ? `https://image.tmdb.org/t/p/original${still_path}`
    : 'https://via.placeholder.com/780x440?text=No+Image';

  return (
    <div className='relative w-full bg-bg-secondary text-text-primary font-normal rounded-lg overflow-hidden shadow-lg mb-4 sm:mb-6'>
      {/* Close Button */}
      <button
        onClick={onClose}
        className='absolute top-2 right-2 sm:top-3 sm:right-3 text-zinc-400 hover:text-white text-lg sm:text-xl font-bold z-10'
      >
        ✕
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className='flex items-center justify-center h-64 transition-opacity duration-300 opacity-100'>
          <div className='w-10 h-10 border-4 border-red-900 border-t-transparent rounded-full animate-spin'></div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className='flex items-center justify-center h-64 text-red-500 transition-opacity duration-300 opacity-100'>
          <p>{error}</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <div className='transition-opacity duration-500 opacity-100'>
          {/* Image */}
          <img
            src={imageUrl}
            alt={name}
            className='w-full h-48 sm:h-auto object-cover'
          />

          {/* Show Description Button below image */}
          <div
            className={`flex justify-center z-10 relative transition-opacity duration-300 ${
              openDesc ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <button
              onClick={() => setOpenDesc(true)}
              className='w-32 sm:w-36 text-zinc-400 font-light py-1 cursor-pointer rounded-lg transition-colors duration-200 text-sm sm:text-base'
            >
              Show Description
            </button>
          </div>

          {/* Episode Content */}
          {openDesc && (
            <div className='px-3 pb-3 sm:px-4 sm:pb-4 transition-opacity duration-300'>
              {/* Episode Title and Runtime */}
              <h2 className='text-lg sm:text-xl font-semibold mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                <span>
                  S{season_number}E{episode_number}: {name}
                </span>
                {runtime && (
                  <span className='flex items-center text-sm sm:text-base font-light'>
                    <span className='w-1 h-1 bg-red-900 rounded-full inline-block mr-1'></span>
                    {runtime}m
                  </span>
                )}
              </h2>

              {/* Air Date */}
              <p className='text-xs sm:text-sm text-zinc-400 mb-2'>
                Air Date: {air_date || 'Unknown'}
              </p>

              {/* Overview */}
              <p className='text-sm sm:text-base mb-3 sm:mb-4'>
                {overview || 'No overview available.'}
              </p>

              {/* Rating and Hide Description Button */}
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0'>
                <p className='text-amber-300 font-light text-sm sm:text-base'>
                  {vote_average && vote_average.toFixed(1) + '/10'}
                </p>
                <button
                  onClick={() => setOpenDesc(false)}
                  className='text-red-900 text-sm sm:text-base active:text-red-800 cursor-pointer'
                >
                  Hide Description
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
