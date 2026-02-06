import SelectGButton from './Buttons/SelectGButton.jsx';
import SelectYButton from './Buttons/SelectYButton.jsx';
import SelectCButton from './Buttons/SelectCButton.jsx';
import DisplaySelectedGenres from './Displays/DisplaySelectedGenres.jsx';
import DisplaySelectedYears from './Displays/DisplaySelectedYears.jsx';
import DisplaySelectedCountries from './Displays/DisplaySelectedCountries.jsx';
import { useState, useRef, useEffect } from 'react';
import { GenreMap } from '../../../utils/GenreMap.js';
import { Link } from 'react-router-dom';

export default function Filterbox() {
  const [selectedGenres, setSelectedGenres] = useState([]); // state to hold selected genres
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [mediaType, setMediaType] = useState('movie'); // media type can be 'movie' or 'tv'
  const [isOpen, setIsOpen] = useState(false); // state for dropdown visibility
  const [matchType, setMatchType] = useState('any'); // 'or' or 'and' for genre matching
  const [leftPanelOpen, setLeftPanelOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const buttonRef = useRef(null);

  const years = Array.from(
    { length: 2025 - 1920 + 1 },
    (_, i) => 1920 + i
  ).sort((a, b) => b - a);
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

  // Validate mediaType to ensure it is either 'movie' or 'tv'
  const validMediaTypes = ['movie', 'tv'];
  if (!validMediaTypes.includes(mediaType)) {
    console.error(`Invalid media type: ${mediaType}. Defaulting to 'movie'.`);
    setMediaType('movie');
  }

  const dropdownRef = useRef(null);

  // takes in the GenreMap and converts it to an array of objects
  const genres = Object.entries(GenreMap);

  //general Filterbox button functions
  function toggleDropdown() {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      // only reset selections when opening
      setSelectedGenres([]);
      setSelectedYears([]);
      setSelectedCountries([]);
    }
  }

  //handles clearing the selected genres
  function handleClear() {
    setSelectedGenres([]);
    setSelectedYears([]);
    setSelectedCountries([]);
  }

  //handles selecting a genre, adds it to the selected genres or removes it if already selected
  function handleSelectGenre(g) {
    setSelectedGenres((prev) => {
      if (prev.includes(g)) {
        return prev.filter((genre) => genre !== g);
      } else {
        return [...prev, g];
      }
    });
  }

  function handleSelectYear(y) {
    setSelectedYears((prev) => {
      if (prev.includes(y)) {
        return prev.filter((year) => year !== y);
      } else {
        return [...prev, y];
      }
    });
  }

  function handleSelectCountry(c) {
    setSelectedCountries((prev) => {
      // Check if a country with the same code is already in the list
      if (prev.some((country) => country.code === c.code)) {
        // Remove it
        return prev.filter((country) => country.code !== c.code);
      } else {
        // Add it
        return [...prev, c];
      }
    });
  }

  useEffect(() => {
    if (!isOpen) {
      setLeftPanelOpen(false);
      setRightPanelOpen(false);
    }
  }, [isOpen]);

  //handles clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className='col-span-3'>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className=' select-none cursor-pointer text-zinc-200 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded md:ml-2 hover:text-zinc-400 transition-colors duration-300 flex items-center gap-1.5 md:gap-2'
      >
        <svg
          className='w-4 h-4 md:w-5 md:h-5 md:hidden'
          fill='currentColor'
          viewBox='0 0 20 20'
        >
          <path
            fillRule='evenodd'
            d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
            clipRule='evenodd'
          />
        </svg>
        Select filters
      </button>

      <div
        ref={dropdownRef}
        className={`
    absolute top-full backdrop-blur-xl
            bg-zinc-900/90 border border-zinc-800 rounded-md drop-shadow-black px-2 py-1.5 z-10 grid grid-cols-3 grid-rows-3 gap-2 max-w-[430px]
    transition-all duration-300
    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
  `}
      >
        {/* Left Panel Toggle */}
        {isOpen && !leftPanelOpen && (
          <button
            onClick={() => setLeftPanelOpen((prev) => !prev)}
            className='absolute left-[-20.5px] top-1/2 -translate-y-1/2 h-10 w-5 bg-red-950 text-white rounded-l-md hover:bg-red-900 z-20 flex items-center justify-center cursor-pointer'
          >
            {'<'}
          </button>
        )}

        {/* Right Panel Toggle */}
        {isOpen && !rightPanelOpen && (
          <button
            onClick={() => setRightPanelOpen((prev) => !prev)}
            className='absolute right-[-21.5px] top-1/2 -translate-y-1/2 h-10 w-5 bg-red-950 text-white rounded-r-md hover:bg-red-900 z-20 flex items-center justify-center cursor-pointer'
          >
            {'>'}
          </button>
        )}

        {/* Left Panel for filtering by years*/}
        <div
          className={`
  absolute top-0 left-[-220px] h-full w-52 bg-zinc-900/90 backdrop-blur-lg text-white rounded-md z-10 p-2 flex flex-col
  transition-all duration-300
  ${
    leftPanelOpen
      ? 'translate-x-0 opacity-100'
      : 'translate-x-full opacity-0 pointer-events-none'
  }      // exit: slide right and fade out
`}
        >
          <button
            onClick={() => setLeftPanelOpen(false)}
            className='absolute top-2 left-2 h-6 w-6 bg-red-950 rounded-full flex items-center justify-center hover:bg-red-900 z-20 cursor-pointer'
          >
            x
          </button>

          {/* Scrollable list */}
          <div className='flex-1 overflow-y-auto scrollbar-hide mt-8 mb-2 flex flex-col items-center'>
            {years.map((y) => (
              <SelectYButton
                key={y}
                item={y}
                id={y}
                selectedItems={selectedYears}
                onSelect={handleSelectYear}
                className='my-1 cursor-pointer '
              />
            ))}
          </div>
          <div className='z-10 cursor-default'>
            <DisplaySelectedYears selectedYears={selectedYears} />
          </div>

          {/* Gradient overlays */}
          <div className='absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-zinc-900 via-red-950 to-zinc-900 rounded-l-md pointer-events-none'></div>

          <div className='pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900 rounded-md'></div>
        </div>

        {/* Right Panel for filtering by countries */}
        <div
          className={`
  absolute top-0 right-[-220px] h-full w-52 bg-zinc-900 text-white rounded-md z-10 p-2 flex flex-col
  transition-all duration-300
  ${
    rightPanelOpen
      ? 'translate-x-0 opacity-100'
      : '-translate-x-full opacity-0 pointer-events-none'
  }     // exit: slide left and fade out
`}
        >
          <button
            onClick={() => setRightPanelOpen(false)}
            className='absolute top-2 right-2 h-6 w-6 bg-red-950 text-white rounded-full flex items-center justify-center hover:bg-red-900 z-20 cursor-pointer'
          >
            x
          </button>

          {/* Scrollable list */}
          <div className='flex-1 overflow-y-auto scrollbar-hide mt-8 mb-2 flex flex-col items-center'>
            {countries.map((c) => (
              <SelectCButton
                key={c.code}
                item={c}
                selectedItems={selectedCountries}
                onSelect={handleSelectCountry}
                className='my-1'
              />
            ))}
          </div>

          {/* Display selected countries */}
          <div className='z-10 cursor-default'>
            <DisplaySelectedCountries selectedCountries={selectedCountries} />
          </div>

          {/* Gradient overlays */}
          <div className='absolute top-0 left-0 h-full w-0.5 bg-linear-to-b from-zinc-900 via-red-950 to-zinc-900 rounded-r-md pointer-events-none'></div>
          <div className='pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900 rounded-md'></div>
        </div>

        {/* Genre selection*/}
        {genres.map(([id, name]) => (
          <SelectGButton
            key={id}
            item={name}
            id={id}
            selectedItems={selectedGenres}
            onSelect={handleSelectGenre}
          />
        ))}

        <div className='col-span-3 w-full flex space-x-1 z-50 py-2'>
          {/* Mediatype selection */}
          <div className='flex-1 flex flex-col justify-between'>
            <div className='flex space-x-1 mt-5'>
              <button
                onClick={() => setMediaType('movie')}
                className={`flex-1 font-semibold tracking-wider text-sm px-1 py-2 rounded transition-colors duration-150 flex items-center justify-center gap-1
            ${mediaType === 'movie' ? 'bg-red-950 text-zinc-300' : 'bg-zinc-500 text-zinc-950 hover:text-zinc-300 cursor-pointer'}`}
              >
                Movies
              </button>

              <button
                onClick={() => setMediaType('tv')}
                className={`flex-1 font-semibold tracking-wider text-sm px-1 py-1 rounded transition-colors duration-150 flex items-center justify-center gap-1
            ${mediaType === 'tv' ? 'bg-red-950 text-white' : 'bg-zinc-500 text-zinc-950 hover:text-zinc-300 cursor-pointer'}`}
              >
                TV-Shows
              </button>
            </div>

            {/* clears selected genres and filters */}
            <button
              onClick={handleClear}
              className='col-span-3 font-semibold tracking-wider  bg-red-950 text-sm text-zinc-300/90 px-4 cursor-pointer py-1 rounded hover:text-zinc-500 transition-colors duration-140'
            >
              Clear selection
            </button>
          </div>

          <div className='flex flex-col items-center space-y-1'>
            {/* Label above buttons */}
            <div className='relative group inline-block cursor-help z-50'>
              <span className='text-xs font-semibold text-zinc-400 uppercase select-none'>
                Match
              </span>
              <div className='absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-52 bg-zinc-900 text-zinc-300 text-xs p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200'>
                <p className='text-zinc-200 font-semibold'>
                  Choose how genres are matched:
                </p>
                <p>
                  "<span className='font-semibold text-red-900'>Any</span>"
                  means results can contain any of your selected filters;
                </p>
                <p>
                  "<span className='font-semibold text-red-900'>And</span>"
                  means results must contain all your selected filters.
                </p>
              </div>
            </div>

            {/* Matchtype selection */}
            <button
              onClick={() => setMatchType('any')}
              disabled={selectedGenres.length < 2}
              className={`px-2 py-1 transition-colors duration-120 font-medium text-sm rounded disabled:cursor-default disabled:bg-zinc-700 disabled:text-zinc-800 ${
                matchType === 'any'
                  ? 'bg-zinc-600 text-red-950'
                  : 'bg-zinc-700 text-zinc-800 cursor-pointer'
              }`}
            >
              Any
            </button>

            <button
              onClick={() => setMatchType('and')}
              disabled={selectedGenres.length < 2}
              className={`px-2 py-1 transition-colors duration-120 font-medium text-sm rounded disabled:cursor-default disabled:bg-zinc-700 disabled:text-zinc-800 ${
                matchType === 'and'
                  ? 'bg-zinc-600 text-red-950'
                  : 'bg-zinc-700 text-zinc-800 cursor-pointer'
              }`}
            >
              And
            </button>
          </div>
        </div>

        {/* Route to the page with the selected filters */}
        {selectedGenres.length > 0 ||
        selectedYears.length > 0 ||
        selectedCountries.length > 0 ? (
          <Link
            to={`/${mediaType}?${
              selectedGenres.length > 0
                ? `genres=${selectedGenres.join(',')}&`
                : ''
            }${
              selectedYears.length > 0
                ? `years=${selectedYears.join(',')}&`
                : ''
            }${
              selectedCountries && selectedCountries.length > 0
                ? `countries=${selectedCountries.map((c) => c.code).join(',')}&`
                : ''
            }match=${matchType}`}
            className='col-span-3'
          >
            <button
              onClick={() => setIsOpen(false)}
              className='col-span-3 bg-zinc-500 text-sm w-full text-zinc-950 px-4 cursor-pointer py-1 rounded hover:text-zinc-300 transition-colors duration-140'
            >
              Filter
            </button>
          </Link>
        ) : (
          <button
            disabled
            className='col-span-3 bg-zinc-700 text-sm w-full text-zinc-500 px-4 cursor-not-allowed py-1 rounded transition-colors duration-140'
          >
            Filter
          </button>
        )}

        {/* Displays selected genres if any are selected */}
        <DisplaySelectedGenres selectedGenres={selectedGenres} />
      </div>
    </div>
  );
}
