import { genres } from './constants/tmdbGenres';
import { Link } from 'react-router-dom';
import { buildFiltersPath, isSelected } from './helpers/buildFiltersPath';
import { MdAnchor } from 'react-icons/md';

export default function GenresDropdown({ mediaType, filters }) {
  return (
    <div>
      <Link
        to={buildFiltersPath({
          mediaType,
          filters,
          field: 'genre',
          removeField: true,
        })}
        className='block w-full text-start px-2 c cursor-pointer py-1 text-xs text-zinc-900 hover:bg-zinc-700 hover:text-zinc-300'
      >
        All
      </Link>

      {genres.map((genre) => {
        const name = genre.name;
        const selected = isSelected({ filters, field: 'genre', value: name });

        return (
          <Link
            to={buildFiltersPath({
              mediaType,
              filters,
              field: 'genre',
              value: name,
              removeValue: selected,
            })}
            key={genre.id}
            className={`flex justify-between items-center w-full text-start px-2 py-1 text-xs transition-colors ${
              selected
                ? 'text-zinc-200 bg-zinc-700'
                : 'text-zinc-900 hover:bg-zinc-700 hover:text-zinc-300'
            }`}
          >
            <span>{name}</span>
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
