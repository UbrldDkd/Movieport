import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className='mx-auto max-w-2xl px-6 py-10 font-light font-semibold tracking-wider text-text-primary'>
      <h1 className='mb-4 text-3xl font-normal text-white'>Contact</h1>

      <p className='mb-6 text-xs text-zinc-400'>
        Have feedback, suggestions, or questions? Feel free to reach out using
        the form below or connect with me on GitHub.
      </p>

      <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className='mb-1 block text-xs text-zinc-400'>Name</label>
          <input
            type='text'
            placeholder='Your name'
            className='w-full rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 outline-none'
          />
        </div>

        <div>
          <label className='mb-1 block text-xs text-zinc-400'>Email</label>
          <input
            type='email'
            placeholder='you@example.com'
            className='w-full rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 outline-none'
          />
        </div>

        <div>
          <label className='mb-1 block text-xs text-zinc-400'>Message</label>
          <textarea
            rows={5}
            placeholder='Your message...'
            className='w-full resize-none rounded-sm border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-200 placeholder-zinc-600 outline-none'
          />
        </div>

        <button
          type='submit'
          disabled
          className='cursor-not-allowed text-xs font-semibold tracking-widest text-zinc-600 transition-colors'
        >
          SUBMIT — COMING SOON
        </button>
      </form>

      <div className='mt-10'>
        <h2 className='mb-2 flex items-center gap-2 text-xl font-normal'>
          <FaGithub className='text-zinc-200' />
          GitHub
        </h2>
        <p className='text-xs text-zinc-400'>
          GitHub:{' '}
          <a
            href='https://github.com/UbrldDkd'
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-red-900'
          >
            @UbrldDkd
          </a>
        </p>
      </div>
    </div>
  );
}
