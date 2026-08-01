import { useState } from 'react';
import { countries } from './constants/countries';
import { Link } from 'react-router-dom';

export default function CountryDropdown({ mediaType }) {
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

      {filtered.map((country) => (
        <Link
          key={country.code}
          to={`/${mediaType}/country/${encodeURIComponent(country.name)}`}
          className='
            block
            px-2
            py-1
            text-xs
            hover:bg-zinc-700
            hover:text-zinc-300
            text-zinc-900
            cursor-pointer
          '
        >
          {country.name}
        </Link>
      ))}
    </div>
  );
}
