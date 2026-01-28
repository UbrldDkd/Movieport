import { Link } from 'react-router-dom';
import { useState } from 'react';

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
          <div className='py-6 mt-3'>
            <p>© 2025 . All rights reserved.</p>
            <div className='flex justify-center space-x-4 font-semibold mt-2'>
              <Link to='/about' className='hover:text-white'>
                About
              </Link>
              <Link to='/contact' className='hover:text-white'>
                Contact
              </Link>
              <Link to='/privacy' className='hover:text-white'>
                Privacy
              </Link>
            </div>
            <p className='mt-3 text-xs text-zinc-600'>
              Movie data provided by OMDb API & TMDb
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
