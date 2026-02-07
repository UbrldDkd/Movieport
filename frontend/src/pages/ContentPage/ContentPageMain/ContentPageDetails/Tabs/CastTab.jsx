// tabs/CastTab.jsx
export default function CastTab({ cast, isLoading }) {
  if (isLoading) {
    return (
      <div className='space-y-4 animate-pulse'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='h-12 bg-zinc-800/50 rounded-sm' />
        ))}
      </div>
    );
  }

  if (!cast.length) {
    return (
      <div className='text-zinc-500 text-sm py-4'>
        No cast information available
      </div>
    );
  }

  return (
    <div className='w-full'>
      {cast.map((actor, index) => (
        <div
          key={index}
          className='flex items-center gap-2 py-1.5 px-2 hover:bg-zinc-900/30 rounded-sm transition-colors group'
        >
          <span className='text-zinc-200 font-semibold text-sm tracking-wide max-w-[120px] md:max-w-[150px] truncate'>
            {actor.name}
          </span>
          <span className='text-zinc-600 hover:cursor-default text-xs font-medium shrink-0'>
            as
          </span>
          <span className='text-zinc-400 text-sm truncate flex-1 max-w-[calc(100%-150px)] md:max-w-[calc(100%-190px)]'>
            {actor.character}
          </span>
        </div>
      ))}
    </div>
  );
}
