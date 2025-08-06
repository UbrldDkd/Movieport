import { useState, useRef , useEffect } from 'react';
import SelectButton from './SelectButton'
import { GenreMap } from  '../../GenreMap.js';
import DisplaySelectedGenres from './DisplaySelectedGenres.jsx';
import { Link } from 'react-router-dom';

export default function Filterbox() {
  const [selectedGenres, setSelectedGenres] = useState([]); // state to hold selected genres
  const [mediaType, setMediaType] = useState('movie'); // media type can be 'movie' or 'tv'
  const [isOpen, setIsOpen] = useState(false); // state for dropdown visibility
  const [matchType, setMatchType] = useState('or'); // 'or' or 'and' for genre matching
  
  // Validate mediaType to ensure it is either 'movie' or 'tv'
  const validMediaTypes = ['movie', 'tv'];
  if (!validMediaTypes.includes(mediaType)) {
    console.error(`Invalid media type: ${mediaType}. Defaulting to 'movie'.`);
    setMediaType('movie');
  }
  
  // Reference for the dropdown to handle clicks outside
  const dropdownRef = useRef(null);
  
  // takes in the GenreMap and converts it to an array of objects
  const genres = Object.entries(GenreMap);


  //general Filterbox button functions
  function toggleDropdown() {
    if(!isOpen) {
      setIsOpen(true);}
    setSelectedGenres([])
  }
  
  //handles clearing the selected genres
  function handleClear() {
    setSelectedGenres([])
  }
  
  //handles selecting a genre, adds it to the selected genres or removes it if already selected
  function handleSelectGenre(id) {
    setSelectedGenres(prev => {

      if( prev.includes(id)) {
        return prev.filter(g => g !== id);
      } else {
          return [...prev, id];
        }
      }
    );

  }
  
  //handles clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(e) {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
    }}

    
    document.addEventListener('mousedown', handleClickOutside);
  },[isOpen])


  return (
  <div className='col-span-3'>

    <button onClick={toggleDropdown} className='bg-red-950 text-zinc-200 px-4 cursor-pointer py-2 rounded ml-2 hover:text-zinc-400'>
      Select Genre
    </button>

    {isOpen && (
      <div 
      ref={dropdownRef}
      className='absolute top-full bg-zinc-900 rounded-md drop-shadow-black px-2 py-1.5 z-10 grid grid-cols-3 grid-rows-3 gap-2 max-w-[430px]'>
        
        {/* Maps through the genres and creates a SelectButton for each */}
        {genres.map(([id, name ]) => (

          <SelectButton
            key={id}
            item={name}
            id={id}
            selectedItems={selectedGenres}
            onSelect={handleSelectGenre}
          />
           
          ))}

            <div className='col-span-3 w-full flex space-x-1 py-2'>

            {/* selects movies as media type */}
            <div className='flex-1 flex flex-col justify-between'>

            <div className='flex space-x-1 mt-5'>
            
            <button
            onClick={() => setMediaType('movie')}
            className={`flex-1 text-sm px-1 py-2 rounded transition-colors duration-150
            ${mediaType === 'movie' ? 'bg-zinc-700 text-white' : 'bg-zinc-500 text-zinc-950 hover:text-zinc-300 cursor-pointer'}`}
            >
            Movies
            </button>

            <button
            onClick={() => setMediaType('tv')}
            className={`flex-1 text-sm px-1 py-1 rounded transition-colors duration-150
            ${mediaType === 'tv' ? 'bg-zinc-700 text-white' : 'bg-zinc-500 text-zinc-950 hover:text-zinc-300 cursor-pointer'}`}
            >
            TV Shows
            </button>

            </div>

                  {/* clears selected genres and filters */}
              <button
              onClick={handleClear}
              className='col-span-3 bg-red-950 text-sm text-zinc-300 px-4 cursor-pointer py-1 rounded hover:text-zinc-500 transition-colors duration-140'>
              Clear selection
              </button>
         

            </div>

            <div className="flex flex-col items-center space-y-1">
            {/* Label above buttons */}
            <div className="relative group inline-block cursor-help">

              <span className="text-xs font-semibold text-zinc-400 uppercase select-none">
                Match
              </span>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-52 bg-zinc-900 text-zinc-300 text-xs p-2 rounded shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                <p>Choose how genres are matched:</p> 
                <p>"<span className='font-semibold text-red-900'>Any</span>" means results can contain any of your selected genres;</p> 
                <p>"<span className='font-semibold text-red-900'>And</span>" means results must contain all your selected genres.</p>
              </div>
            </div>


            {/* Buttons stacked vertically with minimal padding */}
            <button
            onClick={() => setMatchType('or')}
            disabled={selectedGenres.length === 0}
            className={`px-2 py-1 font-medium text-sm rounded disabled:bg-zinc-700 disabled:text-zinc-800 ${
            matchType === 'or' ? 'bg-zinc-600 text-red-950' : 'bg-zinc-700 text-zinc-800 cursor-pointer'
            }`}
            >
            Any
            </button>

            <button
            onClick={() => setMatchType('and')}
            disabled={selectedGenres.length === 0}
            className={`px-2 py-1 font-medium text-sm rounded disabled:bg-zinc-700 disabled:text-zinc-800 ${
            matchType === 'and' ? 'bg-zinc-600 text-red-950' : 'bg-zinc-700 text-zinc-800 cursor-pointer'
            }`}
            >
            And
            </button>
            </div>

          </div>
        
        {/* Link to the filtered page with selected genres, media type and matchType */}
         <Link 
          to={selectedGenres.length > 0 
          ? `/${mediaType}?genres=${selectedGenres.join(',')}&matchType=${matchType}`
          : `/${mediaType}?matchType=${matchType}`}
          className='col-span-3'
          >

         <button
          onClick={() => setIsOpen(false)}
          className='col-span-3 bg-zinc-500 text-sm w-full text-zinc-950 px-4 cursor-pointer py-1 rounded hover:text-zinc-300 transition-colors duration-140'
          >
          Filter
          </button>
          </Link>
          


          

        {/* Displays selected genres if any are selected */}
        <DisplaySelectedGenres selectedGenres={selectedGenres} />

      </div>
    )}
     
  </div>
);
};