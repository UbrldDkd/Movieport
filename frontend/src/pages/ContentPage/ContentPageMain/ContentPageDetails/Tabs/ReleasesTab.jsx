export default function ReleasesTab({ releaseDates = [], isLoading }) {
  const renderSkeleton = () => (
    <div className='space-y-4 animate-pulse'>
      {[...Array(5)].map((_, i) => (
        <div key={i} className='flex items-center justify-between'>
          <div className='space-y-2'>
            <div className='h-4 w-16 bg-zinc-800/50 rounded-sm' />
            <div className='h-3 w-24 bg-zinc-800/30 rounded-sm' />
          </div>
          <div className='h-4 w-20 bg-zinc-800/30 rounded-sm' />
        </div>
      ))}
    </div>
  );

  if (isLoading) return renderSkeleton();

  const formatReleaseDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const groupedReleaseDates = releaseDates.reduce((acc, date) => {
    if (!acc[date.country]) {
      acc[date.country] = [];
    }
    acc[date.country].push(date);
    return acc;
  }, {});

  const sortedCountries = Object.entries(groupedReleaseDates)
    .map(([country, dates]) => {
      const sortedDates = dates.sort((a, b) => new Date(a.date) - new Date(b.date));
      return { country, dates: sortedDates, premiereDate: sortedDates[0]?.date };
    })
    .sort((a, b) => new Date(a.premiereDate) - new Date(b.premiereDate));

  return (
    <div className='space-y-1'>
      {sortedCountries.map(({ country, dates }) => (
        <div
          key={country}
          className='flex items-center justify-between py-1.5 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors group'
        >
          <div className='flex items-center gap-3'>
            <span className='text-zinc-500 text-xs font-medium bg-zinc-900/50 px-1.5 py-0.5 rounded'>
              {country}
            </span>
            <span className='text-zinc-400 text-sm'>
              {dates.map(d => d.certification || 'Unrated').join(', ')}
            </span>
          </div>
          <div className='text-right space-y-0.5'>
            {dates.slice(0, 2).map((d, idx) => (
              <div key={idx} className='text-xs text-zinc-400'>
                {formatReleaseDate(d.date)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}