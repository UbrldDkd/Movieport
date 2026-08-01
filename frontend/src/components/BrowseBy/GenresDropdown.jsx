import { genres } from './constants/tmdbGenres';
import { Link } from 'react-router-dom';

export default function GenresDropdown({ mediaType }) {
  return (
    <div>
      <Link
        to={`/films/popular`}
        className='block w-full text-start px-2 c cursor-pointer py-1 text-xs text-zinc-900 hover:bg-zinc-700 hover:text-zinc-300'
      >
        All
      </Link>
      {genres.map((genre) => (
        <Link
          to={`/${mediaType}/genre/${genre.name.toLowerCase()}`}
          key={genre.id}
          className='block w-full text-start px-2 c cursor-pointer py-1 text-xs text-zinc-900 hover:bg-zinc-700 hover:text-zinc-300'
        >
          {genre.name}
        </Link>
      ))}
    </div>
  );
}
