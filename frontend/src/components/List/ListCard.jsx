// React
import { useState } from 'react';

// Icons
import { GiLockedHeart, GiCaptainHatProfile } from 'react-icons/gi';
import { FaPen, FaFilm } from 'react-icons/fa6';
import { FiTv } from 'react-icons/fi';

// Third-party
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import ListCardPosters from '../List/ListCardPosters';
import { Tooltip } from '../Common/Tooltip'

export default function ListCard({ list, username, posterAmount }) {
  const [tooltip, setTooltip] = useState(false);
  const [filmTooltip, setFilmTooltip] = useState(false);
  const [tvTooltip, setTvTooltip] = useState(false);

  const navigate = useNavigate();
  const items = (list.items || []).slice(0, posterAmount);
  const linkUrl = `/${username}/list/${list.title_slug}`;

  return (
    <div className='flex flex-col sm:flex-row gap-2 mb-1 rounded-xl min-w-0 max-w-full'>
      <ListCardPosters items={items} linkUrl={linkUrl} />

      <div className='flex flex-col min-w-0 flex-[1_1_auto]'>
        {/* Title */}
        <div className='flex items-center gap-2 min-w-0'>
          <Link to={linkUrl} className='min-w-0 flex-1'>
            <h2
              className='text-base md:text-lg text-zinc-200 hover:text-amber-300/80 transition-colors font-semibold tracking-wider break-words line-clamp-2'
              title={list.title}
            >
              {list.title}
            </h2>
          </Link>
          {!list.public && <GiLockedHeart className='text-zinc-400 shrink-0' />}
        </div>

        {/* Meta row */}
        <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5 text-xs text-zinc-400 tracking-wide'>
          {list.username && (
            <div className='flex items-center gap-1 min-w-0'>
              <button
                onClick={() => navigate(`/${list.username}`)}
                className='w-5 h-5 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center shrink-0'
              >
                <GiCaptainHatProfile className='text-sm text-zinc-400' />
              </button>
              <button
                onClick={() => navigate(`/${list.username}`)}
                className='text-zinc-300/90 font-semibold truncate max-w-[12ch]'
              >
                {list.username}
              </button>
            </div>
          )}

          <span>
            {list.item_count > 0 ? `${list.item_count} items` : 'Empty'}
          </span>

          {list.film_count > 0 && (
            <Tooltip
              count={list.film_count}
              label={list.film_count > 1 ? 'Films' : 'Film'}
              icon={<FaFilm />}
              active={filmTooltip}
              setActive={setFilmTooltip}
            />
          )}

          {list.tv_count > 0 && (
            <Tooltip
              count={list.tv_count}
              label={list.tv_count > 1 ? 'TV-shows' : 'TV-show'}
              icon={<FiTv />}
              active={tvTooltip}
              setActive={setTvTooltip}
            />
          )}

          {list.is_owner && (
            <Tooltip
              label='Edit list'
              icon={
                <Link to={`${linkUrl}/edit/`}>
                  <FaPen className='text-sm' />
                </Link>
              }
              active={tooltip}
              setActive={setTooltip}
            />
          )}
        </div>

        {/* Description */}
        {list.description && (
          <p className='mt-1 max-h-36 overflow-y-auto text-xs text-zinc-300/90 leading-snug break-words break-all scrollbar-hide'>
            {list.description}
          </p>
        )}
      </div>
    </div>
  );
}

/* Reusable tooltip */
function Tooltip({ count, label, icon, active, setActive }) {
  return (
    <div
      className='relative flex items-center gap-1'
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {count && <span>{count}</span>}
      {icon}
      <div
        className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-zinc-800/90 text-zinc-300/90 text-xs font-semibold whitespace-nowrap transition-opacity duration-200 pointer-events-none z-10 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {count ? `${count} ${label}` : label}
        <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800/90' />
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
