import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';

export default function ContentPageActionsRating({
  initialRating = 0,
  onRatingChange,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [showClear, setShowClear] = useState(false);

  const activeRating = hoverRating || rating;

  const handleRate = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleClearRating = () => {
    setRating(0);
    setHoverRating(0);
    setShowClear(false);
    if (onRatingChange) {
      onRatingChange(0);
    }
  };

  return (
    <div className='py-2 px-3 bg-zinc-800/90'>
      <div className='text-center text-xs text-zinc-400 mb-2 font-medium'>
        {activeRating ? `${activeRating}/5` : 'Rate this'}
      </div>

      <div
        className='relative flex justify-center items-center py-1 px-2'
        onMouseEnter={() => setShowClear(true)}
        onMouseLeave={() => {
          setShowClear(false);
          setHoverRating(0);
        }}
      >
        {/* CLEAR BUTTON - absolutely positioned */}
        <button
          onClick={handleClearRating}
          className={`absolute -left-2.5 top-1/2 -translate-y-1/2 py-2 flex items-center justify-center rounded-xs text-zinc-500 hover:text-zinc-400 hover:bg-zinc-700/50 transition-all duration-120 cursor-pointer ${
            showClear && rating > 0
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none scale-90'
          }`}
        >
          <IoClose className='text-lg' />
        </button>

        {/* STARS */}
        <div className='flex items-center gap-0.5 cursor-pointer'>
          {[1, 2, 3, 4, 5].map((i) => {
            const half = i - 0.5;
            const full = i;

            return (
              <div key={i} className='relative w-8 h-8 cursor-pointer'>
                <button
                  className='absolute left-0 top-0 w-1/2 h-full z-10 hover:scale-105 transition-transform duration-150 cursor-pointer'
                  onMouseEnter={() => setHoverRating(half)}
                  onClick={() => handleRate(half)}
                />
                <button
                  className='absolute right-0 top-0 w-1/2 h-full z-10 hover:scale-105 transition-transform duration-150 cursor-pointer'
                  onMouseEnter={() => setHoverRating(full)}
                  onClick={() => handleRate(full)}
                />

                {activeRating >= full ? (
                  <IoIosStar className='w-8 h-8 text-red-900 transition-colors duration-200 hover:text-red-800' />
                ) : activeRating >= half ? (
                  <>
                    <IoIosStar className='w-8 h-8 text-zinc-600 absolute transition-colors duration-200' />
                    <div className='absolute inset-0 overflow-hidden w-1/2'>
                      <IoIosStar className='w-8 h-8 text-red-900 transition-colors duration-200' />
                    </div>
                  </>
                ) : (
                  <IoIosStar className='w-8 h-8 text-zinc-600 transition-colors duration-200 hover:text-zinc-400' />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
