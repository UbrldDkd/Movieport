// React
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

// Utils/Helpers
import { useIsLoggedIn } from '../../../utils/helpers/useIsLoggedIn';
import { cleanItem } from '../../../utils/helpers/cleanItem';
import { tooltipVariants } from '../../../utils/style/animations/motionVariants';

// Context
import { AuthContext } from '../../../api/account/auth/AuthContext';

// Components
import ContentCardPoster from './ContentCardPoster';
import ContentCardActions from './ContentCardActions';
import ContentCardTooltip from './ContentCardTooltip';

export default function ContentCard({ item, view }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Formats both tmdb and backend objects as one for multi-use
  const cleanedItem = cleanItem(item);

  const { user } = useContext(AuthContext);

  const current = user?.content_relations?.find(
    (cr) => cr.tmdb_id === cleanedItem.tmdb_id
  );

  const isLoggedIn = useIsLoggedIn();

  return (
    <div
      className='relative inline-block overflow-visible group'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* CARD-LEVEL LOADING PULSE */}
      {!loaded && (
        <div className='absolute inset-0 rounded-sm bg-zinc- animate-pulse-slow z-0' />
      )}

      {/* TODO: fix this loading state */}

      <AnimatePresence>
        {hovered && (
          <motion.div
            key='title-tooltip'
            variants={tooltipVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.2 }}
            className='absolute -top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center'
          >
            <div className='bg-zinc-800/90 font-semibold tracking-wider backdrop-blur-3xl text-zinc-300/90 text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap'>
              {cleanedItem.title} ({cleanedItem.release_date?.slice(0, 4)})
            </div>
            <div className='w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-zinc-800' />
          </motion.div>
        )}
      </AnimatePresence>

      <Link to={`/${cleanedItem.media_type}/${cleanedItem.tmdb_id}`}>
        <ContentCardPoster
          title={cleanedItem.title}
          posterPath={cleanedItem.poster_path}
          view={view}
          onLoad={() => setLoaded(true)}
        />
      </Link>

      {isLoggedIn && (
        <ContentCardActions
          item={cleanedItem}
          current={current}
          view={view}
          setMenuOpen={setMenuOpen}
        />
      )}

      {menuOpen && (
        <div
          className='absolute z-30 top-0 left-full pointer-events-auto'
          onMouseLeave={() => setMenuOpen(false)}
        >
          <ContentCardTooltip
            item={cleanedItem}
            current={current}
            onClose={() => setMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
