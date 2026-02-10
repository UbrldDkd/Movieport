// DeadEndFilters.jsx
import React from 'react';
import { GenreMap } from '../../utils/constants/GenreMap.js';

export const DeadEndFilters = ({
  genreIds,
  selectedYears,
  selectedCountries,
  value,
}) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center text-zinc-400 px-4 relative'>
      {/* Spinning background animation */}
      <div className='absolute inset-0 flex items-center justify-center overflow-hidden'>
        <div className='w-[300px] h-[300px] border-8 border-red-800/10 rounded-full animate-spin-slow'></div>
        <div className='w-[200px] h-[200px] border-4 border-red-500/20 rounded-full animate-spin-reverse-slow'></div>
      </div>

      {/* Text showing what filters yielded no content */}
      <div className='flex flex-wrap items-center justify-center gap-2 text-base max-w-[90%] relative z-10'>
        <span className='text-gray-300'>No content found by:</span>

        {/* Search term */}
        {value && (
          <span className='break-words'>
            <span className='text-zinc-200'> Search term:</span> {value}
          </span>
        )}

        {/* Genres */}
        {genreIds.length > 0 && (
          <span className='break-words'>
            <span className='text-zinc-200'> Genres:</span>{' '}
            {genreIds.map((id) => GenreMap[id]).join(', ')}
          </span>
        )}

        {/* Years */}
        {selectedYears.length > 0 && (
          <span className='break-words'>
            <span className='text-zinc-200'> Years:</span>{' '}
            {selectedYears.join(', ')}
          </span>
        )}

        {/* Countries */}
        {selectedCountries.length > 0 && (
          <span className='break-words'>
            <span className='text-zinc-200'> Countries:</span>{' '}
            {selectedCountries.join(', ')}
          </span>
        )}
      </div>
    </div>
  );
};
