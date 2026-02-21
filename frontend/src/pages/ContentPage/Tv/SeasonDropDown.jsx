// SeasonDropdown.jsx
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeVariants } from '../../../utils/style/animations/motionVariants';
import ScrollHintArrow from '../../../utils/style/ui/ScrollHintArrow';

export default function SeasonDropdown({
  seasonCount,
  selectedSeason,
  setSelectedSeason,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [, setSearchParams] = useSearchParams();

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
      <button
        onClick={() => setOpen(!open)}
        className='px-3 py-1.5 rounded-md border-none outline-none bg-bg-secondary text-text-primary tracking-wider border border-zinc-700 flex items-center justify-between w-full transition-colors duration-200 hover:bg-zinc-800/90 focus:outline-none focus:bg-zinc-800/90'
      >
        Season {selectedSeason}
        <span className='ml-2'>▼</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={fadeVariants}
            transition={{ duration: 0.25 }}
            className='absolute left-0 mt-2 w-full rounded-md bg-bg-secondary shadow-lg transition-all duration-200 ease-out z-10 max-h-52 relative'
          >
            <ul className='overflow-y-auto max-h-52 scrollbar-hide'>
              {[...Array(seasonCount)].map((_, i) => {
                const seasonNumber = i + 1;
                const isSelected = seasonNumber === selectedSeason;

                return (
                  <li
                    key={seasonNumber}
                    onClick={() => {
                      setSelectedSeason(seasonNumber);
                      setSearchParams({ season: seasonNumber });
                      setOpen(false);
                    }}
                    className={`px-3 py-1.5 cursor-pointer transition-colors duration-120 ${
                      isSelected
                        ? 'bg-zinc-800 text-text-primary  cursor-pointer'
                        : 'hover:bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    Season {seasonNumber}
                  </li>
                );
              })}
              <ScrollHintArrow direction='vertical' />
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
