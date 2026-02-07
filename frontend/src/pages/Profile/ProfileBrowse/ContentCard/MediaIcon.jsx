import { useState } from 'react';
import { FaFilm } from 'react-icons/fa6';
import { FiTv } from 'react-icons/fi';

export default function MediaIcon({ mediaType }) {
  const [hover, setHover] = useState(false);
  const label = mediaType === 'movie' ? 'Film' : 'Tv-show';

  return (
    <div
      className='inline-block relative'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Icon */}
      {mediaType === 'movie' ? (
        <FaFilm className='text-zinc-400' />
      ) : (
        <FiTv className='text-zinc-400' />
      )}

      {/* Tooltip */}
      <div
        className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-zinc-300/90 text-xs bg-zinc-700 whitespace-nowrap transition-opacity duration-200 pointer-events-none ${
          hover ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
        {/* Triangle */}
        <div className='absolute top-full left-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-700 -translate-x-1/2' />
      </div>
    </div>
  );
}
