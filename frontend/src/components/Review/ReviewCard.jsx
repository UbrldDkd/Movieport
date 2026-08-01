// Third-party
import { Link } from 'react-router-dom';

// Icons
import { VscHeartFilled } from 'react-icons/vsc';

// Utils helpers
import { formatNumber } from '../../utils/helpers/formatNumber';
import { timeAgo } from '../../utils/helpers/timeAgo';
import { renderStars } from '../../utils/style/ui/renderStars';
import { formatDate } from '../../utils/helpers/FormatDate';

// Components
import { Tooltip } from '../Common/Tooltip';
import Pfp from '../Common/Pfp';
import ContentCard from '../ContentDisplays/ContentCard/ContentCard';

export default function ReviewCard({
  review,
  includeItemDetails = false,
  includeMoreRedirect = false,
  showProfile = true,
}) {
  const item = review.content_relation;

  return (
    <>
      {/* ── DESKTOP ── */}
      <div className='hidden sm:flex bg-zinc-800/30 hover:bg-zinc-800/50 transition-colors rounded-sm p-4 gap-4'>
        {includeItemDetails && item && (
          <div className='flex-shrink-0'>
            <ContentCard view='sm' item={item} />
          </div>
        )}

        <div className='flex flex-col gap-3 flex-1 min-w-0'>
          {includeItemDetails && item && (
            <div className='flex items-baseline gap-2'>
              <Link
                to={`/${review.user.username}/${item.media_type}/${encodeURIComponent(item.title)}`}
                state={{ reviewId: review.id }}
                className='truncate font-semibold text-zinc-200 hover:text-white transition-colors'
              >
                {item.title}
              </Link>

              <span className='text-zinc-500 text-sm shrink-0'>
                {item.release_date.slice(0, 4)}
              </span>
            </div>
          )}

          <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
            {showProfile && (
              <div className='flex items-center gap-2'>
                <Pfp
                  user={review.user_details || review.user}
                  avatar={review.avatar || review.user?.avatar}
                  avatarUrl={review.avatar_url || review.user?.avatar_url}
                  size='xs'
                  className='border-zinc-700 shrink-0'
                />

                <span className='text-sm font-semibold text-text-primary'>
                  {review.user?.username}
                </span>
              </div>
            )}

            <div className='flex items-center gap-2'>
              <Tooltip label={`${review.rating}/5`}>
                <div className='flex items-center'>
                  {renderStars({ rating: review.rating, size: 16 })}
                </div>
              </Tooltip>

              <span className='text-xs font-semibold tracking-wider text-zinc-400'>
                {review.watched_status === 'watched' ? 'watched' : 'rewatched'}
                <span className='text-zinc-500'>
                  {' '}
                  {formatDate(review.created_at)}
                </span>
              </span>
            </div>

            <span className='ml-auto text-xs text-zinc-600'>
              {timeAgo(review.created_at)}
            </span>
          </div>

          <p className='text-sm text-zinc-400 leading-relaxed tracking-wide'>
            {review.review || review.reviews || 'Great movie!'}
          </p>

          <div className='flex items-center justify-between pt-1 border-t border-zinc-800'>
            {review.is_owner && (
              <button className='flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-900 transition-colors'>
                <VscHeartFilled className='text-sm' />
                <span>{formatNumber(review.like_count)}</span>
              </button>
            )}

            {includeMoreRedirect && (
              <span className='cursor-pointer text-xs text-zinc-600 transition-colors hover:text-zinc-400'>
                More by {review.user.username}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className='flex sm:hidden flex-col gap-3 hover:bg-zinc-800/50 transition-colors rounded-sm'>
        {includeItemDetails && item && (
          <div className='flex items-center justify-between gap-2'>
            <div className='flex items-baseline gap-1.5 min-w-0'>
              <Link
                to={`/${review.user.username}/${item.media_type}/${encodeURIComponent(item.title)}`}
                state={{ reviewId: review.id }}
                className='truncate text-sm font-semibold text-zinc-200 hover:text-white transition-colors'
              >
                {item.title}
              </Link>

              <span className='text-zinc-500 text-sm shrink-0'>
                {item.release_date.slice(0, 4)}
              </span>
            </div>

            {showProfile && (
              <div className='flex items-center gap-2 shrink-0'>
                <span className='text-sm font-semibold text-text-primary'>
                  {review.user.username}
                </span>

                <Pfp
                  user={review.user_details || review.user}
                  avatar={review.avatar || review.user?.avatar}
                  avatarUrl={review.avatar_url || review.user?.avatar_url}
                  size='xs'
                  className='border-zinc-700 shrink-0'
                />
              </div>
            )}
          </div>
        )}

        <div className='flex items-center justify-between'>
          <Tooltip label={`${review.rating}/5`}>
            <div className='flex items-center'>
              {renderStars({ rating: review.rating, size: 16 })}
            </div>
          </Tooltip>

          <span className='text-xs text-zinc-600'>
            {timeAgo(review.created_at)}
          </span>
        </div>

        <div className='flex gap-3'>
          {includeItemDetails && item && (
            <div className='flex-shrink-0'>
              <ContentCard view='sm' item={item} />
            </div>
          )}

          <p className='flex-1 min-w-0 text-sm leading-relaxed tracking-wide text-zinc-400'>
            {review.review || review.reviews || 'Great movie!'}
          </p>
        </div>

        <div className='flex items-center justify-between border-zinc-800 pb-2'>
          {review.is_owner && (
            <button className='flex items-center gap-1.5 text-xs text-zinc-600 hover:text-red-900 transition-colors'>
              <VscHeartFilled className='text-sm' />
              <span>{formatNumber(review.like_count)}</span>
            </button>
          )}

          {includeMoreRedirect && (
            <span className='cursor-pointer text-xs text-zinc-600 transition-colors hover:text-zinc-400'>
              More by {review.user.username}
            </span>
          )}
        </div>
      </div>
    </>
  );
}
