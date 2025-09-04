import SelectGButton from './SelectGButton';
import SelectYButton from './SelectYButton.jsx';
import SelectCButton from './SelectCButton.jsx';
import DisplaySelectedGenres from './DisplaySelectedGenres.jsx';
import DisplaySelectedYears from './DisplaySelectedYears.jsx';
import DisplaySelectedCountries from './DisplaySelectedCountries.jsx';
import { useState, useRef , useEffect } from 'react';
import { GenreMap } from  '../../GenreMap.js';
import { Link } from 'react-router-dom';

export default function MobileFilterbox() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [mediaType, setMediaType] = useState('movie');
  const [isOpen, setIsOpen] = useState(false);
  const [matchType, setMatchType] = useState('any');
  const [activeTab, setActiveTab] = useState('genres'); // genres, years, countries
  const buttonRef = useRef(null)

  const years = Array.from({ length: 2025 - 1920 + 1 }, (_, i) => 1920 + i).sort((a,b) => b-a);
  const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IT', name: 'Italy' },
  { code: 'AU', name: 'Australia' },
  { code: 'ES', name: 'Spain' },
  { code: 'CN', name: 'China' },
  { code: 'BR', name: 'Brazil' },
  { code: 'SE', name: 'Sweden' },
  { code: 'RU', name: 'Russia' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'AT', name: 'Austria' },
  { code: 'PL', name: 'Poland' },
  { code: 'GE', name: 'Georgia' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'IL', name: 'Israel' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TH', name: 'Thailand' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'GR', name: 'Greece' },
  { code: 'PT', name: 'Portugal' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HU', name: 'Hungary' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'UA', name: 'Ukraine' },
];

  const validMediaTypes = ['movie', 'tv'];
  if (!validMediaTypes.includes(mediaType)) {
    console.error(`Invalid media type: ${mediaType}. Defaulting to 'movie'.`);
    setMediaType('movie');
  }
  
  const dropdownRef = useRef(null);
  const genres = Object.entries(GenreMap);

  function toggleDropdown() {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setSelectedGenres([]);
      setSelectedYears([]);
      setSelectedCountries([]);
      setActiveTab('genres');
    }
  }

  function handleClear() {
    setSelectedGenres([])
    setSelectedYears([])
    setSelectedCountries([])
  }

  function handleSelectGenre(g) {
    setSelectedGenres(prev => {
      if(prev.includes(g)) {
        return prev.filter(genre => genre !== g);
      } else {
        return [...prev, g];
      }
    });
  }

  function handleSelectYear(y) {
    setSelectedYears(prev => {
      if(prev.includes(y)) {
        return prev.filter(year => year !== y);
      } else {
        return [...prev, y];
      }
    });
  }

  function handleSelectCountry(c) {
    setSelectedCountries(prev => {
      if (prev.some(country => country.code === c.code)) {
        return prev.filter(country => country.code !== c.code);
      } else {
        return [...prev, c];
      }
    });
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
  },[isOpen])

  return (
    <div className='col-span-3'>
      <button ref={buttonRef} onClick={toggleDropdown} className='bg-red-950 text-zinc-200 px-4 cursor-pointer py-2 rounded hover:text-zinc-400'>
        Filters
      </button>

      <div
        ref={dropdownRef}
        className={`
          absolute top-full bg-zinc-900 rounded-md drop-shadow-black p-3 z-10 w-80 left-1/2 transform -translate-x-1/2
          transition-all duration-300
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
        `}
      >
        {/* Tab Navigation */}
        <div className="flex justify-between mb-4 border-b border-zinc-700">
          <button
            onClick={() => setActiveTab('genres')}
            className={`px-3 py-2 text-sm rounded-t ${
              activeTab === 'genres' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Genres
          </button>
          <button
            onClick={() => setActiveTab('years')}
            className={`px-3 py-2 text-sm rounded-t ${
              activeTab === 'years' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Years
          </button>
          <button
            onClick={() => setActiveTab('countries')}
            className={`px-3 py-2 text-sm rounded-t ${
              activeTab === 'countries' ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Countries
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-48 max-h-64 overflow-y-auto scrollbar-hide">
          {activeTab === 'genres' && (
            <div className="grid grid-cols-2 gap-1">
              {genres.map(([id, name]) => (
                <SelectGButton
                  key={id}
                  item={name}
                  id={id}
                  selectedItems={selectedGenres}
                  onSelect={handleSelectGenre}
                />
              ))}
            </div>
          )}

          {activeTab === 'years' && (
            <div className="grid grid-cols-3 gap-1">
              {years.map((y) => (
                <SelectYButton
                  key={y}
                  item={y}
                  id={y}
                  selectedItems={selectedYears}
                  onSelect={handleSelectYear}
                />
              ))}
            </div>
          )}

          {activeTab === 'countries' && (
            <div className="grid grid-cols-1 gap-1">
              {countries.map((c) => (
                <SelectCButton
                  key={c.code}
                  item={c}
                  selectedItems={selectedCountries}
                  onSelect={handleSelectCountry}
                />
              ))}
            </div>
          )}
        </div>

        {/* Selected Items Display */}
        <div className="mt-4 space-y-2">
          <DisplaySelectedGenres selectedGenres={selectedGenres} />
          <DisplaySelectedYears selectedYears={selectedYears} />
          <DisplaySelectedCountries selectedCountries={selectedCountries} />
        </div>

        {/* Controls */}
        <div className="mt-4 space-y-2">
          {/* Media Type Selection */}
          <div>
            <div className="relative group inline-block cursor-help">
              <p className="text-xs text-zinc-400 mb-1">Media</p>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-40 bg-zinc-900 text-zinc-300 text-xs p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                <p className='text-zinc-200 font-semibold'>Select media type</p> 
                <p>Choose between Movies or TV Shows to filter content.</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setMediaType('movie')}
                className={`flex-1 text-sm px-3 py-2 rounded transition-colors duration-150 ${
                  mediaType === 'movie' ? 'bg-zinc-700 text-white' : 'bg-zinc-500 text-zinc-950 hover:text-zinc-300 cursor-pointer'
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setMediaType('tv')}
                className={`flex-1 text-sm px-3 py-2 rounded transition-colors duration-150 ${
                  mediaType === 'tv' ? 'bg-zinc-700 text-white' : 'bg-zinc-500 text-zinc-950 hover:text-zinc-300 cursor-pointer'
                }`}
              >
                TV Shows
              </button>
            </div>
          </div>

          {/* Action Buttons Layout */}
          <div className="flex space-x-2">
            {/* Clear and Filter buttons - 60% width */}
            <div className="flex flex-col space-y-2 w-3/5">
              <div className="relative group inline-block cursor-help">
                <p className="text-xs text-zinc-400 mb-1">Filter/Clear</p>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-52 bg-zinc-900 text-zinc-300 text-xs p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                  <p className='text-zinc-200 font-semibold'>Filter by selections or clear all</p> 
                  <p>Use "Clear" to remove all selections, or "Filter" to apply your current selections and view results.</p>
                </div>
              </div>
              <button
                onClick={handleClear}
                className="bg-red-950 text-sm text-zinc-300 px-4 cursor-pointer py-2 rounded hover:text-zinc-500 transition-colors duration-140"
              >
                Clear
              </button>
              
              {(selectedGenres.length > 0 || selectedYears.length > 0 || selectedCountries.length > 0) ? (
                <Link
                  to={`/${mediaType}?${
                    selectedGenres.length > 0 ? `genres=${selectedGenres.join(',')}&` : ''
                  }${
                    selectedYears.length > 0 ? `years=${selectedYears.join(',')}&` : ''
                  }${
                    selectedCountries && selectedCountries.length > 0 ? `countries=${selectedCountries.map((c)=> c.code).join(',')}&` : ''
                  }match=${matchType}`}
                  className="w-full"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-zinc-500 text-sm text-zinc-950 px-4 cursor-pointer py-2 rounded hover:text-zinc-300 transition-colors duration-140"
                  >
                    Filter
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="bg-zinc-700 text-sm text-zinc-500 px-4 cursor-not-allowed py-2 rounded transition-colors duration-140"
                >
                  Filter
                </button>
              )}
            </div>

            {/* Match Type buttons - 40% width */}
            <div className="flex flex-col space-y-2 w-2/5">
              <div className="relative group inline-block cursor-help">
                <p className="text-xs text-zinc-400 mb-1">Match</p>
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-52 bg-zinc-900 text-zinc-300 text-xs p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200 z-50">
                  <p className='text-zinc-200 font-semibold'>Choose how genres are matched:</p> 
                  <p>"<span className='font-semibold text-red-900'>Any</span>" means results can contain any of your selected filters;</p> 
                  <p>"<span className='font-semibold text-red-900'>And</span>" means results must contain all your selected filters.</p>
                </div>
              </div>
              <button
                onClick={() => setMatchType('any')}
                disabled={selectedGenres.length < 2}
                className={`px-3 py-2 text-sm rounded disabled:cursor-default disabled:bg-zinc-700 disabled:text-zinc-800 ${
                  matchType === 'any' ? 'bg-zinc-600 text-red-950' : 'bg-zinc-700 text-zinc-800 cursor-pointer'
                }`}
              >
                Any
              </button>
              <button
                onClick={() => setMatchType('and')}
                disabled={selectedGenres.length < 2}
                className={`px-3 py-2 text-sm rounded disabled:cursor-default disabled:bg-zinc-700 disabled:text-zinc-800 ${
                  matchType === 'and' ? 'bg-zinc-600 text-red-950' : 'bg-zinc-700 text-zinc-800 cursor-pointer'
                }`}
              >
                And
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}