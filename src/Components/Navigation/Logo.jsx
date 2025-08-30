import { useState } from 'react';

export default function Logo() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative text-2xl font-bold flex items-center h-10">
      
      {/* GIF overlay */}
      <img
        src="/assets/siab.gif"
        alt="Logo GIF"
        className={`absolute w-50 h-30 transition-opacity duration-500 pb-5 pointer-events-none
          ${hovered ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Logo text */}
      <h1
        className={`relative z-10 cursor-pointer transition-colors duration-300
          ${hovered ? 'opacity-0' : 'text-zinc-100'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Movieport
      </h1>
    </div>
  );
}
