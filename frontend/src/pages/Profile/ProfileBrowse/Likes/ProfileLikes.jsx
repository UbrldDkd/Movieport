// Standard library imports
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


// Local application imports
import { useGetListsByIds } from '../../../../API/lists/useGetListsByIds';
import ProfileLikesFilms from './ProfileLikesFilms';
import ProfileLikesLists from './ProfileLikesLists';
import { Navigate } from 'react-router-dom';

export default function ProfileLikes({
  items,
  username,
  subtab,
  is_owner,
  likedListIds,
}) {
  const [isLoading, setIsLoading] = useState({ lists: false });

  // Refs for sliding border animation
  const filmsRef = useRef(null);
  const tvRef = useRef(null);
  const listsRef = useRef(null);
  const [borderStyle, setBorderStyle] = useState({ width: 0, left: 0 });

  // Fetch liked lists
  const lists = useGetListsByIds(likedListIds);

  const navigate = useNavigate()

  // Update sliding border position when tab changes
  useEffect(() => {
    const refs = {
      films: filmsRef,
      'tv-shows': tvRef,
      lists: listsRef,
    };

    const el = refs[subtab]?.current;
    if (!el) return;

    setBorderStyle({
      width: el.offsetWidth,
      left: el.offsetLeft,
    });
  }, [subtab]);

  return (
    <div className='bg-zinc-900/90 border border-zinc-800 rounded-sm p-2 sm:p-3 text-zinc-400'>
      {/* Tabs */}
      <div className='relative flex gap-2 sm:gap-4 text-xs font-semibold tracking-widest mb-3'>
        <button
          ref={filmsRef}
          onClick={() => navigate(`/${username}/likes/films/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${subtab === 'films' || !subtab ? 'text-zinc-200' : 'text-zinc-400'}`}
        >
          FILMS
        </button>

        <button
          ref={tvRef}
          onClick={() => navigate(`/${username}/likes/tv-shows/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${subtab === 'tv-shows' ? 'text-zinc-200' : 'text-zinc-400'}`}
        >
          TV-SHOWS
        </button>

        <button
          ref={listsRef}
          onClick={() => navigate(`/${username}/likes/lists/`)}
          className={`whitespace-nowrap hover:cursor-pointer ${subtab === 'lists' ? 'text-zinc-200' : 'text-zinc-400'}`}
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

      {/* Content */}
      {subtab === 'films' && <ProfileLikesFilms items={items} />}

      {subtab === 'tv-shows' && (
        <div className='text-center py-8 text-sm'>TV Shows coming soon</div>
      )}

      {subtab === 'lists' &&
        (isLoading.lists ? (
          <div className='text-center py-8 text-sm'>Loading lists...</div>
        ) : (
          <ProfileLikesLists lists={lists} />
        ))}
    </div>
  );
}
