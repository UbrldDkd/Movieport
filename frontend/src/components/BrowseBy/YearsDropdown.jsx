import { years } from './constants/years';
import { Link } from 'react-router-dom';

export default function YearsDropdown({ mediaType }) {
  return (
    <div>
      <Link
        to={`/${mediaType}/popular`}

        className='cursor-pointer block text-start w-full px-2 py-1 text-xs text-zinc-900 hover:text-zinc-300 hover:bg-zinc-700'
      >
        All
      </Link>
      <Link
        to={`/${mediaType}/upcoming`}

        className='cursor-pointer block text-start w-full px-2 py-1 text-xs text-zinc-900 hover:text-zinc-300 hover:bg-zinc-700'
      >
        Upcoming
      </Link>
      {years.map((year) => (
        <Link
          to={`/${mediaType}/decade/${year.name}`}
          key={year.id}
          className='cursor-pointer block text-start w-full px-2 py-1 text-xs text-zinc-900 hover:text-zinc-300 hover:bg-zinc-700'
        >
          {year.name}
        </Link>
      ))}
    </div>
  );
}
