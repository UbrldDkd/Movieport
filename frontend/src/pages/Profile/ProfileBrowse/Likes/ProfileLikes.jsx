// React
import { useState, useRef, useEffect } from 'react';

// Third-party
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// API hooks
import { useGetListsByIds } from '../../../../api/lists/useGetListsByIds';

// Utils animations
import { tabVariants } from '../../../../utils/style/animations/motionVariants';

// Components
import ProfileLikesFilms from './ProfileLikesFilms';
import ProfileLikesLists from './ProfileLikesLists';
import ProfileLikesTvShows from './ProfileLikesTvShows';

export default function ProfileLikes({
  items,
  username,
  subtab = 'films',
  isOwner,
  likedListIds,
}) {
  const filmsRef = useRef(null);
  const tvRef = useRef(null);
  const listsRef = useRef(null);
  const [borderStyle, setBorderStyle] = useState({ width: 0, left: 0 });

  const { lists, isLoading, error } = useGetListsByIds(likedListIds);
  const navigate = useNavigate();

  useEffect(() => {
    const refs = { films: filmsRef, 'tv-shows': tvRef, lists: listsRef };
    const el = refs[subtab]?.current;
    if (!el) return;

    setBorderStyle({ width: el.offsetWidth, left: el.offsetLeft });
  }, [subtab]);

  const films = items?.filter((i) => i.media_type === 'film');
  const tvShows = items?.filter((i) => i.media_type === 'tv');

  return (
    <div className='bg-zinc-900/90  rounded-sm p-2 sm:p-3 text-zinc-400'>
      {/* Tabs */}
      <div className='relative flex gap-2 sm:gap-4 text-xs font-semibold tracking-widest mb-3'>
        <button
          ref={filmsRef}
          onClick={() => navigate(`/${username}/likes/films/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${
            subtab === 'films' || !subtab ? 'text-zinc-200' : 'text-zinc-400'
          }`}
        >
          FILMS
        </button>

        <button
          ref={tvRef}
          onClick={() => navigate(`/${username}/likes/tv-shows/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${
            subtab === 'tv-shows' ? 'text-zinc-200' : 'text-zinc-400'
          }`}
        >
          TV-SHOWS
        </button>

        <button
          ref={listsRef}
          onClick={() => navigate(`/${username}/likes/lists/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${
            subtab === 'lists' ? 'text-zinc-200' : 'text-zinc-400'
          }`}
        >
          LISTS
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
        {subtab === 'films' && (
          <motion.div
            key='films'
            variants={tabVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ProfileLikesFilms
              items={films}
              username={username}
              isOwner={isOwner}
            />
          </motion.div>
        )}

        {subtab === 'tv-shows' && (
          <motion.div
            key='tv-shows'
            variants={tabVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ProfileLikesTvShows
              items={tvShows}
              username={username}
              isOwner={isOwner}
            />
          </motion.div>
        )}

        {subtab === 'lists' && (
          <motion.div
            key='lists'
            variants={tabVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {isLoading && (
              <div className='text-center py-8 text-sm animate-pulse'>
                Loading lists…
              </div>
            )}

            {error && (
              <div className='text-center py-8 text-sm text-red-900'>
                Failed to load lists
              </div>
            )}

            {!isLoading && !error && (
              <ProfileLikesLists
                lists={lists}
                username={username}
                isOwner={isOwner}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
