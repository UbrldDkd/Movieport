import { useState } from 'react';
import { posterSizes } from '../../../../../../../utils/constants/posterSizes';

export default function Filled({ item, onRemove }) {
  const [loaded, setLoaded] = useState(false);
  const { tmdb } = posterSizes.md;

  return (
    <div className='group relative w-full aspect-[2/3] rounded-sm overflow-hidden bg-zinc-800 shadow-md border-2 border-zinc-800 outline outline-transparent hover:outline-2 hover:outline-zinc-800 transition-all duration-150'>
      {!loaded && (
        <div className='absolute inset-0 bg-zinc-700 animate-pulse-slow' />
      )}
      <img
        src={`https://image.tmdb.org/t/p/${tmdb}${item.poster_path}`}
        alt='poster'
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 will-change-transform transform-gpu backface-hidden ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-sm transition-all duration-200' />
      <button
        onClick={onRemove}
        className='absolute top-1.5 left-1.5 z-10 w-5 h-5 flex items-center justify-center bg-black/70 hover:bg-red-950 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200'
      >
        ✕
      </button>
    </div>
  );
}
