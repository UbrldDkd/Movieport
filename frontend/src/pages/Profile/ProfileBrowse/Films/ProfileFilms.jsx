import { useContext, useState } from 'react';
import { AuthContext } from '../../../../api/account/auth/AuthContext';
import ContentCard from '../ContentCard/ContentCard';

export default function ProfileFilms() {
  const [view] = useState('lg');
  const { user } = useContext(AuthContext);
  const items = user?.contentRelations.filter((r) => r.watched); // filter for watched

  const ITEMS_PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const paginateditems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className='bg-zinc-900/90 rounded-sm p-3  text-zinc-200'>
      <h2 className='text-xs font-semibold  tracking-widest mb-3'>WATCHED</h2>

      <div
        className={`grid gap-2.5 ${view == 'lg' ? 'grid-cols-6' : view == 'sm' ? 'grid-cols-12 sm:grid-cols-3' : ''}`}
      >
        {paginateditems.map((item, i) => (
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
    </div>
  );
}
