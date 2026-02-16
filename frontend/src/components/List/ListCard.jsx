// Icons
import { GiLockedHeart, GiCaptainHatProfile } from 'react-icons/gi';
import { FaPen, FaFilm } from 'react-icons/fa6';
import { FiTv } from 'react-icons/fi';

// Third-party
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import ListCardPosters from '../List/ListCardPosters';
import { Tooltip } from '../Common/Tooltip';

export default function ListCard({ list, username, posterAmount }) {
  const navigate = useNavigate();
  const items = (list.items || []).slice(0, posterAmount);
  const linkUrl = `/${username}/list/${list.title_slug}`;

  return (
    <div className='flex flex-col sm:flex-row mb-1 rounded-xl '>
      <ListCardPosters items={items} linkUrl={linkUrl} compact='md' />

      <div className='mt-2 sm:mt-0 sm:ml-2 flex flex-col flex-1 min-w-0'>
        {/* Title and lock icon */}
        <div className='flex items-center gap-2 flex-wrap min-w-0'>
          <a href={linkUrl} className='min-w-0 flex-1'>
            <h2
              className='text-base md:text-lg text-zinc-200 hover:text-amber-300/80 transition-colors duration-120 font-semibold tracking-wider break-words'
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
            <Tooltip
              label={`${list.film_count} ${list.film_count > 1 ? 'Films' : 'Film'}`}
              position={'-top-7 -left-4'}
            >
              <div className='flex gap-0.5 items-center  flex-shrink-0'>
                {list.film_count}
                <FaFilm />
              </div>
            </Tooltip>
          )}

          {list.tv_count > 0 && (
            <Tooltip
              label={`${list.tv_count} ${list.tv_count > 1 ? 'TV shows' : 'Tv show'}`}
              position={'-top-7 -left-6'}
            >
              <div className='flex gap-0.5 items-center flex-shrink-0'>
                {list.tv_count}
                <FiTv />
              </div>
            </Tooltip>
          )}

          {list.is_owner && (
            <Tooltip label={'Edit list'} position={'-top-7 -left-6'}>
              <Link
                to={`${linkUrl}/edit/`}
                className='block  py-[1.5px] flex-shrink-0'
              >
                {' '}
                <div className='text-zinc-500 hover:text-zinc-300 transition-colors duration-120'>
                  <FaPen className='text-sm' />
                </div>
              </Link>
            </Tooltip>
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
