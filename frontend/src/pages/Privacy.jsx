export default function Privacy() {
  return (
    <div className='mx-auto max-w-2xl px-6 py-10 text-text-primary font-light'>
      <h1 className='mb-4 text-3xl font-normal text-white'>Privacy Policy</h1>

      <p className='mb-6'>
        Your privacy is important to us. This page explains how we handle
        information while using this site.
      </p>

      <h2 className='text-xl font-normal mb-2 mt-6'>Information We Collect</h2>
      <p className='mb-4'>
        This website does not collect any personal information from visitors. No
        data is stored or shared, since the backend is not implemented.
      </p>

      <h2 className='text-xl font-normal mb-2 mt-6'>Third-Party APIs</h2>
      <p className='mb-4'>
        This site uses data from the{' '}
        <a
          href='https://www.themoviedb.org/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-red-900'
        >
          TMDb
        </a>{' '}
        and{' '}
        <a
          href='https://www.omdbapi.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline text-red-900'
        >
          OMDb
        </a>{' '}
        APIs. We do not store or share any personal information through these
        services.
      </p>

      <h2 className='text-xl font-normal mb-2 mt-6'>Cookies and Tracking</h2>
      <p className='mb-4'>
        This website does not use cookies or any tracking mechanisms.
      </p>

      <h2 className='text-xl font-normal mb-2 mt-6'>Data Sharing</h2>
      <p className='mb-4'>
        We do not sell, share, or distribute any user information.
      </p>

      <h2 className='text-xl font-normal mb-2 mt-6'>Contact</h2>
      <p className='mb-4'>
        If you have any questions regarding this privacy policy, please contact
        us via the{' '}
        <a href='/contact' className='underline text-red-900'>
          Contact page
        </a>
        .
      </p>

      <p className='text-sm mt-8 text-zinc-500'>Last updated: August 2025</p>
    </div>
  );
}
