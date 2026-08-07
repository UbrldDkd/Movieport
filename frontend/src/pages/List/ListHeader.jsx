// React
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiLockedHeart } from 'react-icons/gi';
import { FaThLarge, FaList } from 'react-icons/fa';

// Components
import Pfp from '../../components/Common/Pfp.jsx';

// Utils/Helpers
import { timeAgo } from '../../utils/helpers/timeAgo';

export default function ListHeader({ list, view, setView }) {
  const [hover, setHover] = useState(false);
  const { username } = list.user || {};
  return (
    <div className='min-w-0 opacity-0 animate-fadeIn'>
      {/* User */}
      <div className='flex items-center gap-2 mb-3'>
        <Pfp user={list.user} size='sm' className='border border-zinc-700' />
        <span className='text-xs text-zinc-400'>List by</span>
        <Link
          to={`/${username}/`}
          className='text-sm font-medium hover:text-zinc-100 transition-colors'
        >
          {username}
        </Link>
      </div>

      <div className='h-px bg-zinc-800 mb-1' />

      {/* Timestamp + view */}
      <div className='flex justify-between items-center text-xs text-zinc-400 mb-1 gap-4 min-w-0'>
        <span
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          title={`Created: ${new Date(list.created_at).toLocaleString()}`}
          className='cursor-help hover:text-text-primary transition-colors'
        >
          {hover
            ? `Created: ${timeAgo(list.created_at)}`
            : `Last updated: ${timeAgo(list.updated_at)}`}
        </span>

        <div className='flex gap-1 flex-shrink-0'>
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-sm transition-colors cursor-pointer ${
              view === 'grid'
                ? 'bg-zinc-700 text-zinc-200'
                : 'hover:bg-zinc-800/50 hover:text-zinc-200'
            }`}
          >
            <FaThLarge />
          </button>

          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-sm transition-colors cursor-pointer ${
              view === 'list'
                ? 'bg-zinc-700 text-zinc-200'
                : 'hover:bg-zinc-800/50 hover:text-zinc-200'
            }`}
          >
            <FaList />
          </button>
        </div>
      </div>

      <div className='h-px bg-zinc-800 mb-5' />

      {/* Title */}
      <h2 className='text-2xl font-semibold flex items-center gap-2 mb-2 min-w-0'>
        <span className='truncate'>{list.title}</span>
        {!list.public && (
          <GiLockedHeart className='text-zinc-400 flex-shrink-0' />
        )}
      </h2>

      {/* Description */}
      {list.description && (
        <p className='text-sm  text-zinc-400 tracking-wide leading-snug break-words whitespace-pre-wrap mb-6'>
          {list.description}
        </p>
      )}
    </div>
  );
}
