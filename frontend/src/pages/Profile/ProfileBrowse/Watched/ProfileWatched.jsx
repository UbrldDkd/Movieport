// React
import { useState, useEffect, useRef } from 'react';

// Third-party
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Components
import ContentDisplayBlock from '../../../../components/ContentDisplays/ContentDisplayBlock';
import Pagination from '../Pagination/Pagination';
import { tabVariants } from '../../../../utils/style/animations/motionVariants';

export default function ProfileWatched({ username, items, subtab, isOwner }) {
  const ITEMS_PER_PAGE = 36;
  const [currentPage, setCurrentPage] = useState(1);
  const filmsRef = useRef(null);
  const tvRef = useRef(null);
  const [borderStyle, setBorderStyle] = useState({ width: 0, left: 0 });
  const navigate = useNavigate();

  // Filter items by media type
  const films = items?.filter((i) => i.media_type === 'film') || [];
  const tvShows = items?.filter((i) => i.media_type === 'tv') || [];
  const filteredItems = subtab === 'tv' ? tvShows : films;

  // Update sliding border position
  useEffect(() => {
    const refs = { films: filmsRef, tv: tvRef };
    const el = refs[subtab || 'films']?.current;
    if (!el) return;
    setBorderStyle({ width: el.offsetWidth, left: el.offsetLeft });
  }, [subtab]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className='bg-zinc-900/90 rounded-sm p-3 text-zinc-200'>
      {/* Tabs */}
      <div className='relative flex gap-2 sm:gap-4 text-xs font-semibold tracking-widest mb-3'>
        <button
          ref={filmsRef}
          onClick={() => navigate(`/${username}/watched/films/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${
            subtab === 'films' || !subtab ? 'text-zinc-200' : 'text-zinc-400'
          }`}
        >
          FILMS
        </button>

        <button
          ref={tvRef}
          onClick={() => navigate(`/${username}/watched/tv/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${
            subtab === 'tv' ? 'text-zinc-300/90' : 'text-zinc-400'
          }`}
        >
          TV-SHOWS
        </button>

        {/* Animated sliding border */}
        <div
          className='absolute bottom-0 h-px bg-zinc-300/90 transition-all duration-300'
          style={{
            width: borderStyle.width,
            transform: `translateX(${borderStyle.left}px)`,
          }}
        />
      </div>

      {/* Tab Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={subtab || 'films'}
          variants={tabVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className=''
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {filteredItems.length > 0 ? (
            <>
              <div className='flex'>
                <ContentDisplayBlock
                  includeContentRelations={true}
                  displayAmount={ITEMS_PER_PAGE}
                  view='sm'
                  justify='start'
                  content={paginatedItems}
                />
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <div className='py-12 text-center text-zinc-400 font-medium text-sm'>
              {isOwner
                ? `You haven't liked any lists yet`
                : `${username} hasn't liked any lists yet`}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
