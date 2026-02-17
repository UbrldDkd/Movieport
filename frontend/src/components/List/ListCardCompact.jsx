// React
import { useState } from 'react';

// Icons
import { FaFilm } from 'react-icons/fa';
import { FiTv } from 'react-icons/fi';
import { GiCaptainHatProfile } from 'react-icons/gi';

// Third-party
import { useNavigate } from 'react-router-dom';

// Components
import PropTypes from 'prop-types';
import ListCardPosters from './ListCardPosters';

export default function ListCardCompact({
  list,
  posterAmount,
  includeItemCount,
  compact = 'sm',
}) {
  const [filmTooltip, setFilmTooltip] = useState(false);
  const [tvTooltip, setTvTooltip] = useState(false);
  const navigate = useNavigate();
  const items = (list.items || []).slice(0, posterAmount);

  const listUrl = `/${list.username}/list/${list.title_slug}`;
  const userUrl = `/${list.username}`;

  return (
    <div
      className='flex flex-col bg-zinc-400  gap-2 pl-2 pr-1.5 pt-1.5 pb-2 
       
      transition-colors
        '
    >
      {/* Wrapper to constrain width to posters */}
      <div className='inline-block w-fit'>
        {/* Posters */}
        <ListCardPosters items={items} linkUrl={listUrl} compact={compact} />

        {/* Title */}
        <a
          href={listUrl}
          className={`block ${compact === 'md' ? 'w-67' : 'w-50'} text-sm font-semibold transition-colors duration-100 text-zinc-200 break-words mt-1 hover:text-amber-300/80`}
          title={list.title}
        >
          {list.title}
        </a>

        {/* Creator */}
        {list.username && (
          <div className='flex items-center gap-2 text-xs text-zinc-400 mt-0.5 w-full'>
            <span className='shrink-0'>Created by</span>

            <button
              onClick={() => navigate(userUrl)}
              className='flex h-5 w-5 items-center cursor-pointer justify-center
                rounded-full border border-zinc-700 bg-zinc-800
                hover:border-zinc-600 transition-colors'
              aria-label={`View ${list.username} profile`}
            >
              <GiCaptainHatProfile className='text-sm text-zinc-400' />
            </button>

            <span className='font-semibold cursor-pointer text-zinc-300/90 break-words'>
              {list.username}
            </span>

            {includeItemCount && (
              <div className='flex-shrink-0'>
                {list.item_count > 0 ? `${list.item_count} items` : 'Empty'}
              </div>
            )}

            {list.film_count > 0 && includeItemCount && (
              <div className='flex gap-1 items-center flex-shrink-0'>
                {list.film_count}
                <div
                  className='relative inline-block'
                  onMouseEnter={() => setFilmTooltip(true)}
                  onMouseLeave={() => setFilmTooltip(false)}
                >
                  <FaFilm />
                  <div
                    className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-zinc-300/90 text-xs bg-zinc-800/90 backdrop-blur-3xl font-semibold whitespace-nowrap transition-opacity duration-200 pointer-events-none z-10 ${filmTooltip ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {list.film_count} {list.film_count > 1 ? 'Films' : 'Film'}
                    <div className='absolute top-full left-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-800/90 -translate-x-1/2' />
                  </div>
                </div>
              </div>
            )}

            {list.tv_count > 0 && includeItemCount && (
              <div className='flex gap-1 items-center flex-shrink-0'>
                {list.tv_count}
                <div
                  className='relative inline-block'
                  onMouseEnter={() => setTvTooltip(true)}
                  onMouseLeave={() => setTvTooltip(false)}
                >
                  <FiTv />
                  <div
                    className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-zinc-300/90 bg-zinc-800/90 font-semibold tracking-wider backdrop-blur-3xl text-xs whitespace-nowrap transition-opacity duration-200 pointer-events-none z-10 ${tvTooltip ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {list.tv_count} {list.tv_count > 1 ? 'TV-shows' : 'TV-show'}
                    <div className='absolute top-full left-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-800/90 -translate-x-1/2' />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
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
