// tabs/GenresTab.jsx
import { Link } from 'react-router-dom';
import { GenreMap } from '../../../../../utils/GenreMap';

export default function GenresTab({ genres, mediaType, isLoading }) {
  const getGenreIdFromName = (genreName) => {
    const exactMatch = Object.entries(GenreMap).find(
      ([, name]) => name === genreName
    );
    if (exactMatch) return exactMatch[0];

    const words = genreName.split(/\s*&\s*|\s*,\s*|\s+/);
    for (const word of words) {
      const partialMatch = Object.entries(GenreMap).find(
        ([, name]) => name.toLowerCase() === word.toLowerCase().trim()
      );
      if (partialMatch) return partialMatch[0];
    }
    return null;
  };

  const renderSkeleton = () => (
    <div className='space-y-4 animate-pulse'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='h-12 bg-zinc-800/50 rounded-sm' />
      ))}
    </div>
  );

  if (isLoading) return renderSkeleton();

  if (genres.length === 0) {
    return (
      <div className='text-zinc-500 text-sm py-4'>
        No genre information available
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {genres.map((genre, index) => {
        const genreId = getGenreIdFromName(genre);
        return genreId ? (
          <Link
            key={index}
            to={`/${mediaType}?genres=${genreId}&match=any`}
            className='px-3 py-1.5 bg-zinc-900 text-zinc-300 text-xs font-semibold tracking-wide rounded-sm hover:bg-red-900 hover:text-zinc-100 transition-all duration-200'
          >
            {genre}
          </Link>
        ) : (
          <span
            key={index}
            className='px-4 py-2 bg-zinc-900 text-zinc-500 text-xs font-semibold tracking-wide rounded-sm'
          >
            {genre}
          </span>
        );
      })}
    </div>
  );
}
