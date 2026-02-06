import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Keys } from '../../../../utils/Keys';
import { AuthContext } from '../../../../api/account/auth/AuthContext';
import ContentCardActions from './ContentCardActions';
import ContentCardTooltip from './ContentCardTooltip';
import ContentCardPoster from './ContentCardPoster';

export default function ContentCard({ item, view }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false); // 👈 card-level load state

  const { details } = Keys.API1;
  const { user } = useContext(AuthContext);

  const mediaType = item?.[details.movieTitle] ? 'movie' : 'tv';

  const filteredItem = {
    tmdb_id: Number(item?.tmdb_id || item?.[details.id]),
    title: item?.[details.movieTitle] || item?.[details.tvTitle],
    release_date:
      item?.[details.movieReleaseDate] || item?.[details.tvReleaseDate],
    poster_path: item?.[details.poster],
    media_type: mediaType,
  };

  const current = user?.contentRelations?.find(
    (cr) => cr.tmdb_id === filteredItem.tmdb_id
  );

  const isLoggedIn = !!user;

  return (
    <div
      className='relative inline-block overflow-visible group'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* CARD-LEVEL LOADING PULSE */}
      {!loaded && (
        <div className='absolute inset-0 rounded-sm bg-zinc-700 animate-pulse-slow z-0' />
      )}

      <AnimatePresence>
        {hovered && (
          <div
            key='title-tooltip'
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className='absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center'
          >
            <div className='bg-zinc-900/90 font-semibold tracking-wider backdrop-blur-3xl text-zinc-300/90 text-sm px-2 py-1 rounded-md shadow-md whitespace-nowrap'>
              {filteredItem.title} ({filteredItem.release_date?.slice(0, 4)})
            </div>
            <div className='w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-zinc-800' />
          </div>
        )}
      </AnimatePresence>

      <Link to={`/watch/${filteredItem.media_type}/${filteredItem.tmdb_id}`}>
        <ContentCardPoster
          title={filteredItem.title}
          posterPath={filteredItem.poster_path}
          view={view}
          onLoad={() => setLoaded(true)} // 👈 notify card when ready
        />
      </Link>

      {isLoggedIn && (
        <ContentCardActions
          item={filteredItem}
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
            item={filteredItem}
            current={current}
            onClose={() => setMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
