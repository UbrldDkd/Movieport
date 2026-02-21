export default function Contact() {
  return (
    <div className='mx-auto max-w-2xl font-light px-6 py-10 text-text-primary'>
      <h1 className='mb-4 text-3xl font-normal text-white'>Contact</h1>

      <p className='mb-6'>
        Have feedback, suggestions, or questions? Feel free to reach out using
        the form below or connect with me on GitHub.
      </p>

      <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className='mb-1 block text-sm'>Name</label>
          <input
            type='text'
            placeholder='Your name'
            className='w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2'
          />
        </div>

        <div>
          <label className='mb-1 block text-sm'>Email</label>
          <input
            type='email'
            placeholder='you@example.com'
            className='w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2'
          />
        </div>

        <div>
          <label className='mb-1 block text-sm'>Message</label>
          <textarea
            rows={5}
            placeholder='Your message...'
            className='w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2'
          />
        </div>

        <button
          type='submit'
          disabled
          className='cursor-not-allowed rounded bg-zinc-700 px-4 py-2 text-sm text-white opacity-50'
        >
          Submit (Disabled – Demo)
        </button>

        <p className='text-xs text-zinc-500 mt-1'>
          Form functionality coming soon.
        </p>
      </form>

      <div className='mt-8'>
        <p className='text-sm'>
          Or find me on GitHub:{' '}
          <a
            href='https://github.com/yourusername'
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-blue-400'
          >
            @yourusername
          </a>
        </p>
      </div>
    </div>
  );
}
