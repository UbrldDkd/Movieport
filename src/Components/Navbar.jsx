import { useState } from 'react';
import Filterbox from './Filterbox.jsx';
import SearchButton from './SearchButton.jsx';

export default function Navbar() {
    const [value, setValue] = useState('');
    
    function onChange(e) {
        setValue(e.target.value);
    }



    return (
  <div>
    <nav className="fixed top-0 left-0 w-full bg-red-900 text-white shadow-md z-50 p-7">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* container for buttons and logo */}
        <div className="flex items-center space-x-6">

            {/* Logo here */}
          <div></div>

            {/* Filterbox */}
          <Filterbox />
        </div>

        {/* Right: Search input */}
        <div className="flex items-center space-x-4">
          <SearchButton />
        
          <input
            type="text"
            onChange={onChange}
            value={value}
            placeholder="Type something..."
            className="bg-red-900 hover:bg-zinc-900 rounded-3xl text-white px-4 py-2 transition-colors duration-300"
          />
        </div>
      </div>
    </nav>
  </div>
        )};