// ListCardCompact.jsx
import { GiCaptainHatProfile } from 'react-icons/gi';
import PropTypes from 'prop-types';
import ListCardPosters from './ListCardPosters';
import { useNavigate } from 'react-router-dom';

export default function ListCardCompact({ list, posterAmount }) {
  const navigate = useNavigate();
  const items = (list.items || []).slice(0, posterAmount);

  return (
    <div className='flex flex-col flex-wrap justify-center gap-2 pt-1.5 pb-2 bg-zinc-600/30 rounded-sm hover:bg-zinc-800/40 transition-colors cursor-pointer'>
      <div className='px-1.5'>
        <ListCardPosters
          items={items}
          linkUrl={`/${list.username}/list/${list.title_slug}`}
        />
      </div>

      <a
        href={`/${list.username}/list/${list.title_slug}`}
        className='px-1.5 text-sm font-semibold text-zinc-200 truncate hover:text-amber-300/80'
        title={list.title}
      >
        {list.title}
      </a>

      {list.username && (
        <div className='flex items-center gap-2 px-1.5 text-xs text-zinc-400'>
          <span>Created by</span>
          <button
            onClick={() => navigate(`/${list.username}`)}
            className='flex h-5 w-5 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800'
          >
            <GiCaptainHatProfile className='text-sm text-zinc-400' />
          </button>
          <button
            onClick={() => navigate(`/${list.username}`)}
            className='font-semibold text-zinc-300/90'
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
