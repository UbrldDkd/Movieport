import { useState } from 'react';
import ContentDisplayBlock from '../../../../components/ContentDisplays/ContentDisplayBlock';
import Pagination from '../Pagination/Pagination';

export default function ProfileWatchlist({ items, username, isOwner }) {
  const ITEMS_PER_PAGE = 36;
  const [currentPage, setCurrentPage] = useState(1);
  const view = 'lg'; // card size

  if (!items || items.length === 0) {
    return (
      <div className='py-12 text-center text-zinc-400 font-medium text-sm bg-zinc-900/90 rounded-sm p-3'>
        {isOwner
          ? 'Your watchlist is empty'
          : `${username} hasn't added any items to their watchlist yet`}
      </div>
    );
  }

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div
      className={`grid gap-2 ${
        isOwner
          ? 'md:grid-cols-[2fr_1fr] md:grid sm:flex sm:flex-col-reverse'
          : 'grid-cols-[1fr]'
      }`}
    >
      {/* Main watchlist */}
      <div className='bg-zinc-900/90 rounded-sm p-3 text-zinc-200'>
        <h2 className='text-xs font-semibold tracking-widest mb-3'>
          {`${isOwner ? 'YOU WANT' : username.toUpperCase() + ' WANTS'} TO SEE ${
            items.length
          } ${items.length > 1 ? 'FILMS' : 'FILM'}`}
        </h2>

        <ContentDisplayBlock
          content={paginatedItems}
          view={view}
          justify='start'
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Actions column for owner */}
      {isOwner && (
        <div className='bg-zinc-900/90  rounded-sm p-2 text-zinc-200 flex flex-col gap-2'>
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
