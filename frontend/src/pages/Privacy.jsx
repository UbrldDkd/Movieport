export default function Privacy() {
  return (
    <div className='mx-auto max-w-2xl px-6 py-10 font-light font-semibold tracking-wider text-text-primary'>
      <h1 className='mb-4 text-3xl font-normal text-white'>Privacy Policy</h1>

      <p className='mb-6 text-xs text-zinc-400'>
        Your privacy matters to us. This page explains what information we
        collect and how we use it.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-normal'>Information We Collect</h2>
      <p className='mb-4 text-xs text-zinc-400'>
        When you register, we collect your email address for authentication
        purposes only. No additional personal information is required or stored.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-normal'>Third-Party APIs</h2>
      <p className='mb-4 text-xs text-zinc-400'>
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
        APIs to power movie and TV data. Your account information is never
        shared with or transmitted to these services.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-normal'>Cookies</h2>
      <p className='mb-4 text-xs text-zinc-400'>
        We use cookies solely to keep you logged in between sessions. These are
        essential session cookies — no advertising, no analytics, and no
        third-party tracking of any kind.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-normal'>Data Sharing</h2>
      <p className='mb-4 text-xs text-zinc-400'>
        We do not sell, rent, or share your data with any third party. Your
        email address is used only for authentication purposes.
      </p>

      <h2 className='mt-6 mb-2 text-xl font-normal'>Contact</h2>
      <p className='mb-4 text-xs text-zinc-400'>
        If you have any questions regarding this privacy policy, please reach
        out via the{' '}
        <a href='/contact' className='underline text-red-900'>
          Contact page
        </a>
        .
      </p>

      <p className='mt-8 text-sm text-zinc-500'>Last updated: August 2025</p>
    </div>
  );
}
