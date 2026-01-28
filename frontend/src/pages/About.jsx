export default function About() {
  return (
    <div className='max-w-3xl mx-auto px-6 py-10 font-light text-zinc-300'>
      <h1 className='text-3xl mb-4 text-white font-normal'>
        About This Project
      </h1>

      <p className='mb-4'>
        This web app allows users to explore detailed information about movies
        and TV shows, including cast, trailers and ratings.
      </p>

      <p className='mb-4'>
        The app is powered by data from the{' '}
        <a
          href='https://www.omdbapi.com/'
          className='text-red-900 underline hover:text-zinc-200 transition-colors duration-200'
          target='_blank'
        >
          OMDb API
        </a>{' '}
        and{' '}
        <a
          href='https://www.themoviedb.org/'
          className='text-red-900 underline hover:text-zinc-200 transition-colors duration-200'
          target='_blank'
        >
          TMDb API
        </a>
        , providing up-to-date information on thousands of titles.
      </p>

      <h2 className='text-xl font-normal mt-8 mb-2 text-white'>Features</h2>
      <ul className='list-disc list-inside mb-4 space-y-1'>
        <li>Main page carousel showcasing the latest movies with details</li>
        <li>Multiple sections on the main page for easy browsing of content</li>
        <li>
          Filter movies and TV shows by genres, years, countries, and match type
          (any/all)
        </li>
        <li>Search functionality with live previews and instant results</li>
        <li>Watch page includes similar movies recommendations</li>
        <li>
          View trailers, descriptions, release dates, and other metadata from
          TMDb and OMDb
        </li>
      </ul>

      <h2 className='text-xl font-normal mt-8 mb-2 text-white'>Disclaimer</h2>
      <p className='mb-4'>
        This site is a personal project and is not affiliated with any streaming
        service. All data belongs to its respective copyright owners.
      </p>

      <h2 className='text-xl font-normal mt-8 mb-2 text-white'>Contact</h2>
      <p>
        Have feedback or suggestions? Feel free to reach out via the{' '}
        <a
          href='/contact'
          className='text-red-900 hover:text-zinc-200 transition-colors duration-200 underline'
        >
          contact page
        </a>
        .
      </p>
    </div>
  );
}
