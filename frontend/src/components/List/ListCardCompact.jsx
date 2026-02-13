import { GiCaptainHatProfile } from 'react-icons/gi';
import PropTypes from 'prop-types';
import ListCardPosters from './ListCardPosters';
import { useNavigate } from 'react-router-dom';

export default function ListCardCompact({ list, posterAmount }) {
  const navigate = useNavigate();
  const items = (list.items || []).slice(0, posterAmount);

  const listUrl = `/${list.username}/list/${list.title_slug}`;
  const userUrl = `/${list.username}`;

  return (
    <div
      className='flex flex-col gap-2 w-fit pt-1.5 pb-2
        bg-zinc-600/30 rounded-sm
        hover:bg-zinc-800/40 transition-colors
        cursor-pointer'
    >
      {/* Posters */}
      <div className='px-1.5 overflow-hidden'>
        <ListCardPosters items={items} linkUrl={listUrl} />
      </div>

      {/* Title */}
      <a
        href={listUrl}
        className='px-1.5 text-sm font-semibold text-zinc-200
          truncate hover:text-amber-300/80'
        title={list.title}
      >
        {list.title}
      </a>

      {/* Creator */}
      {list.username && (
        <div
          className='flex items-center gap-2 px-1.5
            text-xs text-zinc-400'
        >
          <span className='shrink-0'>Created by</span>

          <button
            onClick={() => navigate(userUrl)}
            className='flex h-5 w-5 items-center justify-center
              rounded-full border border-zinc-700 bg-zinc-800
              hover:border-zinc-600 transition-colors'
            aria-label={`View ${list.username} profile`}
          >
            <GiCaptainHatProfile className='text-sm text-zinc-400' />
          </button>

          <button
            onClick={() => navigate(userUrl)}
            className='font-semibold text-zinc-300/90 truncate'
          >
            {list.username}
          </button>
        </div>
      )}
    </div>
  );
}

ListCardCompact.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    username: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    title_slug: PropTypes.string,
  }).isRequired,
  posterAmount: PropTypes.number,
};
