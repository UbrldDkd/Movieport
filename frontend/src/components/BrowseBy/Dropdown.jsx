import { useState, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

export default function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const hoverTimer = useRef(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setOpen(true);
    }, 350); // delay in ms
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer.current);
    setOpen(false);
  };

  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`
          flex
          items-center
          gap-1
          text-xs
          font-semibold
          tracking-widest
          py-1
          px-2
          border-x-1
          border-y-2
          transition-colors
          ${
            open
              ? 'bg-zinc-500 text-zinc-200 border-zinc-800 border-b-zinc-500'
              : 'text-zinc-300/80 bg-zinc-950 border-zinc-800  hover:text-zinc-200 '
          }
        `}
      >
        {label}

        <MdOutlineKeyboardArrowDown
          className={`text-xl transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className='
            absolute
            top-full
            left-0
            z-40
            min-w-29
            font-semibold
            overflow-y-auto
            bg-zinc-500
            border-t-zinc-500
            border
            border-zinc-800
            rounded-b-sm
            shadow-xl
            scrollbar-hide
          '
        >
          {children}
        </div>
      )}
    </div>
  );
}
