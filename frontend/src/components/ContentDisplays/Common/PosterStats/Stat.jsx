// React
import { useState } from 'react';

// Utils helpers
import { formatNumber } from '../../../../utils/helpers/formatNumber';

export default function Stat({ icon: Icon, value, label }) {
  const [hover, setHover] = useState(false);

  if (!value) return null;

  return (
    <div
      className='relative flex flex-col sm:flex-row items-center sm:gap-1 text-xs font-semibold text-zinc-400 hover:text-zinc-300 transition cursor-default'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon className='w-3 h-3 sm:w-4 sm:h-4 ' />
      <span>{formatNumber(value)}</span>

      {/* Custom tooltip */}
      <div
        className={`absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-zinc-300/90 text-[10px] sm:text-xs bg-zinc-800/90 backdrop-blur-3xl whitespace-nowrap transition-opacity duration-200 z-50 pointer-events-none tracking-wider ${
          hover ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </div>
    </div>
  );
}
