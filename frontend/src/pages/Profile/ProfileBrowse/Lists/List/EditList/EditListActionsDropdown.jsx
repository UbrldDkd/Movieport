import { useState } from 'react';
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import { Keys } from '../../../../../../utils/Keys';

export default function EditListActionsDropdown({
  searchVal,
  setSearchVal,
  previewContent,
  handleAddItem,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { details } = Keys.API1;

  // Build item object with only the fields needed for the backend
  const buildItem = (tmdb) => ({
    tmdb_id: tmdb[details.id],
    title: tmdb[details.movieTitle] || tmdb[details.tvTitle] || '',
    poster_path: tmdb[details.poster] || '',
    release_date:
      tmdb[details.movieReleaseDate] || tmdb[details.tvReleaseDate] || null,
    media_type: tmdb[details.movieTitle] ? 'movie' : 'tv',
  });

  const addItemAndReset = (tmdb) => {
    const item = buildItem(tmdb);
    handleAddItem(item);
    setSearchVal('');
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!previewContent?.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < previewContent.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const tmdb = previewContent[selectedIndex >= 0 ? selectedIndex : 0];
      addItemAndReset(tmdb);
    }
  };

  const hasResults = isFocused && searchVal && previewContent?.length > 0;

  return (
    <div className='ml-auto relative flex flex-1 max-w-xs items-stretch gap-1'>
      <div className='flex items-center pointer-events-none gap-1.5 font-mono tracking-wide px-2 bg-zinc-600 rounded-sm whitespace-nowrap h-9 flex-shrink-0'>
        ADD A TITLE
        <PiMagnifyingGlassFill />
      </div>

      <input
        placeholder='Search for a title...'
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        onKeyDown={handleKeyDown}
        className='h-9 bg-zinc-800 border-2 border-zinc-700/90 px-2 text-[14px] font-semibold tracking-wider rounded-xs focus:outline-none focus:bg-zinc-600 transition-colors duration-100 flex-1 min-w-0'
      />

      <div
        className={`absolute top-full left-0 mt-1 w-full z-50 bg-zinc-900/80 border border-zinc-700 rounded-sm max-h-64 overflow-y-auto shadow-lg scrollbar-hide transition-opacity duration-100 ${
          hasResults ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {previewContent?.map((tmdb, idx) => (
          <button
            key={tmdb[details.id]}
            onMouseDown={() => addItemAndReset(tmdb)}
            className={`w-full text-left text-sm font-semibold px-2 py-1 transition-colors duration-100 ${
              idx === selectedIndex
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            <span>{tmdb[details.movieTitle] || tmdb[details.tvTitle]}</span>
            <span className='text-zinc-400'>
              {' '}
              {tmdb[details.movieReleaseDate]?.slice(0, 4) ||
                tmdb[details.tvReleaseDate]?.slice(0, 4)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
