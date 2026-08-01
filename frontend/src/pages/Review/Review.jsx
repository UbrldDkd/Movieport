import { Link } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';
import Pfp from '../../components/Common/Pfp';
import ContentContainer from '../../components/WrapperContainers/ContentContainer';
import ContentCardPoster from '../../components/ContentDisplays/ContentCard/ContentCardPoster';
import ContentPageActionsPanel from '../ContentPage/ContentPageMain/ContentPageActionsPanel/ContentPageActionsPanel';
import SectionHeader from '../../components/Sections/Common/SectionHeader';
import { Tooltip } from '../../components/common/Tooltip';
const mockReview = {
  id: 1,
  user: {
    id: 1,
    username: 'pseudonymm',
    avatar: '🎬',
    avatar_url: null,
  },
  content_relation: {
    tmdb_id: 12345,
    title: 'Eraserhead',
    poster_path: null,
    release_date: '1977-03-19',
    media_type: 'movie',
    watched: 'true',
    likes: 'true',
    watchlisted: 'false',
  },
  review: 'damn man i was also born on the sixth month',
  rating: 4,
  watched_status: 'watched',
  contains_spoilers: false,
  is_owner: false,
  created_at: '2026-07-18T10:00:00Z',
};

function StarRating({ rating }) {
  return (
    <div className='flex gap-0.5'>
      {[1, 2, 3, 4, 5].map((value) => {
        const half = value - 0.5;
        return (
          <div key={value} className='relative w-5 h-5'>
            {rating >= value ? (
              <IoIosStar className='w-5 h-5 text-red-900' />
            ) : rating >= half ? (
              <>
                <IoIosStar className='w-5 h-5 text-zinc-700 absolute' />
                <div className='absolute inset-0 overflow-hidden w-1/2'>
                  <IoIosStar className='w-5 h-5 text-red-900' />
                </div>
              </>
            ) : (
              <IoIosStar className='w-5 h-5 text-zinc-700' />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Review() {
  const review = mockReview;
  const {
    user,
    content_relation: content,
    rating,
    watched_status,
    contains_spoilers,
    created_at,
  } = review;

  const posterUrl = content.poster_path
    ? content.poster_path.startsWith('http')
      ? content.poster_path
      : `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : null;

  const watchedDate = new Date(created_at).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const year = content.release_date?.slice(0, 4);

  return (
    <div className=' pt-5 flex bg-zinc-950 text-text-primary'>
      <div className='flex mx-auto gap-10   '>
        <Link>
          <ContentCardPoster
            mockReview={mockReview.content_relation.poster_path}
            view='lg'
          />
        </Link>
        <div className=' min-w-[500px] '>
          {/* Reviewer byline */}
          <ContentContainer>
            <div className='flex gap-8'>
              {/* Poster */}

              {/* Review content */}
              <div className='flex-1 flex flex-col gap-5'>
                <div className='flex items-center gap-2 '>
                  <Pfp
                    user={user}
                    avatar={user.avatar}
                    avatarUrl={user.avatar_url}
                    size='xs'
                  />
                  <p className='text-xs text-zinc-500 tracking-wider'>
                    Review by{' '}
                    <Link
                      to={`/${user.username}`}
                      className='text-zinc-300 font-semibold hover:text-white transition-colors'
                    >
                      {user.username}
                    </Link>
                  </p>
                </div>

                <div className='border-t border-zinc-800' />
                {/* Title + year */}
                <div>
                  <h1 className='text-2xl font-semibold text-zinc-100'>
                    {content.title}{' '}
                    <span className='text-zinc-500 font-normal text-lg'>
                      {year}
                    </span>
                  </h1>
                </div>

                {/* Rating + watched date */}
                <div className='flex flex-col gap-2'>
                  <StarRating rating={rating} />
                  <div className='flex items-center gap-3'>
                    <p className='text-[10px] tracking-[0.2em] uppercase text-zinc-600'>
                      {watched_status === 'rewatched' ? 'Rewatched' : 'Watched'}{' '}
                      {watchedDate}
                    </p>
                    {contains_spoilers && (
                      <span className='text-[10px] tracking-widest uppercase border border-red-900/50 text-red-400 px-1.5 py-0.5 rounded-sm'>
                        Spoilers
                      </span>
                    )}
                  </div>
                </div>

                {/* Review text */}
                {review.review && (
                  <p className='text-sm text-zinc-300 leading-relaxed tracking-wide'>
                    {review.review}
                  </p>
                )}
              </div>
            </div>
          </ContentContainer>
        </div>
        <div className='flex flex-col gap-3 max-w-[224px] '>
          <ContentPageActionsPanel current={mockReview.content_relation} />
          <ContentContainer>
            <div className='flex justify-between items-baseline'>
              <div className=' font-semibold text-xs tracking-widest text-text-primary'>
                YOUR FRIENDS
              </div>{' '}
              <Link className='text-xs font-semibold tracking-widest text-zinc-400 hover:text-zinc-200'>
                1 watched
              </Link>
            </div>
            <div className='mt-1 mb-2.5 border-b border-zinc-600' />
            <div>
              <Pfp size='sm' />
            </div>
          </ContentContainer>

          <ContentContainer>
            <div className='flex justify-between items-baseline'>
              <div className='font-semibold text-xs tracking-widest text-text-primary'>
                YOUR FRIENDS
              </div>
            </div>
            <div className='mt-1 mb-2.5 border-b border-zinc-600' />

            <div className='flex gap-2.5  w-full'>
              {/* Left card — poster on the right, arrow on the left */}

              <div className='ring-2 ring-zinc-400 rounded-sm overflow-hidden flex-1 flex items-center justify-between cursor-pointer transition-all duration-150'>
                <div className='flex-1 flex items-center justify-center text-zinc-400'>
                  <span className='text-lg'>‹</span>
                </div>
                <div className='pointer-events-none flex-shrink-0'>
                  <ContentCardPoster
                    posterPath='/1jUC02qsqS2NxBMFarbIhcQtazV.jpg'
                    view='sm'
                  />
                </div>
              </div>

              {/* Right card — poster on the left, arrow on the right */}

              <div className='rounded-sm overflow-hidden flex-1 flex items-center justify-between cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-zinc-400'>
                <div className='pointer-events-none flex-shrink-0'>
                  <ContentCardPoster
                    posterPath='/1jUC02qsqS2NxBMFarbIhcQtazV.jpg'
                    view='sm'
                  />
                </div>
                <div className='flex-1 flex items-center justify-center text-zinc-400'>
                  <span className='text-lg'>›</span>
                </div>
              </div>
            </div>
          </ContentContainer>
        </div>
      </div>
    </div>
  );
}
