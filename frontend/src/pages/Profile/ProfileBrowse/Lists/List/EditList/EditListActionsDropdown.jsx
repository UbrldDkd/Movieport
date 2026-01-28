import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleKeyDown = (e) => {
    if (!previewContent?.length) return;

    if (e.key === 'ArrowDown') {
      setSelectedIndex((prev) =>
        prev + 1 < previewContent.length ? prev + 1 : prev
      );
      e.preventDefault();
    }

    if (e.key === 'ArrowUp') {
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : -1));
      e.preventDefault();
    }

    if (e.key === 'Enter') {
      const item =
        selectedIndex >= 0 ? previewContent[selectedIndex] : previewContent[0];
      handleAddItem(item);
      setSearchVal('');
      setSelectedIndex(-1);
      e.preventDefault();
    }
  };

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
          isFocused && searchVal && previewContent?.length > 0
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {previewContent.map((item, idx) => (
          <button
            key={item[details.id]}
            onMouseDown={() => {
              handleAddItem(item);
              setSearchVal('');
              setSelectedIndex(-1);
            }}
            className={`w-full text-left text-sm font-semibold px-2 py-1 transition-colors duration-100 ${
              idx === selectedIndex
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            <span>{item[details.title] || item[details.titleTv]}</span>
            <span className='text-zinc-400'>
              {' '}
              {item[details.releaseDate]?.slice(0, 4)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
