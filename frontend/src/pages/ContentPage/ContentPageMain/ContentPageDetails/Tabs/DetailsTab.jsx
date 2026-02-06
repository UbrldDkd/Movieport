export default function DetailsTab({ details, isLoading }) {
  const {
    studios,
    countries,
    primaryLanguage,
    spokenLanguages,
    alternativeTitles,
    releaseDates,
  } = details;

  const renderSkeleton = () => (
    <div className='space-y-6 animate-pulse'>
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <div className='h-4 w-24 bg-zinc-800/50 rounded-sm mb-3' />
          <div className='space-y-2'>
            <div className='h-8 bg-zinc-800/30 rounded-sm' />
            <div className='h-8 bg-zinc-800/30 rounded-sm' />
          </div>
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

  const groupedAlternativeTitles = alternativeTitles.reduce((acc, title) => {
    const country = title.country || 'Unknown';
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(title);
    return acc;
  }, {});

  const groupedReleaseDates = releaseDates.reduce((acc, date) => {
    if (!acc[date.country]) {
      acc[date.country] = [];
    }
    acc[date.country].push(date);
    return acc;
  }, {});

  return (
    <div className='space-y-6'>
      {Object.keys(groupedAlternativeTitles).length > 0 && (
        <div>
          <h3 className='text-zinc-200 font-semibold tracking-wider uppercase text-xs mb-3'>
            Alternative Titles
          </h3>
          <div className='space-y-3'>
            {Object.entries(groupedAlternativeTitles).slice(0, 6).map(([country, titles]) => (
              <div key={country} className='space-y-1'>
                <div className='text-zinc-500 text-xs font-medium'>
                  {country}
                </div>
                {titles.slice(0, 2).map((title, index) => (
                  <div
                    key={index}
                    className='text-zinc-400 text-sm py-1 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors'
                  >
                    {title.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {Object.keys(groupedReleaseDates).length > 0 && (
        <div>
          <h3 className='text-zinc-200 font-semibold tracking-wider uppercase text-xs mb-3'>
            Release Dates
          </h3>
          <div className='space-y-1'>
            {Object.entries(groupedReleaseDates).slice(0, 8).map(([country, dates]) => {
              const sortedDates = dates.sort((a, b) => new Date(a.date) - new Date(b.date));
              return (
                <div
                  key={country}
                  className='flex items-center justify-between py-1.5 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors group'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-zinc-500 text-xs font-medium bg-zinc-900/50 px-1.5 py-0.5 rounded'>
                      {country}
                    </span>
                    <span className='text-zinc-400 text-sm'>
                      {sortedDates.map(d => d.certification || 'Unrated').join(', ')}
                    </span>
                  </div>
                  <span className='text-zinc-400 text-xs'>
                    {formatReleaseDate(sortedDates[0].date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {studios.length > 0 && (
        <div>
          <h3 className='text-zinc-200 font-semibold tracking-wider uppercase text-xs mb-3'>
            {studios.length > 1 ? 'Studios' : 'Studio'}
          </h3>
          <div className='space-y-1'>
            {studios.map((studio, index) => (
              <div
                key={index}
                className='text-zinc-400 text-sm py-1 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors'
              >
                {studio}
              </div>
            ))}
          </div>
        </div>
      )}

      {countries.length > 0 && (
        <div>
          <h3 className='text-zinc-200 font-semibold tracking-wider uppercase text-xs mb-3'>
            {countries.length > 1 ? 'Countries' : 'Country'}
          </h3>
          <div className='space-y-1'>
            {countries.map((country, index) => (
              <div
                key={index}
                className='text-zinc-400 text-sm py-1 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors'
              >
                {country}
              </div>
            ))}
          </div>
        </div>
      )}

      {primaryLanguage && (
        <div>
          <h3 className='text-zinc-200 font-semibold tracking-wider uppercase text-xs mb-3'>
            Primary Language
          </h3>
          <div className='text-zinc-400 text-sm py-1 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors'>
            {primaryLanguage}
          </div>
        </div>
      )}

      {spokenLanguages.length > 0 && (
        <div>
          <h3 className='text-zinc-200 font-semibold tracking-wider uppercase text-xs mb-3'>
            Spoken Languages
          </h3>
          <div className='space-y-1'>
            {spokenLanguages.map((lang, index) => (
              <div
                key={index}
                className='text-zinc-400 text-sm py-1 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors'
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
