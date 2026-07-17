import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className='mx-auto max-w-2xl px-6 py-10 font-light font-semibold tracking-wider text-text-primary'>
      <h1 className='mb-4 text-3xl font-normal text-white'>About</h1>

      <p className='mb-4 text-xs text-zinc-400'>
        This web app allows users to explore detailed information about movies
        and TV shows, including cast, trailers, ratings.
      </p>

      <p className='mb-4 text-xs text-zinc-400'>
        Powered by data from the{' '}
        <a
          href='https://www.omdbapi.com/'
          className='text-red-900 underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          OMDb API
        </a>{' '}
        and{' '}
        <a
          href='https://www.themoviedb.org/'
          className='text-red-900 underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          TMDb API
        </a>
        , providing up-to-date information on thousands of titles.
      </p>

      <h2 className='mt-8 mb-2 text-xl font-normal'>Features</h2>

      <ul className='mb-4 space-y-2'>
        {[
          'Browse movies and TV shows with detailed information, cast, trailers, ratings, and recommendations',
          'Search with suggestions and advanced filters by genre, year, country, and more',
          'Create and manage public or private custom lists',
          'Build and organize your watchlist',
          'Mark movies and TV shows as watched',
          'Like titles and view everything from your profile',
          'Select and showcase your favourite movies and TV shows',
          'Write and share reviews (coming soon)',
          'Follow other users and explore their profiles, lists, favourites, and activity',
          'Discover trending, popular, upcoming, and top-rated content',
          'Personalize your profile with avatars, pronouns, bio, location, and website',
          'Receive notifications for follows, likes, comments, reviews, and list updates',
        ].map((item) => (
          <li key={item} className='flex gap-2 text-xs text-zinc-400'>
            <span className='mt-0.5 text-red-900'>—</span>
            {item}
          </li>
        ))}
      </ul>

      <h2 className='mt-8 mb-2 text-xl font-normal'>Disclaimer</h2>

      <p className='mb-4 text-xs text-zinc-400'>
        This is a personal project and is not affiliated with any streaming
        service. All data belongs to its respective copyright owners.
      </p>

      <h2 className='mt-8 mb-2 text-xl font-normal'>More</h2>

      <p className='text-xs text-zinc-400'>
        Read the{' '}
        <Link to='/privacy' className='text-red-900 underline'>
          Privacy Policy
        </Link>{' '}
        or get in touch through the{' '}
        <Link to='/contact' className='text-red-900 underline'>
          Contact page
        </Link>
        .
      </p>
    </div>
  );
}
