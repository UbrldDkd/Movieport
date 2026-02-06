import { useState } from 'react';
import ContentCard from '../ContentCard/ContentCard';

export default function ProfileWatchlist({ items, username, is_owner }) {
  const ITEMS_PER_PAGE = 36;
  const [currentPage, setCurrentPage] = useState(1);
  const view = 'lg'; // card size

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginatedItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const cardWidth = view === 'lg' ? 150 : 70;

  return (
    <div
      className={`grid gap-2.5 ${
        is_owner ? 'md:grid-cols-[2fr_1fr] sm:grid-cols-1' : 'grid-cols-[1fr]'
      }`}
    >
      {/* Main watchlist */}
      <div className='bg-zinc-900/90 border border-zinc-800 rounded-sm p-3 text-zinc-200'>
        <h2 className='text-xs font-semibold tracking-widest mb-3'>
          {items.length > 0 ? (
            <p>
              {`${is_owner ? 'YOU WANT' : username.toUpperCase() + ' WANTS'} TO SEE ${
                items.length
              } ${items.length > 1 ? 'FILMS' : 'FILM'}`}
            </p>
          ) : (
            <p>
              {`${is_owner ? 'YOUR' : username.toUpperCase() + "'S"} WATCHLIST IS EMPTY`}
            </p>
          )}
        </h2>

        {/* Watchlist items grid */}
        {items.length > 0 && (
          <>
            <div
              className='grid gap-2.5'
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
          </>
        )}
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
