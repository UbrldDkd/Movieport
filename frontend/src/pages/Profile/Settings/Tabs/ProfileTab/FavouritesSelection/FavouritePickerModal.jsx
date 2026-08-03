import { useState, useEffect } from 'react';
import { useFetchSearch } from '../../../../../../pages/SearchResultsPage/hooks/useFetchSearch';
import Spinner from '../../../../../../components/Common/loadingScreens/Spinner';

export default function FavoritePickerModal({
  isOpen,
  onClose,
  onSelect,
  items,
}) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  const { content = [], isLoading } = useFetchSearch({
    value: query,
    type: 'both',
    currentPage: 1,
    contentPerPage: 50,
  });

  useEffect(() => {
    let timeout;

    if (isLoading) {
      timeout = setTimeout(() => {
        setShowLoading(true);
      }, 250);
    } else {
      setShowLoading(false);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!isOpen) return null;

  const selectedIds = new Set((items || []).map((i) => i?.tmdb_id || i?.id));

  return (
    <div className='fixed inset-0 z-999 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/70 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className='relative z-10 w-full max-w-md bg-bg-secondary border border-zinc-800 rounded-sm p-4 flex flex-col gap-3 text-text-primary shadow-xl'
      >
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h2 className='font-semibold tracking-widest'>Add a favourite</h2>

          <button
            onClick={onClose}
            className='text-zinc-500 hover:text-zinc-100 transition-colors hover:cursor-pointer'
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <input
          type='text'
          placeholder='Search movies or TV shows'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-transparent text-sm text-zinc-200 placeholder-zinc-500 px-2 py-1 outline-none rounded tracking-wide border-2 border-zinc-800 focus:border-zinc-700'
        />

        {/* Results */}
        <div className='flex flex-col gap-2 max-h-80 overflow-y-auto scrollbar-hide'>
          {showLoading ? (
            <Spinner />
          ) : (
            <>
              {content.map((item) => {
                const isDisabled = selectedIds.has(item.id);

                const title = item.title || item.name;

                const date = item.release_date || item.first_air_date;

                const year = date ? new Date(date).getFullYear() : '—';

                const type = item.first_air_date ? 'TV' : 'Movie';

                return (
                  <button
                    key={item.id}
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return;

                      onSelect(item);
                      onClose();
                    }}
                    className={`w-full flex justify-between items-center px-3 py-1.5 rounded transition-colors ${
                      isDisabled
                        ? 'bg-zinc-800 opacity-50 cursor-default'
                        : 'bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer'
                    }`}
                  >
                    <div className='flex flex-col items-start font-semibold tracking-wide '>
                      <span className='text-sm text-zinc-300'>{title}</span>

                      <span className='text-xs text-zinc-500'>{year}</span>
                    </div>

                    <div className='flex items-center gap-2'>
                      {isDisabled && (
                        <span className='text-zinc-100 text-xs'>✓</span>
                      )}

                      <span className='text-xs uppercase tracking-wide text-zinc-400'>
                        {type}
                      </span>
                    </div>
                  </button>
                );
              })}

              {!isLoading && search.trim() && content.length === 0 && (
                <div className='text-sm text-zinc-400 py-6 font-medium  text-center'>
                  No results found
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
