import { useState } from 'react';
import ContentCard from '../../../components/ContentDisplays/ContentCard/ContentCard.jsx';
import { FiTv } from 'react-icons/fi';
import { FaFilm } from 'react-icons/fa6';
import { Tooltip } from '../../../components/Common/Tooltip.jsx';
import { Link } from 'react-router-dom';

const MAX_TITLES = 10;

export default function SearchResultsContentCard({
  item,
  showMediaType = false,
}) {
  const [expanded, setExpanded] = useState(false);

  const year =
    item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4);

  const title = item.title || item.name;

  const altTitles = [
    ...new Set(
      (item.alternative_titles || []).map((t) => t.title).filter(Boolean)
    ),
  ];

  const visibleTitles = expanded ? altTitles : altTitles.slice(0, MAX_TITLES);

  // FIXED: use media_type ("film" or "tv")
  const isFilm = item.media_type === 'film';

  const creators = Array.isArray(item.creator)
    ? item.creator.map((c) => c.name).filter(Boolean)
    : [];

  return (
    <div
      key={`${item.media_type}-${item.id}`}
      className='flex flex-col sm:flex-row gap-5 py-6 border-b border-zinc-800'
    >
      <div className='shrink-0'>
        <ContentCard item={item} view='sm' />
      </div>

      <div className='flex-1 min-w-0 space-y-2'>
        <h1 className='flex flex-wrap items-end gap-2'>
          <span className='text-2xl font-bold text-zinc-100'>{title}</span>

          {year && (
            <span className='text-xl font-light text-zinc-500'>{year}</span>
          )}
        </h1>
        <div className='flex gap-1 -mt-2 items-center'>
          {showMediaType &&
            (isFilm ? (
              <Tooltip
                label='Film'
                position='bottom-4 left-1/2 -translate-x-1/2'
              >
                <FaFilm className='text-zinc-500 text-xs ' />
              </Tooltip>
            ) : (
              <Tooltip
                label='TV Show'
                position='bottom-4 left-1/2 -translate-x-1/2'
              >
                <FiTv className='text-zinc-400 text-sm' />
              </Tooltip>
            ))}
          {item.media_type === 'tv' && (
            <Tooltip
              label={`${item.seasons} ${item.seasons === 1 ? 'season' : 'seasons'}`}
            >
              <div className='text-zinc-400 cursor-pointer '>{`S${item.seasons}`}</div>
            </Tooltip>
          )}
        </div>

        {altTitles.length > 0 && (
          <div>
            <p className='text-zinc-400 font-semibold text-[14px] leading-snug'>
              <span className='text-zinc-500 font-semibold tracking-wide'>
                Alternative titles:{' '}
              </span>
              {visibleTitles.map((title, index) => (
                <span key={title}>
                  {title}
                  {index !== visibleTitles.length - 1 && ', '}
                </span>
              ))}
            </p>

            {altTitles.length > MAX_TITLES && (
              <button
                onClick={() => setExpanded(!expanded)}
                className='ml-1 text-sm text-zinc-200 font-semibold hover:text-red-800 transition-colors cursor-pointer'
              >
                {expanded ? 'less' : '...more'}
              </button>
            )}
          </div>
        )}

        {(creators.length > 0 || item.director) && (
          <div className='flex gap-2 items-center text-zinc-400 text-[14px] font-semibold tracking-wider'>
            {isFilm ? 'Directed by' : 'Created by'}{' '}
            <div className='bg-zinc-800 text-zinc-400 py-0.5 px-1 transition-colors duration-150 rounded-xs hover:text-zinc-300 hover:bg-zinc-700 cursor-pointer'>
              {isFilm ? item.director : creators.join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
