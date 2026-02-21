import { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { posterSizes } from '../../../../../../../utils/constants/posterSizes';

export default function Filled({ item, onRemove, status }) {
  const [loaded, setLoaded] = useState(false);
  const { tmdb } = posterSizes.favouritesSection;

  return (
    <div
      className={`w-full h-full transition-transform duration-150 ease-out  will-change-transform ${status?.isDragging || status?.isDragOver ? 'opacity-100' : ' hover:scale-105'}`}
    >
      <div className='group relative w-full aspect-[2/3] rounded-sm overflow-hidden bg-zinc-800 shadow-md border-2 border-zinc-800  transition-all duration-150'>
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
        <div className='absolute inset-0 bg-black/0 rounded-sm transition-all duration-200' />
        <button
          onClick={onRemove}
          className={`absolute backdrop-blur-3xl top-0 hover:text-zinc-200 text-text-primary z-10 w-6 h-6 flex items-start justify-start p-0.5 bg-black/70 hover:bg-red-950 text-sm rounded-br-full transition-all duration-200 ${status?.isDragging || status?.isDragOver ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
        >
          <MdOutlineClose />
        </button>
      </div>
    </div>
  );
}
