import { useState } from 'react';
import SelectButton from './SelectButton'

export default function Filterbox() {
  // temporay array for genres
  const genres = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Fantasy', 'Adventure', 'Documentary', 'Animation', 'Mystery', 'Crime', 'Western'];
  
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
        className="bg-red-950 text-zinc-200 px-4 py-2 rounded ml-2 hover:text-zinc-100">{selectedGenre? selectedGenre: 'select genre'}</button>
    )
  }

  function DisplaySelectedGenre({selectedGenre}) {
    return (
        <p className="col-span-3 pt-3 text-sm text-gray-600">
            Selected Genre: {selectedGenre || 'None'}
          </p>
    )
  }

  

  return (
  <div className="col-span-3">
    <GenreFilterButton selectedGenre={selectedGenre} onClick={toggleDropdown} />

    {isOpen && (
      <div className="absolute top-full bg-zinc-900 rounded-md drop-shadow-black px-2 py-1.5 z-10 grid grid-cols-3 grid-rows-3 gap-2  w-auto">
        
        {/*later needs to be opened via hovering and positioned better */}
      
        {genres.map((genre) => (
          <SelectButton
            key={genre}
            item={genre}
            selectedItem={selectedGenre}
            onSelect={handleSelectGenre}
          />
        ))}

        <DisplaySelectedGenre selectedGenre={selectedGenre} />
      </div>
    )}
  </div>
);
}