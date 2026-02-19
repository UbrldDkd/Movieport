// Icons
import { IoTrashSharp } from 'react-icons/io5';

// Utils helpers
import { Keys } from '../../../utils/constants/Keys';

// Components
import ContentCard from './ContentCard';
import MediaIcon from './MediaIcon';

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
    <div className='flex items-start gap-3 bg-zinc-800/10 border border-zinc-700 rounded-xs px-2 md:py-4 sm:py-2 py-2  pt-'>
      <ContentCard item={item} view={'sm'} />

      <div className='flex-1 flex flex-col justify-center'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-3'>
            <span className='md:text-xl sm:text-lg tracking-wider text-zinc-200 font-semibold'>
              {filteredItem?.title}
            </span>
            <span className='font-semibold md:text-lg text-zinc-400'>
              {filteredItem?.release_date.slice(0, 4)}
            </span>
          </div>

          <div className='text-xs text-zinc-400 font-semibold tracking-wide'>
            <MediaIcon mediaType={filteredItem?.media_type} />
          </div>
        </div>
      </div>

      {onRemove && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item?.tmdb_id);
          }}
          className='text-zinc-600 hover:cursor-pointer hover:text-zinc-400 transition-colors p-3 self-center'
        >
          <IoTrashSharp />
        </button>
      )}
    </div>
  );
}
