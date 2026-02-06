export default function ContentPageInListsSection({ lists = [], isLoading }) {
  if (isLoading) {
    return (
      <div className='mt-8'>
        <h2 className='text-lg font-semibold text-zinc-200 mb-4'>
          Popular Lists featuring this
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='bg-zinc-800/30 p-4 rounded-sm animate-pulse'
            >
              <div className='h-4 w-3/4 bg-zinc-800/50 rounded mb-2' />
              <div className='h-3 w-1/2 bg-zinc-800/50 rounded mb-2' />
              <div className='h-3 w-full bg-zinc-800/50 rounded' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const staticLists = [
    {
      id: 1,
      name: 'Best Sci-Fi Films of the 2010s',
      description: 'A collection of groundbreaking science fiction movies.',
      filmCount: 47,
      likes: '12K',
      creator: 'scifi_fan',
    },
    {
      id: 2,
      name: 'Mind-Bending Movies That Will Blow Your Mind',
      description: 'Films that challenge reality and perception.',
      filmCount: 23,
      likes: '8.5K',
      creator: 'mind_bender',
    },
    {
      id: 3,
      name: "Director's Masterpieces",
      description: 'Essential films from visionary directors.',
      filmCount: 31,
      likes: '5.2K',
      creator: 'film_buffs_unite',
    },
    {
      id: 4,
      name: 'Visual Spectacles',
      description: 'Movies with stunning cinematography and special effects.',
      filmCount: 18,
      likes: '3.1K',
      creator: 'visual_junkie',
    },
  ];

  const displayLists = lists.length > 0 ? lists : staticLists;

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-semibold text-zinc-200 mb-4'>
        Popular Lists featuring this
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {displayLists.slice(0, 4).map((list) => (
          <div
            key={list.id}
            className='bg-zinc-800/30 p-4 rounded-sm hover:bg-zinc-800/40 transition-colors cursor-pointer group'
          >
            <h3 className='text-sm font-semibold text-zinc-300 mb-2 group-hover:text-zinc-200 transition-colors'>
              {list.name}
            </h3>
            <p className='text-xs text-zinc-500 leading-relaxed mb-3 line-clamp-2'>
              {list.description}
            </p>
            <div className='flex items-center justify-between text-xs text-zinc-500'>
              <span>{list.filmCount} films</span>
              <div className='flex items-center gap-2'>
                <span>by {list.creator}</span>
                <span>•</span>
                <span className='flex items-center gap-1'>
                  <svg className='w-3 h-3 fill-current' viewBox='0 0 10 10'>
                    <path d='M5 0L6.5 3.5L10 3.5L7.5 5.5L8.5 10L5 7.5L1.5 10L2.5 5.5L0 3.5L3.5 3.5L5 0Z' />
                  </svg>
                  {list.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='mt-4 text-sm text-zinc-400 hover:text-zinc-300 font-medium transition-colors'>
        View all {lists.length || '16'} lists
      </button>
    </div>
  );
}
