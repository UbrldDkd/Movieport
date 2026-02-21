import { GenreMap } from '../../../../utils/constants/GenreMap';

export default function DisplaySelected({ selectedGenres }) {
  if (selectedGenres.length === 0) {
    return (
      <p className='col-span-3 pt-3 text-sm text-gray-600'>
        Selected Genres: None
      </p>
    );
  }

  return (
    <div className='col-span-3 pt-3 text-sm text-gray-600 flex flex-wrap gap-1'>
      <span className='mr-1 text-zinc-400 font-semibold'>Selected Genres:</span>

      {/* Map through selected genre IDs and display their names */}
      {selectedGenres.map((id) => (
        <span
          key={id}
          className='bg-zinc-800 text-text-primary cursor-pointer rounded px-2 py-1 text-xs whitespace-normal'
        >
          {GenreMap[id]}
        </span>
      ))}
    </div>
  );
}
