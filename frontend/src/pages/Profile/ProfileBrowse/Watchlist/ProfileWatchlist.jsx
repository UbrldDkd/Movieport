import { useState } from 'react';
import ContentCard from '../ContentCard/ContentCard';
import { Link } from 'react-router-dom';

export default function ProfileWatchlist({ items, username, is_owner }) {
  const ITEMS_PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState('lg');

  // TODO add actions: clear watchlist, make watchlist private/public, instructions, adding a film
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginateditems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div
      className={ `grid gap-2.5 ${is_owner ? 'md:grid-cols-[2fr_1fr] sm:grid-cols-1' : 'grid-cols-[1fr]'}`}
    >
      {/* Main watchlist */}
      <div className='bg-zinc-900/90 border border-zinc-800 rounded-sm p-3 text-zinc-200'>
        <h2 className='text-xs font-semibold tracking-widest mb-3'>
          {items.length > 0 ? (
            <p>{`${is_owner ? 'YOU WANT' : username.toUpperCase() + ' WANTS'} TO SEE ${items.length} ${items.length > 1 ? 'FILMS' : 'FILM'}`}</p>
          ) : (
            <p>{`${is_owner ? 'YOUR' : username.toUpperCase() + "'S"} WATCHLIST IS EMPTY`}</p>
          )}
        </h2>

        <div
          className='grid gap-2.5 grid-cols-3 md:grid-cols-4 sm:grid-cols-4'
          
        >
          {paginateditems.map((item, i) => (
            <ContentCard
              key={item.tmdb_id || `${item.tmdb?.id}-${i}`}
              item={item}
              view={view}
            />
          ))}
        </div>
      </div>

      {/* Actions column for owner */}
      {is_owner && (
        <div className='bg-zinc-900/90 border border-zinc-800/90 rounded-sm p-2 text-zinc-200 flex flex-col gap-2'>
          <button className='bg-zinc-800/90 hover:cursor-pointer font-semibold hover:bg-zinc-700 px-3 py-2 rounded tracking-widest text-start text-xs'>
            Make Watchlist Private/Public
          </button>
          <button className='bg-zinc-800/90 hover:cursor-pointer font-semibold hover:bg-zinc-700 px-3 py-2 rounded tracking-widest text-start text-xs'>
            Clear Watchlist
          </button>
        </div>
      )}
    </div>
  );
}
