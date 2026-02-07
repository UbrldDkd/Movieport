import { Link } from 'react-router-dom';

export default function TvContentDisplay({ seasonContent, id, episodeNumber }) {
  if (!seasonContent || !seasonContent.episodes?.length) {
    return <div className='text-zinc-400'>No episodes available.</div>;
  }

  const seasonNumber = seasonContent?.season_number;

  return (
    <div className='w-full'>
      <div className='grid justify-center items-center gap-2 grid-cols-3'>
        {' '}
        {seasonContent.episodes.map((ep) => (
          <Link
            key={ep.episode_number}
            to={`/watch/tv/${id}?season=${seasonNumber}&episode=${ep.episode_number}`}
            className={`
              relative group  py-1.5 text-sm md:text-base rounded-sm cursor-pointer
              transition-colors duration-120
              flex justify-center items-center font-semibold
              ${
                episodeNumber === ep.episode_number
                  ? 'bg-red-950 text-zinc-300 hover:bg-zinc-300 hover:text-red-950 cursor-default active:bg-zinc-200 active:text-red-900'
                  : 'bg-zinc-900/90 backdrop-blur-3xl text-zinc-400 hover:bg-zinc-900 active:bg-zinc-700 active:text-zinc-300'
              }
            `}
          >
            Ep {ep.episode_number}
            {/* Tooltip */}
            <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs sm:text-sm font-semibold text-zinc-300 bg-zinc-800/90 rounded opacity-0 group-hover:opacity-100 pointer-events-none duration-120 whitespace-nowrap z-50'>
              {ep.name}
              {/* Triangle */}
              <span className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-900'></span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
