export default function DetailsTab({ details, isLoading }) {
  const {
    studios,
    countries,
    primaryLanguage,
    spokenLanguages,
    alternativeTitles,
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

  const groupedAlternativeTitles = alternativeTitles.reduce((acc, title) => {
    const country = title.country || 'Unknown';
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(title);
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