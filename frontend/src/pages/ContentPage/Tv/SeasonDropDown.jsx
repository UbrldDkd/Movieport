import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function SeasonDropdown({
  seasonCount,
  selectedSeason,
  setSelectedSeason,
}) {
  const [open, setOpen] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const dropdownRef = useRef(null);
  const scrollRef = useRef(null);
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

  // Track scroll to show/hide scroll hint
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkScroll = () => {
      const hasOverflow = el.scrollHeight > el.clientHeight;
      const scrolledToBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      setShowScrollHint(hasOverflow && !scrolledToBottom);
    };

    if (open) checkScroll();
    el.addEventListener('scroll', checkScroll);
    return () => el.removeEventListener('scroll', checkScroll);
  }, [open]);

  // Fade in/out variants
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

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

      {/* AnimatePresence for fade */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={fadeVariants}
            transition={{ duration: 0.25 }}
            className={`
              absolute left-0 mt-2 w-full
              rounded-md bg-zinc-900 shadow-lg transition-all duration-200 ease-out
              z-10
              max-h-52 relative
            `}
          >
            {/* Scrollable content */}
            <ul
              ref={scrollRef}
              className='overflow-y-auto max-h-52 scrollbar-hide'
            >
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

            {/* Scroll hint arrow */}
            {showScrollHint && (
              <div className='absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none'>
                <svg
                  className='w-4 h-4 animate-bounce text-zinc-400'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
