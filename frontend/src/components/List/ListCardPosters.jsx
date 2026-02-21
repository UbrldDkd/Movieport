import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Keys } from '../../utils/constants/Keys';

export default function ListCardPosters({ items, linkUrl, compact }) {
  if (!items) return null;

  const { details } = Keys.API1;

  const PLACEHOLDER_COUNT = 3;
  const PLACEHOLDER_SHADES = ['bg-bg-secondary', 'bg-zinc-800', 'bg-zinc-700'];

  return (
    <div className='flex -space-x-6 shrink-0'>
      <Link
        to={linkUrl}
        className={`flex ${!compact === 'sm' ? '-space-x-6' : compact === 'md' ? '-space-x-9' : '-space-x-12'} group border-2 border-transparent
          hover:border-zinc-200/40 rounded transition-colors duration-200`}
      >
        {items.length > 0
          ? items.map((item, i) => (
              <Poster
                key={item?.tmdb_id || i}
                posterPath={item[details.poster]}
                title={item[details.movieTitle]}
                zIndex={items.length - i}
                hasShadow={i !== items.length - 1}
              />
            ))
          : [...Array(PLACEHOLDER_COUNT)].map((_, i) => (
              <div
                key={i}
                className={`w-18.5 h-27.5 rounded-xs
                  ${PLACEHOLDER_SHADES[i % 3]}
                  border-[1.5px] border-zinc-800
                  ${
                    i !== PLACEHOLDER_COUNT - 1
                      ? 'shadow-[4px_0_12px_rgba(0,0,0,0.95)]'
                      : ''
                  }
                `}
                style={{ zIndex: PLACEHOLDER_COUNT - i }}
              />
            ))}
      </Link>
    </div>
  );
}

function Poster({ posterPath, title, zIndex, hasShadow }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w200/${posterPath}`
    : null;

  return (
    <div
      className={`relative w-18.5 h-27.5 rounded-xs overflow-hidden bg-zinc-800
        ${hasShadow ? 'shadow-[4px_0_8px_rgba(0,0,0,0.94)]' : ''}
      `}
      style={{ zIndex }}
    >
      {posterUrl && !error ? (
        <>
          {!loaded && (
            <div className='absolute inset-0 bg-zinc-700 animate-pulse-slow' />
          )}

          <img
            src={posterUrl}
            alt={title}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </>
      ) : (
        <div className='absolute inset-0 flex items-center justify-center bg-zinc-700 text-zinc-500 text-[10px] text-center px-1'>
          {title}
        </div>
      )}

      <div className='absolute inset-0 border-[1.5px] border-zinc-800 rounded-xs pointer-events-none' />
    </div>
  );
}

ListCardPosters.propTypes = {
  items: PropTypes.array.isRequired,
  linkUrl: PropTypes.string.isRequired,
};
