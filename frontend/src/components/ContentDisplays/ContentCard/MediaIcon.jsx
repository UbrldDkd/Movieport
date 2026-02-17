// React
import { useState } from 'react';

// Icons
import { FaFilm } from 'react-icons/fa6';
import { FiTv } from 'react-icons/fi';

// Utils ui
import { Tooltip } from '../../Common/Tooltip';

export default function MediaIcon({ mediaType, className }) {
  const label = mediaType === 'movie' ? 'Film' : 'Tv-show';
  console.log(label);
  return (
    <div className='inline-block relative'>
      <Tooltip
        label={label}
        position={`${className ? className : '-top-7 -left-3.5'}`}
      >
        {/* Icon */}
        {mediaType === 'movie' ? (
          <FaFilm className='text-zinc-400' />
        ) : (
          <FiTv className='text-zinc-400' />
        )}
      </Tooltip>
    </div>
  );
}
