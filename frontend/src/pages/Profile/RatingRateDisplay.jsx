// React
import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function RatingRateDisplay() {
  // Static local data: rating (0.5 → 5), count
  const ratings = [
    { rating: 0.5, count: 2 },
    { rating: 1, count: 4 },
    { rating: 1.5, count: 6 },
    { rating: 2, count: 10 },
    { rating: 2.5, count: 8 },
    { rating: 3, count: 12 },
    { rating: 3.5, count: 18 },
    { rating: 4, count: 25 },
    { rating: 4.5, count: 30 },
    { rating: 5, count: 40 },
  ];

  const totalCount = ratings.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* Horizontal line container */}
      <div className='relative w-full h-6 bg-zinc-700 rounded flex overflow-hidden'>
        {ratings.map((r) => {
          const percentage = (r.count / totalCount) * 100;

          return (
            <RatingSlice
              key={r.rating}
              rating={r.rating}
              percentage={percentage}
            />
          );
        })}
      </div>
    </div>
  );
}

// Single slice component
function RatingSlice({ rating, percentage }) {
  const [hover, setHover] = useState(false);

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div
      className='relative h-full transition-all duration-500 cursor-pointer'
      style={{ width: `${percentage}%`, backgroundColor: '#7f1d1d' }} // red-950
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Tooltip above slice */}
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-2 flex items-center gap-1 bg-zinc-900 text-yellow-400 text-sm px-2 py-1 rounded-lg shadow-lg transition-all duration-300 opacity-0 ${
          hover ? 'opacity-100' : ''
        }`}
      >
        {[...Array(fullStars)].map((_, i) => (
          <AiFillStar key={i} />
        ))}
        {halfStar && <AiOutlineStar />}
      </div>
      {/* Triangle pointing down */}
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 -mb-1 w-0 h-0 border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-zinc-900 transition-all duration-300 ${
          hover ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
