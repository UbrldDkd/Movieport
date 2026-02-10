// ProfileLikesTvShows.jsx

import { useState, useEffect } from 'react';
import ContentCard from '../../../../components/ContentDisplays/ContentCard/ContentCard';

export default function ProfileLikesTvShows({ items, username, isOwner }) {
  const ITEMS_PER_PAGE = 36;
  const [currentPage, setCurrentPage] = useState(1);
  const [view] = useState('lg'); // 'lg' or 'md' or 'sm'

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {}, [items]);

  const cardWidth = view === 'lg' ? 150 : view === 'md' ? 120 : 90;

  if (!items || items.length === 0) {
    return (
      <div className='py-12 text-center text-zinc-400 font-medium text-sm'>
        {isOwner
          ? `You haven't liked any tv-shows yet`
          : `${username} hasn't liked any tv-shows yet`}
      </div>
    );
  }

  return (
    <>
      <div
        className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5'
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${cardWidth}px)`,
          justifyContent: 'center',
        }}
      >
        {paginatedItems.map((item, i) => (
          <ContentCard
            key={item.tmdb_id || `${item.tmdb?.id}-${i}`}
            item={item}
            view={view}
          />
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className='px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 disabled:opacity-50'
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
