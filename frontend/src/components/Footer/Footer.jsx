import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <footer className='relative bg-gradient-to-t from-zinc-900 via-zinc-900 to-zinc-950 transition-colors duration-150 text-zinc-400 text-center text-sm mt-10 overflow-hidden'>
      {/* Gradient overlays */}
      <div className='absolute inset-0 bg-gradient-to-tr from-zinc-950 to-transparent z-0 pointer-events-none' />
      <div className='absolute inset-0 bg-gradient-to-tl from-zinc-950 to-transparent z-0 pointer-events-none' />

      {/* Content wrapper */}
      <div className='relative z-10 py-4'>
        <button
          className={`${isOpen ? 'text-red-900' : 'text-zinc-400'} font-medium mb-2`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Hide Footer' : 'Show Footer'}
        </button>

        {isOpen && (
          <div className='py-6 mt-3 flex flex-col items-center space-y-4'>
            {/* Short About */}
            <p className='max-w-md text-zinc-300'>
              MoviePort is your personal film & Tv-show tracker. Organize your
              watchlist, likes, and lists all in one place.
            </p>

            {/* Navigation links */}
            <div className='flex flex-wrap justify-center gap-4 font-semibold'>
              <Link to='/about' className='hover:text-white'>
                About
              </Link>
              <Link to='/contact' className='hover:text-white'>
                Contact
              </Link>
              <Link to='/privacy' className='hover:text-white'>
                Privacy
              </Link>
              <Link to='/cookies' className='hover:text-white'>
                Cookies
              </Link>
              <Link to='/terms' className='hover:text-white'>
                Terms
              </Link>
            </div>

            {/* GitHub link */}
            <div className='flex gap-4 mt-2 text-zinc-400'>
              <Link
                to='https://github.com/UbrldDkd'
                className='hover:text-zinc-300 text-xl'
              >
                <FaGithub />
              </Link>
            </div>

            {/* Legal / Credits */}
            <p className='mt-2 text-xs text-zinc-600'>
              © 2025 Movieport. All rights reserved.
            </p>
            <p className='text-xs text-zinc-600'>
              Movie data provided by TMDb. OMDb used as backup.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
