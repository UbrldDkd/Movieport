import FilterBy from './FilterBy.jsx';

const LABELS = {
  genre: 'Genre',
  year: 'Year',
  country: 'Country',
  decade: 'Decade',
  service: 'Service',
};

export default function FilteredResultsSelectionPanel({ mediaType, filters }) {
  const filterMediaType = mediaType === 'movie' ? 'films' : 'tv';

  const activeFilters = [];

  if (filters.genre?.length) {
    activeFilters.push(`${LABELS.genre}: ${filters.genre.join(', ')}`);
  }

  if (filters.year?.length) {
    activeFilters.push(`${LABELS.year}: ${filters.year.join(', ')}`);
  }

  if (filters.country?.length) {
    activeFilters.push(`${LABELS.country}: ${filters.country.join(', ')}`);
  }

  if (filters.decade) {
    activeFilters.push(LABELS.decade);
  }

  if (filters.service) {
    activeFilters.push(`${LABELS.service}: ${filters.service}`);
  }

  return (
    <div className='hidden lg:flex lg:flex-col gap-4 w-full max-w-sm'>
      <div className='bg-bg-secondary rounded-sm border border-zinc-800 p-4 text-zinc-100 shadow-sm'>
        <div className='font-semibold text-xs tracking-widest text-text-primary mb-2'>
          FILTERS
        </div>
        <div className='text-sm text-zinc-300 leading-relaxed'>
          Browse by genre, year, country, or service. Use the filters below to
          refine results across the current collection.
        </div>

        <div className='mt-4 space-y-2'>
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <div
                key={filter}
                className='rounded-sm border border-zinc-700 bg-zinc-950/70 px-3 py-2 text-xs text-zinc-200'
              >
                {filter}
              </div>
            ))
          ) : (
            <div className='rounded-sm border border-dashed border-zinc-700 bg-zinc-950/70 px-3 py-2 text-xs text-zinc-400'>
              No active filters yet. Pick one to narrow the list.
            </div>
          )}
        </div>
      </div>

      <div className='bg-bg-secondary rounded-sm border border-zinc-800 p-4 text-zinc-100 shadow-sm'>
        <div className='font-semibold text-xs tracking-widest text-text-primary mb-3'>
          BROWSE BY
        </div>
      </div>
    </div>
  );
}
