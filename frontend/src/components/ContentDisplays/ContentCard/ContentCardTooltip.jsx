// React
import React, { useContext, useState } from 'react';

// Icons
import { IoIosStar } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

// API hooks
import { useToggleContentRelation } from '../../../api/contentRelations/useToggleContentRelation';

// Context
import { ListsModalContext } from '../../../api/lists/Modal/Context/ListsModalContext';

export default function ContentCardTooltip({ item, current, onClose }) {
  const { openModal } = useContext(ListsModalContext);
  const toggleField = useToggleContentRelation();
  console.log('Current relations:', current); // Debug log to check current relations

  const [rating, setRating] = useState(current?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const activeRating = hoverRating || rating;

  const handleClick = (field) => {
    toggleField(item, field);
    onClose();
  };

  const handleRate = (value) => {
    setRating(value);
    // backend logic can be added later
  };

  const handleClear = () => handleRate(0);

  return (
    <div className='absolute top-0 left-full ml-2 w-36 bg-zinc-800/70 backdrop-blur-3xl shadow-lg rounded-md p-1.5 flex flex-col gap-2 z-20'>
      {/* Tooltip arrow */}
      <div className='absolute -left-2  w-0 h-0 border-t-6 border-b-6 border-r-6 border-t-transparent border-b-transparent border-r-zinc-800'></div>

      {/* Clear button */}

      <button
        onClick={handleClear}
        className={`absolute py-1.5 z-20  left-0 hover:cursor-pointer bg-zinc-900  top-6.5 -translate-y-1/2  text-zinc-500 hover:text-zinc-400 hover:bg-zinc-700/50 rounded-sm transition-all duration-150 flex items-center justify-center
          ${rating > 0 ? 'opacity-100' : 'opacity-0'}`}
      >
        <IoClose className='text-lg' />
      </button>

      {/* Star Rating */}
      <div className='flex justify-center my-2  relative'>
        {[1, 2, 3, 4, 5].map((i) => {
          const half = i - 0.5;
          return (
            <div key={i} className='relative w-5.5 h-5.5 cursor-pointer'>
              {/* Left half */}
              <div
                className='absolute left-0 top-0 w-1/2 h-full z-10'
                onMouseEnter={() => setHoverRating(half)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(half)}
              />
              {/* Right half */}
              <div
                className='absolute right-0 top-0 w-1/2 h-full z-10'
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(i)}
              />
              {/* Star display */}
              {activeRating >= i ? (
                <IoIosStar className='w-5.5 h-5.5 text-red-900 transition-colors duration-150' />
              ) : activeRating >= half ? (
                <>
                  <IoIosStar className='w-5.5 h-5.5 text-zinc-600 absolute' />
                  <div className='absolute inset-0 overflow-hidden w-1/2'>
                    <IoIosStar className='w-5.5 h-5.5 text-red-900' />
                  </div>
                </>
              ) : (
                <IoIosStar className='w-5.5 h-5.5 text-zinc-600 hover:text-red-900 transition-colors duration-150' />
              )}
            </div>
          );
        })}
      </div>

      {/* Watchlist button */}
      <button
        onClick={() => handleClick('watchlisted')}
        className='w-full hover:cursor-pointer py-1.5 rounded bg-zinc-900 hover:bg-zinc-600 hover:text-zinc-100 text-xs tracking-wider font-semibold text-zinc-300'
      >
        {current?.watchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>

      {/* Add to List button */}
      <button
        onClick={() => openModal({ item })}
        className='w-full py-1.5 hover:cursor-pointer rounded bg-zinc-900 hover:bg-zinc-600 hover:text-zinc-100 text-xs tracking-wider font-semibold text-zinc-300'
      >
        Add to List
      </button>
      <button
        onClick={() => openModal({ item })}
        className='w-full py-1.5 rounded hover:cursor-pointer bg-zinc-900 hover:bg-zinc-600 hover:text-zinc-100 text-xs tracking-wider font-semibold text-zinc-300'
      >
        Review
      </button>
    </div>
  );
}
