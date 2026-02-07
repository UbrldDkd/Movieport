import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import ContentCardWithContentRelations from '../ContentCard/ContentCardWithContentRelations';

export default function ProfileWatched({ username, items, subtab, isOwner }) {
  const ITEMS_PER_PAGE = 36;
  const [currentPage, setCurrentPage] = useState(1);
  const [view] = useState('sm'); // 'lg', 'md', 'sm'
  const filmsRef = useRef(null);
  const tvRef = useRef(null);
  const [borderStyle, setBorderStyle] = useState({ width: 0, left: 0 });
  const navigate = useNavigate();

  // Filter items by media type
  const movies = items?.filter((i) => i.media_type === 'movie') || [];
  const tvShows = items?.filter((i) => i.media_type === 'tv') || [];

  const filteredItems = subtab === 'tv' ? tvShows : movies;

  // Update sliding border position
  useEffect(() => {
    const refs = { movies: filmsRef, tv: tvRef };
    const el = refs[subtab || 'movies']?.current;
    if (!el) return;
    setBorderStyle({ width: el.offsetWidth, left: el.offsetLeft });
  }, [subtab]);

  if (!filteredItems || filteredItems.length === 0) {
    return (
      <div className='py-12 text-center text-zinc-400 font-medium text-sm bg-zinc-900/90 rounded-sm p-3'>
        {isOwner
          ? `You haven't watched any ${subtab === 'tv' ? 'TV shows' : 'films'} yet`
          : `${username} hasn't watched any ${subtab === 'tv' ? 'TV shows' : 'films'} yet`}
      </div>
    );
  }

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const cardWidth = view === 'lg' ? 150 : 70;

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className='bg-zinc-900/90 rounded-sm p-3 text-zinc-200'>
      {/* Tabs */}
      <div className='relative flex gap-2 sm:gap-4 text-xs font-semibold tracking-widest mb-3'>
        <button
          ref={filmsRef}
          onClick={() => navigate(`/${username}/watched/movies/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${
            subtab === 'movies' || !subtab ? 'text-zinc-200' : 'text-zinc-400'
          }`}
        >
          FILMS
        </button>

        <button
          ref={tvRef}
          onClick={() => navigate(`/${username}/watched/tv/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${
            subtab === 'tv' ? 'text-zinc-200' : 'text-zinc-400'
          }`}
        >
          TV-SHOWS
        </button>

        {/* Animated sliding border */}
        <div
          className='absolute bottom-0 h-px bg-zinc-200 transition-all duration-300'
          style={{
            width: borderStyle.width,
            transform: `translateX(${borderStyle.left}px)`,
          }}
        />
      </div>

      {/* Animated Tab Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={subtab || 'movies'}
          variants={tabVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div
            className='grid gap-2.5'
            style={{
              gridTemplateColumns: `repeat(auto-fill, ${cardWidth}px)`,
              justifyContent: 'center',
            }}
          >
            {paginatedItems.map((item, i) => (
              <div className='flex flex-col'>
                <ContentCardWithContentRelations
                  key={item.tmdb_id || `${item.tmdb?.id}-${i}`}
                  item={item}
                  view={view}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 mt-4'>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className='px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 disabled:opacity-50'
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-2 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-red-950 text-zinc-100'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className='px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 disabled:opacity-50'
              >
                Next
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
