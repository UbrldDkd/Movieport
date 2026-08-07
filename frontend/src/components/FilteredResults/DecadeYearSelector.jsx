import { Link } from 'react-router-dom';
import {
  buildFiltersPath,
  isSelected,
  routeFor,
} from '../BrowseBy/helpers/buildFiltersPath';
import { MdArrowLeft } from 'react-icons/md';
import { MdArrowRight } from 'react-icons/md';

const MIN_DECADE = 1870;
const MAX_DECADE = 2020;

function clampDecade(value) {
  return Math.max(MIN_DECADE, Math.min(MAX_DECADE, value));
}

function getDecadeStart(filters) {
  if (filters?.decade?.gte) {
    return clampDecade(Number(filters.decade.gte.split('-')[0]));
  }

  if (filters?.year?.length > 0) {
    return clampDecade(Math.floor(filters.year[0] / 10) * 10);
  }

  return clampDecade(Math.floor(new Date().getFullYear() / 10) * 10);
}

export default function DecadeYearSelector({ mediaType, filters }) {
  const decadeStart = getDecadeStart(filters);
  const decadeLabel = `${decadeStart}s`;
  const years = Array.from({ length: 10 }, (_, index) => decadeStart + index);
  const previousDecadeLabel = `${decadeStart - 10}s`;
  const nextDecadeLabel = `${decadeStart + 10}s`;
  const routeMedia = routeFor(mediaType);

  const decadeItems = [
    { type: 'decade', label: decadeLabel },
    ...years.map((year) => ({ type: 'year', label: String(year) })),
  ];

  const canGoPrevious = decadeStart > MIN_DECADE;
  const canGoNext = decadeStart < MAX_DECADE;

  return (
    <div className='flex px-[10%] gap-3 '>
      <div className='flex items-center justify-between gap-3'>
        {canGoPrevious ? (
          <Link
            to={buildFiltersPath({
              mediaType: routeMedia,
              filters,
              field: 'decade',
              value: previousDecadeLabel,
            })}
            className='inline-flex items-center transition-colors duration-100 justify-center text-zinc-600 hover:text-zinc-300'
          >
            <MdArrowLeft size={30} />
          </Link>
        ) : (
          <div className='w-10' />
        )}
      </div>

      <div className='flex flex-1 min-w-0 overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 divide-x divide-zinc-800'>
        {decadeItems.map((item) => {
          const selected = isSelected({
            filters,
            field: item.type,
            value: item.label,
          });
          const isDecade = item.type === 'decade';

          return (
            <Link
              key={item.label}
              to={buildFiltersPath({
                mediaType: routeMedia,
                filters,
                field: item.type,
                value: item.label,
                ...(isDecade
                  ? {}
                  : {
                      replaceValue: true,
                      removeValue: selected,
                    }),
              })}
              className={`flex flex-1 basis-0 min-w-0 items-center justify-center px-3 text-xs font-semibold tracking-wider transition ${
                selected
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'bg-transparent text-zinc-400 hover:text-zinc-200'
              } ${isDecade ? 'tracking-wide' : 'truncate'}`}
            >
              <span className='truncate'>{item.label}</span>
            </Link>
          );
        })}
      </div>
      {canGoNext ? (
        <Link
          to={buildFiltersPath({
            mediaType: routeMedia,
            filters,
            field: 'decade',
            value: nextDecadeLabel,
          })}
          className='inline-flex items-center transition-colors duration-100 justify-center text-zinc-600 hover:text-zinc-300'
        >
          <MdArrowRight size={30} />
        </Link>
      ) : (
        <div className='w-10' />
      )}
    </div>
  );
}
