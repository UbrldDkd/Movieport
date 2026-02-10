// React
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

// Context
import { AuthContext } from '../../api/account/auth/AuthContext.js';

// Hooks
import { useFetchPreview } from './Search/hooks/useFetchPreview.js';

// Components
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import Filterbox from './filterBox/Filterbox.jsx';
import MobileFilterbox from './filterBox/MobileFilterbox.jsx';
import SeachInput from './Search/SearchInput.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import AuthModal from './authModal/AuthModal.jsx';
import NavProfileDropdown from './authModal/NavProfileDropdown.jsx';

export default function Navbar() {
  const [value, setValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isContentPage = useMatch('/watch/:mediaType/:id');

  const [isOpen, setIsOpen] = useState({
    mobileMenu: false,
    searchPreview: false,
    authModal: false,
    profileDropdownMenu: false,
  });

  const [activeAuthTab, setActiveAuthTab] = useState('login');

  const { user } = useContext(AuthContext);

  // Fetch preview content for search input
  const { previewContent, isLoading, error } = useFetchPreview(value);

  // Generic handler to update any isOpen option
  const handleOpen = (option, value) => {
    setIsOpen((prev) => ({ ...prev, [option]: value }));
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='relative'>
      <nav
        className={`${
          isContentPage ? 'fixed top-0 left-0 w-full z-50' : 'relative'
        } h-16 px-4  transition-colors ${
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

            <div className='hidden md:flex space-x-4'>
              <Link to='/'>
                <NavButton label='Home' />
              </Link>
              <Filterbox />
              <Link to='/explore/movie'>
                <NavButton label='Movies' />
              </Link>
              <Link to='/explore/tv'>
                <NavButton label='TV Shows' />
              </Link>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <div className='relative'>
              <SeachInput
                value={value}
                onChange={onChange}
                setValue={setValue}
                setIsOpen={handleOpen}
                isFocused={isSearchFocused}
                setIsFocused={setIsSearchFocused}
              />

              {value && isSearchFocused && (
                <div className='absolute transition-opacity duration-120 top-full left-0 mt-1 z-40'>
                  <SearchPreview
                    content={previewContent}
                    isLoading={isLoading}
                    error={error}
                    value={value}
                    setValue={setValue}
                    setIsOpen={handleOpen}
                  />
                </div>
              )}
            </div>

            <div className='flex items-center gap-2 shrink-0'>
              {user ? (
                <NavProfileDropdown
                  setIsOpen={(v) => handleOpen('profileDropdownMenu', v)}
                  isOpen={isOpen.profileDropdownMenu}
                />
              ) : (
                <>
                  <button
                    onClick={() =>
                      handleOpen('authModal', true) || setActiveAuthTab('login')
                    }
                    className='font-semibold tracking-wider hover:bg-red-900 text-zinc-200 px-4 py-1 rounded text-sm'
                  >
                    Log in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isOpen.authModal}
        onClose={() => handleOpen('authModal', false)}
        activeTab={activeAuthTab}
      />

      {/* <button
        onClick={() => handleOpen('mobileMenu', !isOpen.mobileMenu)}
        className='md:hidden text-zinc-400  rounded-b-3xl  bg-red-950 transition relative z-50'
      >
        <svg
          className={`w-6 h-6 transition-transform ${isOpen.mobileMenu ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button> */}

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
