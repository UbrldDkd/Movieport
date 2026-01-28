import { IoTrashSharp } from 'react-icons/io5';
import { Keys } from '../../../../utils/Keys';
import ContentCard from './ContentCard';

export default function ContentCardListView({ item, onRemove }) {
  const tmdb = item.tmdb;

  const { title, poster, titleTv, releaseDate, releaseDateTv } =
    Keys.API1.details;

  const fullTitle = tmdb?.[title] || tmdb?.[titleTv] || 'Untitled';
  const year = (tmdb?.[releaseDate] || tmdb?.[releaseDateTv] || '').slice(0, 4);

  return (
    <div className='flex items-start gap-3 bg-zinc-800/10 border border-zinc-700 rounded-xs p-2'>
      {/* Make ContentCard clickable by wrapping in a div with flex-shrink-0 */}
      <div className=''>
        <ContentCard item={item} view={'sm'} />
      </div>

      <div className='flex-1 flex flex-col justify-center'>
        <div className='flex items-baseline gap-3'>
          <span className='text-xl tracking-wider text-zinc-200 font-semibold'>
            {fullTitle}
          </span>
          {year && <span className='text-lg text-zinc-400'>{year}</span>}
        </div>
      </div>

      {onRemove && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from bubbling to ContentCard
            onRemove(tmdb);
          }}
          className='text-zinc-600 hover:cursor-pointer hover:text-zinc-400 transition-colors p-3 self-center'
        >
          <IoTrashSharp />
        </button>
      )}
    </div>
  );
}
