import { useState } from 'react';
import Filterbox from './Filterbox/Filterbox.jsx';
import SearchButton from './Search/SearchButton.jsx';
import SeachInput from './Search/SearchInput.jsx';
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import { sampleMovies } from '../Main/MovieDataTemp.js';


export default function Navbar() {
    const [value, setValue] = useState('');
    
    function onChange(e) {
        setValue(e.target.value);
    }



    return (
  <div>
    <nav className="fixed top-0 left-0 w-full bg-red-950 text-white shadow-md z-50 p-7">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* container for buttons and logo */}
        <div className="flex items-center space-x-6">

          <Logo />

          <Filterbox />
          
          <NavButton label='Movies' />

          <NavButton label='TV Shows' />

          
        </div>

        {/* Right: Search input and button */}
        <div className="flex items-center space-x-4">
          
          <SearchButton />
          
          <SeachInput value={value} onChange={onChange} />

          <SearchPreview movies={sampleMovies} value={value} />
          
          {/*login and registration goes here*/}
          <div></div>

        </div>
      
      </div>
    </nav>
  </div>
        )};