// Third-party
import { Link } from 'react-router-dom';

// Components
import ReviewCard from '../../Review/ReviewCard';
import SectionHeader from '../Common/SectionHeader';

export default function ReviewsSection({
  header,
  reviews = [],
  isLoading,
  includeItemDetails = false,
  url,
}) {
  if (isLoading) {
    return (
      <div>
        <SectionHeader header={header} url={url} />
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
      content_relation: {
        title: 'Everything Everywhere All At Once',
        poster_path: '/poster1.jpg',
        media_type: 'film',
        tmdb_id: 12345,
        release_date: '2022-03-11',
      },
    },
    {
      id: 2,
      user: 'movie_lover_88',
      created_at: '1 week ago',
      rating: 3.5,
      review:
        'A solid entry in the genre, though it could have benefited from tighter pacing. Still worth watching.',
      like_count: 2100,
      content_relation: {
        title: 'Stranger Things',
        poster_path: '/poster2.jpg',
        media_type: 'tv',
        tmdb_id: 67890,
        release_date: '2016-07-15',
      },
    },
    {
      id: 3,
      user: 'cinema_enthusiast',
      created_at: '2 weeks ago',
      rating: 3,
      review:
        "While beautiful to look at, the story felt familiar. Great performances couldn't save the mediocre script.",
      like_count: 1500,
      content_relation: {
        title: 'The Batman',
        poster_path: '/poster3.jpg',
        media_type: 'film',
        tmdb_id: 54321,
        release_date: '2022-03-04',
      },
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : staticReviews;

  return (
    <div>
      <SectionHeader header={header} />

      <div className='space-y-2.5'>
        {displayReviews.slice(0, 3).map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            includeItemDetails={includeItemDetails}
          />
        ))}
      </div>
    </div>
  );
}
