import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../api/account/auth/AuthContext';

export default function ProfileDropdown({ isOpen, setIsOpen }) {
  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  useContext(AuthContext);

  return (
    <div className='relative group'>
      {/* Avatar */}

      {/* Dropdown */}
      <div
        className={
          'absolute right-0 mt-3.5 w-36 bg-zinc-900 border border-zinc-800 rounded-md shadow-lg z-20 transition-all duration-150' +
          (isOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible')
        }
      >
        <div className='flex flex-col py-1 text-sm text-zinc-200'>
          <Link
            to='/profile'
            className='px-4 py-2 hover:bg-zinc-800'
            onClick={handleLinkClick}
          >
            Profile
          </Link>

          <Link
            to='/films'
            className='px-4 py-2 hover:bg-zinc-800'
            onClick={handleLinkClick}
          >
            Films
          </Link>

          <Link
            to='/watchlist'
            className='px-4 py-2 hover:bg-zinc-800'
            onClick={handleLinkClick}
          >
            Watchlist
          </Link>

          <Link
            to='/likes'
            className='px-4 py-2 hover:bg-zinc-800'
            onClick={handleLinkClick}
          ></Link>
        </div>
      </div>
    </div>
  );
}