import ListCard from '../../components/List/ListCard';

export default function ListsSection({
  header,
  lists = [],
  isLoading,
  posterAmount,
}) {
  if (isLoading) {
    return (
      <div className='mt-8'>
        <h2 className='text-lg font-semibold text-zinc-200 mb-4'>{header}</h2>
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
      title: 'Best Sci-Fi Films of the 2010s',
      description: 'A collection of groundbreaking science fiction movies.',
      item_count: 77,
      film_count: 47,
      tv_count: 30,
      like_count: '12K',
      username: 'scifi_fan',
    },
    {
      id: 2,
      title: 'Mind-Bending Movies That Will Blow Your Mind',
      description: 'Films that challenge reality and perception.',
      item_count: 26,
      film_count: 23,
      tv_count: 3,
      like_count: '8.5K',
      username: 'mind_bender',
    },
    {
      id: 3,
      title: "Director's Masterpieces",
      description: 'Essential films from visionary directors.',
      item_count: 56,
      film_count: 31,
      tv_count: 25,
      like_count: '5.2K',
      username: 'film_buffs_unite',
    },
  ];

  const displayLists = lists.length > 0 ? lists : staticLists;

  return (
    <div className='mt-8'>
      <h2 className=' font-semibold text-zinc-300/90'>{header}</h2>
      <div className='mt-2 mb-3 border-b border-zinc-600' />
      <div className='flex flex-col gap-4'>
        {displayLists.slice(0, 4).map((list) => (
          <div
            key={list.id}
            className='bg-zinc-900/30 p-4 rounded-sm hover:bg-zinc-800/40 transition-colors cursor-pointer group'
          >
            <ListCard list={list} posterAmount={posterAmount} />
          </div>
        ))}
      </div>
      <button className='mt-4 text-sm text-zinc-400 hover:text-zinc-300 font-medium transition-colors'>
        View all {lists.length || '16'} lists
      </button>
    </div>
  );
}
