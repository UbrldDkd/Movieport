// MiniMenu.jsx
import React from 'react';
import { useToggleContentRelation } from '../../../../API/ContentRelations/useToggleContentRelation';
import { ListsModalContext } from '../../../../API/Lists/Modal/Context/ListsModalContext';
import { AuthContext } from '../../../../API/account/auth/AuthContext';
import { useContext } from 'react';

export default function ContentCardTooltip({ tmdbId, onClose }) {
  const { openModal } = useContext(ListsModalContext);

  const { user } = useContext(AuthContext);

  const current =
    user?.contentRelations?.find((r) => r.tmdb_id === Number(tmdbId)) || {};

  function handleClick(field) {
    toggleField(tmdbId, field);
    onClose();
  }

  const toggleField = useToggleContentRelation();

  return (
    <div className='absolute top-0 left-full ml-2 w-36 bg-zinc-800/70 backdrop-blur-3xl shadow-lg rounded-md p-1.5 flex flex-col gap-1.5 z-20'>
      {/* Triangle for thought-bubble effect */}
      <div className='absolute -left-2 top-2 w-0 h-0 border-t-6 border-b-6 border-r-6 border-t-transparent border-b-transparent border-r-zinc-800'></div>

      {/* Rating placeholder */}
      <div className='flex justify-center gap-1.5 my-1.5 '>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className='w-4 h-4 bg-amber-400/40 rounded-full' />
        ))}
      </div>

      <button
        onClick={() => handleClick('watchlisted')}
        className='w-full py-1.5 rounded bg-zinc-900  hover:bg-zinc-600 hover:cursor-pointer hover:text-zinc-100 text-xs tracking-wider font-semibold text-zinc-300'
      >
        {current.watchlisted ? 'remove from Watchlist' : 'add to Watchlist'}
      </button>
      <button
        onClick={() => openModal(tmdbId)}
        className='w-full py-1.5 rounded bg-zinc-900  hover:bg-zinc-600 hover:cursor-pointer hover:text-zinc-100 text-xs tracking-wider font-semibold text-zinc-300'
      >
        Add to List
      </button>
    </div>
  );
}
