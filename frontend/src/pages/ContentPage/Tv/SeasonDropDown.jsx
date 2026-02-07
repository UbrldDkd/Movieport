import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    <div ref={dropdownRef} className='relative block w-full mb-4'>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className='
          px-3 py-1.5
          rounded-md
          border-none
          outline-none
          bg-zinc-900/90
          text-zinc-300/90 tracking-wider
          border border-zinc-700
          flex items-center justify-between
          w-full
          transition-colors duration-200
          hover:bg-zinc-800/90
          focus:outline-none  focus:bg-zinc-800/90
        '
      >
        Season {selectedSeason}
        <span className='ml-2'>▼</span>
      </button>

      {/* Dropdown menu */}
      <div
        className={`
          absolute left-0 mt-2 w-full
          rounded-md bg-zinc-900 shadow-lg border border-zinc-700 scrollbar-hide transition-all duration-200 ease-out
          z-10
          ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <ul className='max-h-60 overflow-y-auto scrollbar-hide'>
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
                  px-3 py-1.5 cursor-pointer transition-colors duration-120
                  ${
                    isSelected
                      ? 'bg-zinc-800 text-zinc-300 cursor-pointer'
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
