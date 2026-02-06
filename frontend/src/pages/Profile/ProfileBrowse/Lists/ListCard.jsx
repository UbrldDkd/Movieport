// ListCard.jsx
import PropTypes from 'prop-types';
import { GiLockedHeart, GiCaptainHatProfile } from 'react-icons/gi';
import { FaPen } from 'react-icons/fa6';
import ListCardPosters from './ListCardPosters';
import { Keys } from '../../../../utils/Keys';

export default function ListCard({ list, username, posterAmount }) {
  const { poster } = Keys.API1.details;

  const items = (list.items || []).slice(0, posterAmount);

  // Predefine the URL for modularity
  const linkUrl = `/${username}/list/${list.title_slug}`;

  return (
    <div className='flex   mb-1 rounded-xl '>
      <ListCardPosters items={items} linkUrl={linkUrl} />

      <div className='ml-2 flex flex-col flex-1 '>
        <div className='flex items-center gap-2'>
          <a href={linkUrl}>
            <h2
              className='text-lg text-zinc-200 hover:text-amber-300/80 transition-colors duration-120 truncate font-semibold tracking-wider'
              title={list.title}
            >
              {list.title}
            </h2>
          </a>

          {list.public === false && (
            <GiLockedHeart className='text-zinc-400 text-sm shrink-0' />
          )}
        </div>

        <div className='flex items-center gap-2.5 mb-1.5'>
          <span className='text-xs text-zinc-400 tracking-wide'>
            {list.item_count} items
          </span>
          {list.is_owner && (
            <a href={`${linkUrl}/edit/`}>
              <FaPen className='text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-120' />
            </a>
          )}
        </div>

        {list.description && (
          <div className='mt-1 max-h-14.5 rounded-sm w-85  scrollbar-hide overflow-y-auto text-xs text-zinc-300/90 tracking-wide leading-snug wrap-break-word'>
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
  }).isRequired,
};
