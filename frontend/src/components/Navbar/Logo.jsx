import { useState } from 'react';

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className='relative text-2xl font-bold flex items-center '
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* GIF overlay - positioned and sized reliably with Tailwind */}
      <img
        src='/assets/siab.gif'
        alt='Logo GIF'
        className={`absolute left-1/2 top-1/5 transform -translate-x-1/2 -translate-y-1/2
          w-120 h-100 object-contain transition-opacity duration-300 pointer-events-none z-20
          ${hovered ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Logo text */}
      <h1
        className={`relative z-10 cursor-pointer duration-300 text-zinc-100 transition-all
          ${hovered ? 'opacity-0' : 'opacity-100'}`}
      >
        Movieport
      </h1>
    </div>
  );
}
