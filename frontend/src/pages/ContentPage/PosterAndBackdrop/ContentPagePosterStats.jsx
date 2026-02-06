import { VscHeartFilled } from 'react-icons/vsc';
import { AiFillEye } from 'react-icons/ai';
import { CgPlayListCheck } from 'react-icons/cg';

export default function PosterStats({ stats = {}, isLoading }) {
  const formatNumber = (num) => {
    if (!num && num !== 0) return null;
    if (num >= 1_000_000)
      return (num / 1_000_000).toFixed(1).replace('.0', '') + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace('.0', '') + 'K';
    return num.toLocaleString();
  };

  const defaultStats = {
    likes: 142839,
    lists: 21567,
    watches: 7023898,
  };

  const s = stats.likes || stats.lists || stats.watches ? stats : defaultStats;

  if (isLoading) {
    return (
      <div className='flex gap-2 mt-2'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='flex items-center gap-1 animate-pulse'>
            <div className='w-4 h-4 bg-zinc-800/50 rounded-sm' />
            <div className='w-8 h-3 bg-zinc-800/50 rounded-sm' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex gap-3 justify-center font-semibold mt-2 text-zinc-400 text-xs'>
      {s.likes ? (
        <div
          className='flex items-center gap-1 hover:text-zinc-300 transition'
          title={`Liked by ${formatNumber(s.likes)} users`}
        >
          <VscHeartFilled className='w-4 h-4' />
          {formatNumber(s.likes)}
        </div>
      ) : null}

      {s.lists ? (
        <div
          className='flex items-center gap-1 hover:text-zinc-300 transition'
          title={`Appears in ${formatNumber(s.lists)} lists`}
        >
          <CgPlayListCheck className='w-4 h-4' />
          {formatNumber(s.lists)}
        </div>
      ) : null}

      {s.watches ? (
        <div
          className='flex items-center gap-1 hover:text-zinc-300 transition'
          title={`Watched by ${formatNumber(s.watches)} users`}
        >
          <AiFillEye className='w-4 h-4' />
          {formatNumber(s.watches)}
        </div>
      ) : null}
    </div>
  );
}
