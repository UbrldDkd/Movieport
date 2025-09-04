import { useState } from 'react';
import { Link } from 'react-router-dom';
import Filterbox from './Filterbox/Filterbox.jsx';
import SeachInput from './Search/SearchInput.jsx';
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import { Keys } from '../Keys.js';
import FetchPreview from './Search/CustomHooks/FetchPreview.jsx';

export default function Navbar() {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch search preview results
  const { previewContent, isLoading, error } = FetchPreview(value);

  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="relative">
      <nav className="top-0 left-0 w-full bg-red-950 text-white shadow-md z-50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left side: logo and navigation */}
          <div className="flex items-center space-x-2 md:space-x-6">
            <Link to="/" className="focus:outline-none">
              <Logo />
            </Link>

            <div className="hidden md:flex space-x-4">
              <Link to="/">
                <NavButton label="Home" />
              </Link>

              <Filterbox />

              <Link to="/movie">
                <NavButton label="Movies" />
              </Link>

              <Link to="/tv">
                <NavButton label="TV Shows" />
              </Link>
            </div>
          </div>

          {/* Right side: search input and mobile menu */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink md:w-auto">
              <SeachInput 
                value={value} 
                onChange={onChange} 
                setValue={setValue}
                setIsOpen={setIsOpen}
              />

              {/* Dropdown search preview */}
              {value && (
                <div 
                  className="absolute top-full right-0 md:left-0 mt-1 rounded shadow-lg z-40 w-full md:w-auto"
                  style={{ maxWidth: '100%' }}
                >
                  <SearchPreview 
                    content={previewContent} 
                    isLoading={isLoading} // fixed typo
                    error={error}
                    value={value}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                </div>
              )}
            </div>
            
            {/* Mobile list icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-red-900 transition-colors flex-shrink-0 relative z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
        
        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full mt-4 pb-4 border-t border-red-900 pt-4">
            <div className="flex justify-center items-center gap-2 px-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <NavButton label="Home" />
              </Link>
              
              <Filterbox />
              
              <Link to="/movie" onClick={() => setMobileMenuOpen(false)}>
                <NavButton label="Movies" />
              </Link>
              
              <Link to="/tv" onClick={() => setMobileMenuOpen(false)}>
                <NavButton label="TV Shows" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
