import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { posterSizes } from '../../../utils/constants/posterSizes';
import {
  imageFadeInVariants,
  skeletonPulseVariants,
} from '../../../utils/style/animations/motionVariants.js';

export default function ContentCardPoster({ title, posterPath, view }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const { width, tmdb } = posterSizes[view] || posterSizes.sm;
  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/${tmdb}${posterPath}`
    : null;

  useEffect(() => {
    setLoaded(false);
    setErrored(false);

    if (!posterUrl) return;

    const img = new Image();
    img.src = posterUrl;
    img.onload = () => setLoaded(true);
    img.onerror = () => setErrored(true);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [posterUrl]);

  const showFallback = !posterUrl || errored;

  return (
    // bg-zinc-800 is always visible — acts as the natural skeleton background
    <div
      className={`relative ${width} aspect-[2/3] rounded-sm overflow-hidden shadow-md border-2 border-zinc-800 outline outline-transparent hover:outline-2 hover:outline-zinc-800 transition-all duration-150`}
    >
      {showFallback ? (
        <div className='w-full h-full bg-zinc-800 font-semibold flex items-center justify-center text-zinc-500 text-[10px] text-center px-1'>
          {title}
        </div>
      ) : !loaded ? (
        <motion.div
          variants={skeletonPulseVariants}
          initial='loading'
          animate='loading'
          className='w-full h-full bg-zinc-800'
        />
      ) : (
        <motion.img
          src={posterUrl}
          alt={title}
          loading='lazy'
          decoding='async'
          draggable={false}
          variants={imageFadeInVariants}
          initial='hidden'
          animate='visible'
          className='absolute inset-0 w-full h-full object-cover will-change-transform transform-gpu'
        />
      )}
    </div>
  );
}
