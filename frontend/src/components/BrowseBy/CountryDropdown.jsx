import { useState } from 'react';
import { countries } from './constants/countries';
import { Link } from 'react-router-dom';
import { buildFiltersPath, isSelected } from './helpers/buildFiltersPath';

export default function CountryDropdown({ mediaType, filters }) {
  const [search, setSearch] = useState('');

  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='max-h-80 overflow-y-auto scrollbar-hide'>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search country...'
        className='
          m-2
          px-2
          py-1
          w-[90%]
          bg-zinc-900
          border
          border-zinc-700
          text-xs
          text-white
          outline-none
          sticky
          top-0
        '
      />

      {filtered.map((country) => {
        const selected = isSelected({
          filters,
          field: 'country',
          value: country.name,
        });

        return (
          <Link
            key={country.code}
            to={buildFiltersPath({
              mediaType,
              filters,
              field: 'country',
              value: country.name,
              removeValue: selected,
            })}
            className={`flex justify-between items-center px-2 py-1 text-xs transition-colors ${
              selected
                ? 'text-zinc-200 bg-zinc-700'
                : 'text-zinc-900 hover:bg-zinc-700 hover:text-zinc-300'
            }`}
          >
            <span>{country.name}</span>
            {selected && (
              <span className='ml-2 inline-flex items-center justify-center bg-black text-red-500 rounded-sm w-5 h-5 text-xs'>
                ✓
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
