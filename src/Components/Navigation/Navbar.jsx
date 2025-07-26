import { useState } from 'react';
import Filterbox from './Filterbox/Filterbox.jsx';
import SearchButton from './Search/SearchButton.jsx';
import SeachInput from './Search/SearchInput.jsx';
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import { sampleMovies } from './MovieDataTemp.js';


export default function Navbar() {
    const [value, setValue] = useState('');
    
    function onChange(e) {
        setValue(e.target.value);
    }



    return (
  <div className="relative">
    <nav className="top-0 left-0 w-full bg-red-950 text-white shadow-md z-50 p-7">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* container for buttons and logo */}
        <div className="flex items-center space-x-6">
          <Logo />
          <NavButton label='Home' />
          <Filterbox />
          <NavButton label='Movies' />
          <NavButton label='TV Shows' />
          
        </div>

        {/* Right: Search input and button */}
        <div className="flex items-center space-x-4">
  <SearchButton />

  {/* Wrap the input and dropdown in a relative container */}
  <div className="relative">
    <SeachInput value={value} onChange={onChange} />

    {value && (
      <div  
      className="absolute top-full left-0 mt-1 rounded shadow-lg z-40" 
      style={{ width: 'fit-content', maxWidth: '100%' }}>

        <SearchPreview movies={sampleMovies} value={value} />
        
      </div>
    )}
  </div>
</div>



        

      </div>
    </nav>
  </div>
        )};