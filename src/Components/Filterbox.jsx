import { useState } from 'react';

export default function Filterbox() {
  const genres = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Fantasy'];
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleSelectGenre(genre) {
    setSelectedGenre(genre);
    setIsOpen(false);
    console.log(genre)
  }


  function GenreFilterButton({selectedGenre, onClick}) {
    return (
      <button
        onClick={onClick}
        className="bg-gray-800 text-white px-4 py-2 rounded inline-block ml-2 hover:bg-gray-900 hover:text-white">{selectedGenre?'select genre': selectedGenre}</button>
    )
  }

  function DisplaySelectedGenre({selectedGenre}) {
    return (
        <p className="col-span-3 pt-3 text-sm text-gray-600">
            Selected Genre: {selectedGenre || 'None'}
          </p>
    )
  }

  function GenreButton({genre, selectedGenre, onSelect}) {
    return (
      <button
      key={genre}
      onClick={() => onSelect(genre)}
      className={`p-1.5 rounded  ${
                selectedGenre === genre
                  ? 'bg-red-800 text-white hover:bg-white hover:text-red-800'
                  : 'bg-gray-400 text-black hover:text-gray-400 hover:bg-black'
              }`}

      >
      {genre}
      </button>
    )
  }

  return (
    <div className="relative flex-row col-start-2 ">
      <GenreFilterButton selectedGenre={selectedGenre} onClick={toggleDropdown} />

      {isOpen && (
        <div className="absolute mt-4 grid grid-cols-2 gap-4 p-4 bg-gray-500 rounded-lg shadow-lg z-10 min-w-[320px]">
          <div>
            
          </div>
          

          {genres.map((genre) => (
           <GenreButton
              key={genre}
              genre={genre}
              selectedGenre={selectedGenre}
              onSelect={handleSelectGenre}/>
          
          ))}
          
         <DisplaySelectedGenre selectedGenre={selectedGenre} />
        </div>
      )}
    </div>
  );
}
