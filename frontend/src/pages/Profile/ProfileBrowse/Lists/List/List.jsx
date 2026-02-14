import { useState, useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetList } from '../../../../../api/lists/useGetList';
import { AuthContext } from '../../../../../api/account/auth/AuthContext';
import ListHeader from './ListHeader';
import ListItemsDisplay from './ListItemsDisplay';
import ListActions from './ListActions';
import WatchedPercentage from './WatchedPercentage';

const ITEMS_PER_PAGE = 30;

export default function List() {
  const [page, setPage] = useState(1);
  const [view, setView] = useState('grid');
  const { user } = useContext(AuthContext);
  const { username, title_slug } = useParams();
  const {
    list: fetchedList,
    loading,
    error,
  } = useGetList(username, title_slug);

  const list = useMemo(() => {
    if (user?.username === username && user?.lists?.length) {
      return user.lists.find((l) => l.title_slug === title_slug) || fetchedList;
    }
    return fetchedList;
  }, [user, username, title_slug, fetchedList]);

  const { items, totalPages } = useMemo(() => {
    if (!list?.items) return { items: [], totalPages: 0 };
    const start = (page - 1) * ITEMS_PER_PAGE;
    return {
      items: list.items.slice(start, start + ITEMS_PER_PAGE),
      totalPages: Math.ceil(list.items.length / ITEMS_PER_PAGE),
    };
  }, [list, page]);

  const watchedCount = useMemo(() => {
    if (!list?.items || !user?.contentRelations) return 0;
    const ids = new Set(list.items.map((i) => i.tmdb_id));
    return user.contentRelations.filter(
      (cr) => ids.has(cr.tmdb_id) && cr.watched
    ).length;
  }, [list, user]);

  if (loading) return null;

  if (!list || error) {
    return (
      <div className='min-h-screen w-full bg-zinc-950 text-zinc-200 flex items-center justify-center'>
        <div className='text-zinc-400 g'>List not found</div>
      </div>
    );
  }

  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className='min-h-screen w-full bg-zinc-950 text-zinc-200 overflow-x-hidden'>
      <div className='mx-auto max-w-[1000px] mt-2 grid grid-cols-1 lg:grid-cols-[6fr_1.3fr] gap-2.5 min-w-0'>
        {/* Main content */}
        <div className='bg-zinc-900/90 p-3 border border-zinc-800 rounded-sm overflow-visible'>
          <ListHeader
            list={list}
            username={username}
            view={view}
            setView={setView}
          />
          <ListItemsDisplay items={items} view={view} />
          {totalPages > 1 && (
            <div className='flex justify-between items-center mt-6 text-xs text-zinc-400 px-2 py-1'>
              <button
                onClick={prevPage}
                disabled={page === 1}
                className='disabled:opacity-50 disabled:cursor-not-allowed hover:text-zinc-200 transition-colors'
              >
                Previous
              </button>
              <span className='text-zinc-300'>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className='disabled:opacity-50 disabled:cursor-not-allowed hover:text-zinc-200 transition-colors'
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className='flex flex-col gap-2'>
          <ListActions username={username} list={list} />
          <WatchedPercentage
            watchedCount={watchedCount}
            totalCount={list.items.length}
          />
        </div>
      </div>
    </div>
  );
}
