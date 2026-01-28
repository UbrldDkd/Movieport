import { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Keys } from '../../../../utils/Keys';
import { AuthContext } from '../../../../API/Account/Auth/AuthContext';
import ContentCardActions from './ContentCardActions';
import ContentCardTooltip from './ContentCardTooltip';
import ContentCardPoster from './ContentCardPoster';

export default function ContentCard({ item, view }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimeout = useRef(null);

  const { title, titleTv, releaseDate, releaseDateTv, poster } =
    Keys.API1.details;
  const { user } = useContext(AuthContext);

  const posterPath = item.tmdb?.[poster];
  const mediaType = item.tmdb?.[title] ? 'movie' : 'tv';
  const tmdbId = item.tmdb_id;

  const contentRelation = user?.contentRelations?.find(
    (cr) => cr.tmdb_id === tmdbId
  );

  const isLoggedIn = !!user;

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => setHovered(true), 1100);
  };
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setHovered(false);
  };

  useEffect(() => () => clearTimeout(hoverTimeout.current), []);

  // responsive width based on grid container
  const widthClass =
    view === 'lg'
      ? 'w-full max-w-[150px]'
      : view === 'md'
      ? 'w-full max-w-[120px]'
      : 'w-full max-w-[90px]';

  return (
    <div
      className={`relative ${widthClass} group`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: '2 / 3' }} // maintain poster ratio
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="title-tooltip"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-9 font-semibold tracking-wide left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
          >
            <div className="bg-zinc-800/90 backdrop-blur-3xl text-[13.5px] text-zinc-300 text-sm px-2 py-1 rounded-md shadow-md text-center whitespace-nowrap">
              {item.tmdb?.title || item.tmdb?.titleTv} (
              {(item.tmdb?.[releaseDate] || item.tmdb?.[releaseDateTv])?.slice(
                0,
                4
              )}
              )
            </div>
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-zinc-800" />
          </motion.div>
        )}
      </AnimatePresence>

      <Link to={`/watch/${mediaType}/${tmdbId}`}>
        <ContentCardPoster
          title={item.tmdb?.title || item.tmdb?.titleTv}
          posterPath={posterPath}
        />
      </Link>

      {isLoggedIn && (
        <ContentCardActions
          contentRelation={contentRelation}
          view={view}
          setMenuOpen={setMenuOpen}
        />
      )}

      {menuOpen && (
        <div
          className="absolute z-20 top-0 left-full pointer-events-auto"
          onMouseLeave={() => setMenuOpen(false)}
        >
          <ContentCardTooltip
            tmdbId={tmdbId}
            onClose={() => setMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
