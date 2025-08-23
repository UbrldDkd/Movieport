import { useState } from 'react';
import Filterbox from './Filterbox/Filterbox.jsx';
import SeachInput from './Search/SearchInput.jsx';
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import { Link } from 'react-router-dom';
import { Keys } from '../Keys.js';
import FetchPreview from './Search/CustomHooks/FetchPreview.jsx'

export default function Navbar() {
  const [value, setValue] = useState('');
  const [ isOpen, setIsOpen ] = useState(false)


  const { previewContent, isLoading, error } = FetchPreview(value)

  function onChange(e) {
    setValue(e.target.value);
  }

  

  return (
    <div className="relative">
      <nav className="top-0 left-0 w-full bg-red-950 text-white shadow-md z-50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: logo and nav links */}
          <div className="flex items-center  space-x-6">

            <Link to="/"
            className=" focus:outline-none focus:border-none">
                <Logo />
             </Link>
            <div className ='hidden md:flex'>
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

          
          <div className="flex items-center space-x-4">


            <div className="relative">
            
              <SeachInput 
              value={value} 
              onChange={onChange} 
              onFocus={console.log('on')}
              setValue={setValue}
              setIsOpen={setIsOpen}
              />
            

              {value && (
                <div className="absolute top-full left-0 mt-1 rounded shadow-lg z-40"
                     style={{ width: 'fit-content', maxWidth: '100%' }}>

                  <SearchPreview 
                  content={previewContent} 
                  isLoadig={isLoading}
                  error={error}
                  value={value}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  />

                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
