import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Keys } from '../../../utils/Keys';

export default function SeasonDropdown({
  seasonCount,
  selectedSeason,
  setSelectedSeason,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [, setSearchParams] = useSearchParams();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className='relative inline-block mb-4'>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className='
          px-3 py-2 
          rounded-md 
          border-none
          outline-none
          bg-zinc-900 
          text-zinc-200 
          border border-zinc-700 
          flex items-center justify-between
          w-40
          transition-colors duration-200
          hover:bg-zinc-800
          focus:outline-none focus:ring-2 focus:ring-red-900
        '
      >
        Season {selectedSeason}
        <span className='ml-2'>▼</span>
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute left-0 mt-2 w-40 
          rounded-md bg-zinc-900 shadow-lg border border-zinc-700
          transition-all duration-200 ease-out
          z-10
          ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <ul className='max-h-60 overflow-y-auto'>
          {[...Array(seasonCount)].map((_, i) => {
            const seasonNumber = i + 1;
            const isSelected = seasonNumber === selectedSeason;

            return (
              <li
                key={seasonNumber}
                onClick={() => {
                  setSelectedSeason(seasonNumber);

                  // Replace query params with only season
                  setSearchParams({ season: seasonNumber });

                  setOpen(false);
                }}
                className={`
                  px-3 py-2 cursor-pointer transition-colors duration-200
                  ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-300 cursor-default'
                      : 'hover:bg-zinc-700 text-zinc-200'
                  }
                `}
              >
                Season {seasonNumber}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
