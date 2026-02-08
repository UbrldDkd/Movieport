import { IoIosStar } from 'react-icons/io';
import { VscHeartFilled } from 'react-icons/vsc';
import { GiCaptainHatProfile } from 'react-icons/gi';

export default function ContentPagePopularReviewsSection({
  reviews = [],
  isLoading,
}) {
  const maxStars = 5;
  const iconSize = 18;
  const gap = 0.25;

  const reviewStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IoIosStar
          key={`full-${i}`}
          size={iconSize}
          className='text-zinc-500'
        />
      );
    }

    if (halfStar === 1) {
      stars.push(
        <div
          key='half'
          className='relative'
          style={{ width: iconSize, height: iconSize }}
        >
          <IoIosStar
            size={iconSize}
            className='text-transparent absolute top-0 left-0'
          />
          <div
            className='absolute top-0 left-0 overflow-hidden'
            style={{ width: iconSize / 2 }}
          >
            <IoIosStar size={iconSize} className='text-zinc-500' />
          </div>
        </div>
      );
    }

    return stars;
  };

  const formatLikeCount = (count) => {
    if (!count) return '0';
    if (count < 1000) return count.toString();
    return (count / 1000).toFixed(1) + 'K';
  };

  if (isLoading) {
    return (
      <div className='mt-8'>
        <h2 className='text-lg font-semibold text-zinc-200 mb-4'>
          Popular Reviews
        </h2>
        <div className='space-y-4'>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className='bg-zinc-800/30 p-4 rounded-sm animate-pulse'
            >
              <div className='h-4 w-3/4 bg-zinc-800/50 rounded mb-2' />
              <div className='h-4 w-1/2 bg-zinc-800/50 rounded mb-2' />
              <div className='h-3 w-full bg-zinc-800/50 rounded mb-1' />
              <div className='h-3 w-full bg-zinc-800/50 rounded mb-1' />
              <div className='h-3 w-3/4 bg-zinc-800/50 rounded' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const staticReviews = [
    {
      id: 1,
      user: 'film_critic_42',
      created_at: '2 days ago',
      rating: 5,
      review:
        'Absolutely stunning visuals and a masterful narrative. The performances are nothing short of extraordinary.',
      like_count: 4200,
    },
    {
      id: 2,
      user: 'movie_lover_88',
      created_at: '1 week ago',
      rating: 3.5,
      review:
        'A solid entry in the genre, though it could have benefited from tighter pacing. Still worth watching.',
      like_count: 2100,
    },
    {
      id: 3,
      user: 'cinema_enthusiast',
      created_at: '2 weeks ago',
      rating: 3,
      review:
        "While beautiful to look at, the story felt familiar. Great performances couldn't save the mediocre script.",
      like_count: 1500,
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : staticReviews;

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-semibold text-zinc-200'>Popular Reviews</h2>

      <div className='border-b border-zinc-700 mt-2 mb-3' />
      <div className='space-y-4'>
        {displayReviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className='bg-zinc-800/30 p-4 rounded-sm hover:bg-zinc-800/40 transition-colors'
          >
            <div className='flex items-start justify-between mb-2'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-semibold text-zinc-300'>
                  <GiCaptainHatProfile className='text-sm' />
                </div>
                <div>
                  <div className='text-sm font-semibold text-zinc-300'>
                    {review.user || `User ${review.id}`}
                  </div>
                  <div className='text-xs text-zinc-500'>
                    {review.created_at}
                  </div>
                </div>
              </div>
              <div className='flex items-center' style={{ gap: `${gap}px` }}>
                {reviewStars(review.rating)}
              </div>
            </div>
            <p className='text-base tracking-wide text-zinc-300/90 leading-relaxed mb-3'>
              {review.review || review.reviews || 'Great movie!'}
            </p>
            <div className='flex items-center justify-between'>
              <button className='flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-400 transition-colors'>
                <VscHeartFilled className='text-sm' />
                <span>
                  {formatLikeCount(review.likes || review.like_count)}
                </span>
              </button>
              <span className='text-xs text-zinc-600 hover:text-zinc-500 cursor-pointer transition-colors'>
                More reviews by {review.user || 'this user'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className='mt-4 text-sm text-zinc-400 cursor-pointer hover:text-zinc-300 font-medium transition-colors'>
        View all {reviews.length || '24'} reviews
      </button>
    </div>
  );
}
