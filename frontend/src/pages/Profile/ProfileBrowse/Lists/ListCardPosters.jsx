// ListCardPosters.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Keys } from '../../../../utils/Keys';

export default function ListCardPosters({ items, linkUrl }) {
  if (!items) return null;
  const { title, poster } = Keys.API1.details;

  const placeholdersCount = 5;
  const placeholderShades = ['bg-zinc-900', 'bg-zinc-800', 'bg-zinc-700'];

  return (
    <div className='flex -space-x-6 shrink-0'>
      <Link
        to={linkUrl}
        className='flex -space-x-6 group border-2 border-transparent hover:border-zinc-200/40 rounded transition-colors duration-200'
      >
        {items.length > 0
          ? items.map((item, i) => {
              const posterUrl = `https://image.tmdb.org/t/p/w200/${item[poster]}`;
              const isLast = i === items.length - 1; // farthest right poster

              return (
                <div
                  key={item?.tmdb_id || i}
                  className={`relative w-18.5 h-27.5 rounded-xs ${
                    isLast ? '' : 'shadow-[4px_0_8px_rgba(0,0,0,0.94)]'
                  }`}
                  style={{ zIndex: items.length - i }}
                >
                  <img
                    src={posterUrl}
                    alt={item?.[title]}
                    className='w-full h-full object-cover rounded-xs'
                  />
                  <div className='absolute inset-0 border-[1.5px] border-zinc-300/40 rounded-xs pointer-events-none' />
                </div>
              );
            })
          : [...Array(placeholdersCount)].map((_, i) => {
              const isLastPlaceholder = i === placeholdersCount - 1;
              return (
                <div
                  key={`placeholder-${i}`}
                  className={`w-18.5 h-27.5 rounded-xs ${
                    placeholderShades[i % 3]
                  } border-[1.5px] border-zinc-300/40 ${
                    isLastPlaceholder
                      ? ''
                      : 'shadow-[4px_0_12px_rgba(0,0,0,0.95)]'
                  }`}
                  style={{ zIndex: placeholdersCount - i }}
                />
              );
            })}
      </Link>
    </div>
  );
}

ListCardPosters.propTypes = {
  items: PropTypes.array.isRequired,
  linkUrl: PropTypes.string.isRequired,
};
