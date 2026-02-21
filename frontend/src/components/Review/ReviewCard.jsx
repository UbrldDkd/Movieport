import { GiCaptainHatProfile } from 'react-icons/gi';
import { VscHeartFilled } from 'react-icons/vsc';

import { formatNumber } from '../../utils/helpers/formatNumber';
import { renderStars } from '../../utils/style/ui/renderStars';
import ContentCard from '../ContentDisplays/ContentCard/ContentCard';
import { Tooltip } from '../Common/Tooltip';

export default function ReviewCard({ review, includeItemDetails = false }) {
  const item = review.content_relation;
  const username = review.user || `User ${review.id}`;

  return (
    <div className='bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors rounded-sm p-4 flex gap-4'>
      {/* Poster */}
      {includeItemDetails && item && (
        <div className='flex-shrink-0'>
          <ContentCard view='sm' item={item} />
        </div>
      )}

      {/* Body */}
      <div className='flex flex-col gap-3 flex-1 min-w-0'>
        {/* Title */}
        {includeItemDetails && item && (
          <div className='flex items-baseline gap-2'>
            <span className='text-zinc-200 font-semibold'>{item.title}</span>
            <span className='text-zinc-500 text-sm'>
              {item.release_date.slice(0, 4)}
            </span>
          </div>
        )}

        {/* User row */}
        <div className='flex items-center gap-2'>
          <div className='w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0'>
            <GiCaptainHatProfile className='text-zinc-400 text-sm' />
          </div>
          <span className='text-sm font-semibold text-text-primary'>
            {username}
          </span>
          <Tooltip label={`${review.rating}/5`}>
            <div className='flex items-center'>
              {renderStars({ rating: review.rating, size: 16 })}
            </div>
          </Tooltip>
          <span className='text-xs text-zinc-600 ml-auto'>
            {review.created_at}
          </span>
        </div>

        {/* Review text */}
        <p className='text-sm text-zinc-400 leading-relaxed tracking-wide'>
          {review.review || review.reviews || 'Great movie!'}
        </p>

        {/* Footer */}
        <div className='flex items-center justify-between pt-1 border-t border-zinc-800'>
          <button className='flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-900 transition-colors'>
            <VscHeartFilled className='text-sm' />
            <span>{formatNumber(review.like_count)}</span>
          </button>
          <span className='text-xs text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors'>
            More by {username}
          </span>
        </div>
      </div>
    </div>
  );
}
