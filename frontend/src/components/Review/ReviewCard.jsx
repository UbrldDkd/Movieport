// Icons
import { GiCaptainHatProfile } from 'react-icons/gi';
import { VscHeart, VscHeartFilled } from 'react-icons/vsc';

// Utils helpers
import { formatNumber } from '../../utils/helpers/formatNumber';

// Utils ui
import { renderStars } from '../../utils/style/ui/renderStars';

// Components
import ContentCard from '../ContentDisplays/ContentCard/ContentCard';
import { Tooltip } from '../Common/Tooltip';

export default function ReviewCard({ review, includeItemDetails = false }) {
  const item = review.content_relation;

  return (
    <div className='bg-zinc-800/30 p-4 rounded-sm hover:bg-zinc-800/40 transition-colors flex flex-col sm:flex-row gap-4'>
      {/* Left column: ContentCard */}
      {includeItemDetails && (
        <div className='flex-shrink-0 '>
          <ContentCard item={item} view='sm' />
        </div>
      )}

      {/* Right column: Review details */}
      <div className='flex-1 flex flex-col justify-between'>
        {/* Optional item title + release_date */}
        {includeItemDetails && item && (
          <div className='flex items-baseline gap-2 mb-2 text-xl text-zinc-300 font-semibold'>
            <span>{item.title}</span>
            <span className='text-zinc-500 text-base'>
              {item.release_date.slice(0, 4)}
            </span>
          </div>
        )}

        {/* User info & stars */}
        <div className='flex  mb-2'>
          <div className='flex items-baseline gap-2'>
            <div className='w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-semibold text-zinc-300'>
              <GiCaptainHatProfile className='text-sm' />
            </div>

            <div>
              <div className='text-sm flex gap-3 font-semibold text-zinc-300'>
                <span>{review.user || `User ${review.id}`}</span>

                <Tooltip label={`${review.rating}/5`}>
                  <div className='flex items-center gap-0.25'>
                    {renderStars({ rating: review.rating, size: 18 })}
                  </div>
                </Tooltip>
              </div>
              <div className='text-xs text-zinc-500'>{review.created_at}</div>
            </div>
          </div>
        </div>

        {/* Review text */}
        <p className='text-base tracking-wide text-zinc-300/90 leading-6 mb-3'>
          {review.review || review.reviews || 'Great movie!'}
        </p>

        {/* Likes & more reviews */}
        <div className='flex items-center justify-between'>
          <button className='flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-400 transition-colors'>
            {/* TODO: add like button to review */}
            <VscHeartFilled className='text-base' />
            <VscHeart />
            <span>{formatNumber(review.like_count)}</span>
          </button>

          <span className='text-xs text-zinc-600 hover:text-zinc-500 cursor-pointer transition-colors'>
            More reviews by {review.user || 'this user'}
          </span>
        </div>
      </div>
    </div>
  );
}
