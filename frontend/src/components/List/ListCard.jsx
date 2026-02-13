import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiLockedHeart, GiCaptainHatProfile } from 'react-icons/gi';
import { FaPen, FaFilm } from 'react-icons/fa6';
import { FiTv } from 'react-icons/fi';
import PropTypes from 'prop-types';
import ListCardPosters from '../List/ListCardPosters';

export default function ListCard({ list, username, posterAmount }) {
  const [tooltip, setTooltip] = useState(false);
  const [filmTooltip, setFilmTooltip] = useState(false);
  const [tvTooltip, setTvTooltip] = useState(false);

  const navigate = useNavigate();
  const items = (list.items || []).slice(0, posterAmount);
  const linkUrl = `/${username}/list/${list.title_slug}`;

  return (
    <div className='flex flex-col sm:flex-row mb-1 rounded-xl w-full'>
      <ListCardPosters items={items} linkUrl={linkUrl} />

      <div className='mt-2 sm:mt-0 sm:ml-2 flex flex-col flex-1 min-w-0'>
        {/* Title and lock icon */}
        <div className='flex items-center gap-2 flex-wrap'>
          <a href={linkUrl} className='min-w-0'>
            <h2
              className='text-base md:text-lg text-zinc-200 hover:text-amber-300/80 transition-colors duration-120 truncate font-semibold tracking-wider'
              title={list.title}
            >
              {list.title}
            </h2>
          </a>
          {!list.public && <GiLockedHeart className='text-zinc-400 shrink-0' />}
        </div>

        {/* Info row */}
        <div className='flex flex-wrap items-center gap-2 md:gap-2.5 mb-1.5 text-xs text-zinc-400 tracking-wide'>
          {list.username && (
            <div className='flex items-center gap-1 flex-shrink-0'>
              <button
                onClick={() => navigate(`/${list.username}`)}
                className='w-5 h-5 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center'
              >
                <GiCaptainHatProfile className='text-sm text-zinc-400' />
              </button>
              <button
                onClick={() => navigate(`/${list.username}`)}
                className='text-zinc-300/90 font-semibold truncate max-w-[100px] sm:max-w-[150px]'
              >
                {list.username}
              </button>
            </div>
          )}

          <div className='flex-shrink-0'>
            {list.item_count > 0 ? `${list.item_count} items` : 'Empty'}
          </div>

          {list.film_count > 0 && (
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

          {list.tv_count > 0 && (
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

          {list.is_owner && (
            <div
              className='relative inline-block flex-shrink-0'
              onMouseEnter={() => setTooltip(true)}
              onMouseLeave={() => setTooltip(false)}
            >
              <Link to={`${linkUrl}/edit/`} className='block'>
                <div className='text-zinc-500 hover:text-zinc-300 transition-colors duration-120'>
                  <FaPen className='text-sm' />
                </div>
              </Link>
              <div
                className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-zinc-300/90 bg-zinc-800/90 font-semibold tracking-wider backdrop-blur-3xl text-xs whitespace-nowrap transition-opacity duration-200 pointer-events-none z-10 ${tooltip ? 'opacity-100' : 'opacity-0'}`}
              >
                Edit list
                <div className='absolute top-full left-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-800/90 -translate-x-1/2' />
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        {list.description && (
          <div className='mt-1 max-h-36 w-full overflow-y-auto rounded-sm text-xs text-zinc-300/90 tracking-wide leading-snug break-words scrollbar-hide'>
            {list.description}
          </div>
        )}
      </div>
    </div>
  );
}

ListCard.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    public: PropTypes.bool,
    item_count: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object),
    title_slug: PropTypes.string,
    is_owner: PropTypes.bool,
    username: PropTypes.string,
    film_count: PropTypes.number,
    tv_count: PropTypes.number,
  }).isRequired,
  username: PropTypes.string.isRequired,
  posterAmount: PropTypes.number.isRequired,
};
