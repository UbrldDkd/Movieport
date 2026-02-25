// React
import { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
// Modal
import { useAuthModal } from '../../api/account/auth/Modal/Context/AuthModalContext.js';

// Components
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import MobileFilterbox from './FilterBox/MobileFilterbox.jsx';
import SeachInput from './Search/SearchInput.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import NavProfileDropdown from './NavProfileDropdown.jsx';

// Utils helpers
import { useIsLoggedIn } from '../../utils/helpers/useIsLoggedIn.js';

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'Films', to: 'films' },
  { label: 'TV Shows', to: 'tv' },
  { label: 'Lists', to: 'lists' },
];

export default function Navbar() {
  const [value, setValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isFilmsPage = useMatch('/films/');
  const isTvPage = useMatch('/tv/');
  const isHomePage = useMatch('/') || useMatch('/');

  const activePage = isFilmsPage
    ? 'films'
    : isTvPage
      ? 'tv'
      : isHomePage
        ? 'home'
        : null;

  const isContentPage =
    activePage === 'films' || activePage === 'tv' || activePage === 'lists';

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
    <div className={`relative z-50 ${!isContentPage && 'sm:pt-16 md:pt-16'}`}>
      {' '}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors ${
          isContentPage
            ? 'bg-gradient-to-b hover:via-zinc-950/70 from-zinc-950 via-zinc-950/60 to-transparent'
            : 'bg-red-950 shadow-md'
        }`}
      >
        {/* ── Desktop row ── */}
        <div className='hidden sm:flex items-center justify-between h-16 px-4 max-w-[1140px] mx-auto'>
          {/* Left: Logo + nav links */}
          <div className='flex items-center space-x-6'>
            <Link to='/'>
              <Logo />
            </Link>
            <div className='flex items-center space-x-1'>
              {navLinks.map((item) => (
                <Link key={item.to} to={`/${item.to}`}>
                  <NavButton
                    label={item.label}
                    isActive={activePage === item.to}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Search + auth */}
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <SeachInput
                value={value}
                setValue={setValue}
                setIsOpen={handleOpen}
                setIsFocused={setIsSearchFocused}
              />
              {value && isSearchFocused && (
                <div className='absolute transition-opacity duration-120 top-full mt-2.5 z-40 w-full'>
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
    </div>
  );
}
