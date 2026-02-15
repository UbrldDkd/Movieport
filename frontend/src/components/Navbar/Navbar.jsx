// React
import { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';

// Modal
import { useAuthModal } from '../../api/account/auth/Modal/Context/AuthModalContext.js';

// Components
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import MobileFilterbox from './filterBox/MobileFilterbox.jsx';
import SeachInput from './Search/SearchInput.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import NavProfileDropdown from './NavProfileDropdown.jsx';

// Utils helpers
import { useIsLoggedIn } from '../../utils/helpers/useIsLoggedIn.js';

export default function Navbar() {
  const [value, setValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isMoviePage = useMatch('/film/:id');
  const isTvPage = useMatch('/tv/:id');

  const isContentPage = isMoviePage || isTvPage;

  const { openModal } = useAuthModal();
  const isLoggedIn = useIsLoggedIn();

  const [isOpen, setIsOpen] = useState({
    mobileMenu: false,
    searchPreview: false,
    profileDropdownMenu: false,
  });

  const handleOpen = (option, value) => {
    setIsOpen((prev) => ({ ...prev, [option]: value }));
  };

  return (
    <div className='relative z-50'>
      <nav
        className={`${
          isContentPage ? 'fixed top-0 left-0 w-full z-50' : 'relative'
        } h-16 px-4 transition-colors ${
          isContentPage
            ? 'bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent'
            : 'bg-red-950 shadow-md'
        }`}
      >
        <div className='max-w-7xl mx-auto flex items-center justify-between h-full'>
          <div className='flex items-center space-x-2 md:space-x-6'>
            <Link to='/'>
              <Logo />
            </Link>

            <div className='hidden md:flex space-x-2'>
              <Link to='/'>
                <NavButton label='Home' />
              </Link>
              <Link to='/films/'>
                <NavButton label='Films' />
              </Link>
              <Link to='/tv/'>
                <NavButton label='TV Shows' />
              </Link>
              <Link to='/lists/'>
                <NavButton label='Lists' />
              </Link>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='relative'>
              <SeachInput
                value={value}
                setValue={setValue}
                setIsOpen={handleOpen}
                setIsFocused={setIsSearchFocused}
              />

              {value && isSearchFocused && (
                <div className='absolute transition-opacity duration-120 top-full left-0 mt-1 z-40'>
                  <SearchPreview
                    value={value}
                    setValue={setValue}
                    setIsOpen={handleOpen}
                  />
                </div>
              )}
            </div>

            <div className='flex items-center gap-2 shrink-0'>
              {isLoggedIn ? (
                <NavProfileDropdown
                  setIsOpen={(v) => handleOpen('profileDropdownMenu', v)}
                  isOpen={isOpen.profileDropdownMenu}
                />
              ) : (
                <button
                  onClick={() => openModal('login')}
                  className='font-semibold tracking-wider hover:bg-red-900 text-zinc-200 px-4 py-1 rounded text-sm'
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden transition-all duration-200 overflow-hidden ${
          isOpen.mobileMenu
            ? 'max-h-9 opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className='flex justify-center items-center gap-2 px-2'>
          <Link to='/' onClick={() => handleOpen('mobileMenu', false)}>
            <NavButton label='Home' />
          </Link>
          <MobileFilterbox />
        </div>
      </div>
    </div>
  );
}
