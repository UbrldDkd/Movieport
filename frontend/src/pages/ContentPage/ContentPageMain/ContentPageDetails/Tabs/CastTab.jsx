import { Link } from 'react-router-dom';
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
    <div className='w-full flex flex-col gap-0.5'>
      {cast.map((actor, index) => (
        <div
          key={index}
          className='flex items-center gap-2  rounded-sm transition-colors group'
        >
          <Link className='text-text-primary  hover:bg-bg-secondary transition-colors duration-50  rounded-sm py-1 px-2 font-semibold text-sm tracking-wide max-w-[120px] md:max-w-[150px] truncate'>
            {actor.name}
          </Link>
          {actor.character && (
            <>
              <span className='text-zinc-600 hover:cursor-default text-xs font-medium shrink-0'>
                as
              </span>
              <span className='text-zinc-400/80 font-medium text-sm truncate flex-1 max-w-[calc(100%-150px)] md:max-w-[calc(100%-190px)]'>
                {actor.character}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
