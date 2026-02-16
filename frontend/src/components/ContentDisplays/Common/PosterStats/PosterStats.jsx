import { useState } from 'react';
import { VscHeartFilled } from 'react-icons/vsc';
import { AiFillEye } from 'react-icons/ai';
import { CgPlayListCheck } from 'react-icons/cg';
import { formatNumber } from '../../../../utils/helpers/formatNumber.js';
import Stat from './Stat.jsx';

export default function PosterStats({ stats = {}, isLoading }) {
  const defaultStats = {
    liked_by: 14234,
    in_lists: 2156,
    watched_by: 17023,
  };

  const s =
    stats.liked_by || stats.in_lists || stats.watched_by ? stats : defaultStats;

  if (isLoading) {
    return (
      <div className='flex gap-1 sm:gap-2.5 mt-2 flex-wrap justify-center'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='flex flex-col sm:flex-row items-center gap-1 animate-pulse'
          >
            <div className='w-4 h-4 sm:w-4 sm:h-4 bg-zinc-800/50 rounded-sm mb-1 sm:mb-0' />
            <div className='w-6 h-2 sm:w-8 sm:h-3 bg-zinc-800/50 rounded-sm' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-wrap justify-center gap-2  font-semibold  text-zinc-400 text-xs'>
      <Stat
        icon={VscHeartFilled}
        value={s.liked_by}
        label={`Liked by ${formatNumber(s.liked_by)} users`}
      />
      <Stat
        icon={CgPlayListCheck}
        value={s.in_lists}
        label={`Appears in ${formatNumber(s.in_lists)} lists`}
      />
      <Stat
        icon={AiFillEye}
        value={s.watched_by}
        label={`Watched by ${formatNumber(s.watched_by)} users`}
      />
    </div>
  );
}
