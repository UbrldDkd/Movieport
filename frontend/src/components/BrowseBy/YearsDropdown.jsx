import { years } from './constants/years';
import { Link } from 'react-router-dom';
import {
  buildFiltersPath,
  isSelected,
  routeFor,
} from './helpers/buildFiltersPath';
import { MdAnchor } from 'react-icons/md';

export default function YearsDropdown({ mediaType, filters }) {
  return (
    <div>
      <Link
        to={buildFiltersPath({
          mediaType,
          filters,
          field: 'year',
          removeField: true,
        })}
        className='cursor-pointer block text-start w-full px-2 py-1 text-xs text-zinc-900 hover:text-zinc-300 hover:bg-zinc-700'
      >
        All
      </Link>

      <Link
        to={`/${routeFor(mediaType)}/upcoming`}
        className='cursor-pointer block text-start w-full px-2 py-1 text-xs text-zinc-900 hover:text-zinc-300 hover:bg-zinc-700'
      >
        Upcoming
      </Link>

      {years.map((year) => {
        const selected = isSelected({
          filters,
          field: 'decade',
          value: year.name,
        });

        return (
          <Link
            to={buildFiltersPath({
              mediaType,
              filters,
              field: 'decade',
              value: year.name,
              removeValue: selected,
            })}
            key={year.id}
            className={`cursor-pointer flex justify-between items-center w-full text-start px-2 py-1 text-xs transition-colors ${
              selected
                ? 'text-zinc-200 bg-zinc-700'
                : 'text-zinc-900 hover:text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            <span>{year.name}</span>
            {selected && (
              <span className='ml-2 inline-flex items-center justify-center text-red-900 bg-zinc-600 rounded-xl w-5 h-5 text-xs'>
                <MdAnchor size={16} />
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
