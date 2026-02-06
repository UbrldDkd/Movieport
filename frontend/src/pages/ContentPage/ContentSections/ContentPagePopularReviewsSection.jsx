import { AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { GiCaptainHatProfile } from 'react-icons/gi';

export default function ContentPagePopularReviewsSection({
  reviews = [],
  isLoading,
}) {
  const reviewStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={i} className='w-4 h-4 text-red-900' />);
    }

    if (hasHalfStar) {
      stars.push(
        <AiFillStar
          key='half'
          className='w-4 h-4 text-red-900'
          style={{ opacity: 0.5 }}
        />
      );
    }

    return stars;
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
      Reviewer: 'film_critic_42',
      reviewText:
        'Absolutely stunning visuals and a masterful narrative. The performances are nothing short of extraordinary.',
      rating: 5,
      userRating: 5,
      likes: '4.2K',
      date: '2 days ago',
    },
    {
      id: 2,
      Reviewer: 'movie_lover_88',
      reviewText:
        'A solid entry in the genre, though it could have benefited from tighter pacing. Still worth watching.',
      rating: 3.5,
      userRating: 4,
      likes: '2.1K',
      date: '1 week ago',
    },
    {
      id: 3,
      Reviewer: 'cinema_enthusiast',
      reviewText:
        "While beautiful to look at, the story felt familiar. Great performances couldn't save the mediocre script.",
      rating: 3,
      userRating: 3,
      likes: '1.5K',
      date: '2 weeks ago',
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : staticReviews;

  return (
    <div className='mt-8'>
      <h2 className='text-lg font-semibold text-zinc-200 mb-4'>
        Popular Reviews
      </h2>
      <div className='space-y-4'>
        {displayReviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className='bg-zinc-800/30 p-4 rounded-sm hover:bg-zinc-800/40 transition-colors'
          >
            <div className='flex items-start justify-between mb-2'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-xs font-semibold text-zinc-300'>
                  <GiCaptainHatProfile className='text-sm' />
                </div>
                <div>
                  <div className='text-sm font-semibold text-zinc-300'>
                    {review.Reviewer || `User ${review.id}`}
                  </div>
                  <div className='text-xs text-zinc-500'>{review.date}</div>
                </div>
              </div>
              <div className='flex items-center gap-0.5'>
                {reviewStars(review.rating)}
              </div>
            </div>
            <p className='text-sm text-zinc-400 leading-relaxed mb-3'>
              {review.reviewText || review.reviews || 'Great movie!'}
            </p>
            <div className='flex items-center justify-between'>
              <button className='flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-400 transition-colors'>
                <AiOutlineHeart className='text-sm' />
                <span>{review.likes}</span>
              </button>
              <span className='text-xs text-zinc-600 hover:text-zinc-500 cursor-pointer transition-colors'>
                More reviews by {review.Reviewer?.split('_')[0] || 'this user'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className='mt-4 text-sm text-zinc-400 hover:text-zinc-300 font-medium transition-colors'>
        View all {reviews.length || '24'} reviews
      </button>
    </div>
  );
}