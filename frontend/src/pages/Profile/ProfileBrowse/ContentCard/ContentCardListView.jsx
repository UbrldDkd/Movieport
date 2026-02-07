import { IoTrashSharp } from 'react-icons/io5';
import { Keys } from '../../../../utils/Keys';
import ContentCard from './ContentCard';

export default function ContentCardListView({ item, onRemove }) {
  const { details } = Keys.API1;

  const mediaType = item?.[details.movieTitle] ? 'movie' : 'tv';

  const filteredItem = {
    tmdb_id: Number(item?.tmdb_id || item?.[details.id]),
    title: item?.[details.movieTitle] || item?.[details.tvTitle],
    release_date:
      item?.[details.movieReleaseDate] || item?.[details.tvReleaseDate],
    poster_path: item?.[details.poster],
    media_type: item?.media_type || mediaType,
  };

  return (
    <div className='flex items-start gap-3 bg-zinc-800/10 border border-zinc-700 rounded-xs p-2'>
      <div className=''>
        <ContentCard item={item} view={'sm'} />
      </div>

      <div className='flex-1 flex flex-col justify-center'>
        <div className='flex flex-col'>
          <div className='flex items-baseline gap-3'>
            <span className='text-xl tracking-wider text-zinc-200 font-semibold'>
              {filteredItem?.title}
            </span>

            <span className='text-lg text-zinc-400'>
              {filteredItem?.release_date.slice(0, 4)}
            </span>
          </div>
          <div className='text-xs text-zinc-400 font-semibold tracking-wide'>
            {filteredItem?.media_type === 'movie' ? 'Film' : 'Tv'}
          </div>
        </div>
      </div>

      {onRemove && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item);
          }}
          className='text-zinc-600 hover:cursor-pointer hover:text-zinc-400 transition-colors p-3 self-center'
        >
          <IoTrashSharp />
        </button>
      )}
    </div>
  );
}
