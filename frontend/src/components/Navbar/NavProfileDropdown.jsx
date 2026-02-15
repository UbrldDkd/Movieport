import { Link } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';
import { AuthContext } from '../../api/account/auth/AuthContext';
import { GiCaptainHatProfile } from 'react-icons/gi';
import LogoutButton from '../../api/account/auth/Modal/LogoutButton';

export default function NavProfileDropdown() {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  // Dropdown links array
  const dropdownLinks = [
    { label: 'Profile', to: `/${user.username}/` },
    { label: 'Watched', to: `/${user.username}/watched/` },
    { label: 'Watchlist', to: `/${user.username}/watchlist` },
    { label: 'Likes', to: `/${user.username}/likes/films/` },
    { label: 'Lists', to: `/${user.username}/lists/` },
  ];

  return (
    <div className='relative'>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Avatar */}
        {user.avatar ? (
          <img
            src={user.avatar}
            alt='Profile'
            className='w-9 h-9 rounded-full object-cover cursor-pointer border border-zinc-700'
          />
        ) : (
          <div className='w-9 h-9 rounded-full cursor-pointer border border-zinc-700 bg-zinc-800 flex items-center justify-center'>
            <GiCaptainHatProfile className='text-xl text-zinc-400' />
          </div>
        )}

        {/* Dropdown */}
        <div
          className={`
            absolute right-0 top-full mt-3.5 w-40 backdrop-blur-xl
            bg-zinc-900/90   rounded-b-sm shadow-lg z-50
            transition-all duration-200 ease-out
            transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
          `}
        >
          <div className='flex flex-col py-1 text-sm tracking-wider text-zinc-300/90'>
            {dropdownLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className='px-4 py-2 hover:bg-zinc-800 transition-colors font-semibold tracking-wider text-sm duration-100'
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <LogoutButton onCloseDropdown={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
