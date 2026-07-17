import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='relative mt-10 overflow-hidden bg-gradient-to-t from-zinc-900 via-zinc-900 to-zinc-950 text-center text-sm text-zinc-400 transition-colors duration-150'>
      <div className='pointer-events-none absolute inset-0 z-0 bg-gradient-to-tr from-zinc-950 to-transparent' />
      <div className='pointer-events-none absolute inset-0 z-0 bg-gradient-to-tl from-zinc-950 to-transparent' />

      <div className='relative z-10 py-4'>
        <div className='mt-3 flex flex-col items-center space-y-4 py-6'>
          <p className='max-w-md text-xs tracking-wider text-zinc-400'>
            MoviePort is your personal film & TV show tracker. Organize your
            watchlist, likes, reviews, favourites, and lists all in one place.
          </p>

          <div className='flex flex-wrap justify-center gap-4 text-xs font-semibold tracking-widest'>
            {['about', 'contact', 'privacy'].map((page) => (
              <Link
                key={page}
                to={`/${page}`}
                className='uppercase text-zinc-500 transition-colors duration-150 hover:text-zinc-200'
              >
                {page}
              </Link>
            ))}
          </div>

          <div className='mt-2 flex gap-4 text-zinc-600'>
            <a
              href='https://github.com/UbrldDkd'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl transition-colors duration-150 hover:text-zinc-400'
            >
              <FaGithub />
            </a>
          </div>

          <p className='mt-2 text-xs tracking-wider text-zinc-600'>
            © 2025 MoviePort. All rights reserved.
          </p>

          <p className='text-xs tracking-wider text-zinc-600'>
            Movie data provided by{' '}
            <a
              href='https://www.themoviedb.org'
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-xs bg-bg-secondary px-0.5 py-0.5 font-semibold transition-colors duration-100 hover:bg-zinc-800 hover:text-zinc-400'
            >
              TMDb
            </a>{' '}
            and{' '}
            <a
              href='https://www.omdbapi.com'
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-xs bg-bg-secondary px-0.5 py-0.5 font-semibold transition-colors duration-100 hover:bg-zinc-800 hover:text-zinc-400'
            >
              OMDb
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
