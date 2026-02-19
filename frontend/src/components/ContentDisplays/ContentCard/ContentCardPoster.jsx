import { useState } from 'react';
import { motion } from 'framer-motion';
import { posterSizes } from '../../../utils/constants/posterSizes';
import { revealVariants } from '../../../utils/style/animations/motionVariants.js';

export default function ContentCardPoster({ title, posterPath, view }) {
  const [loaded, setLoaded] = useState(false);

  const { width, tmdb } = posterSizes[view] || posterSizes.sm;
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/${tmdb}${posterPath}`
    : null;

  return (
    // bg-zinc-800 is always visible — acts as the natural skeleton background
    <div
      className={`relative ${width} aspect-[2/3] rounded-sm overflow-hidden bg-zinc-800 shadow-md border-2 border-zinc-800 outline outline-transparent hover:outline-2 hover:outline-zinc-800 transition-all duration-150`}
    >
      {posterUrl ? (
        <motion.img
          src={posterUrl}
          alt={title}
          onLoad={() => setLoaded(true)}
          draggable={false}
          key={loaded ? 'loaded' : 'unloaded'}
          variants={revealVariants}
          initial='hidden'
          animate='visible'
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className='absolute inset-0 w-full h-full object-cover will-change-transform transform-gpu'
        />
      ) : (
        <div className='w-full h-full flex items-center justify-center text-zinc-500 text-[10px] text-center px-1'>
          {title}
        </div>
      )}
    </div>
  );
}
