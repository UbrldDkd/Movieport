import { useEffect, useState, useRef } from 'react';

const PRONOUNS = ['He/Him', 'She/Her', 'They/Them'];

export default function PronounsSelectionDropdown({ username }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(PRONOUNS[2]);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className='flex flex-col ' ref={ref}>
      <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-2 md:mt-5'>
        Pronouns
      </label>

      <div className='relative '>
        <div className='flex gap-1'>
          <button
            type='button'
            onClick={() => setOpen((o) => !o)}
            className='w-full max-w-30 text-sm font-semibold tracking-wider  gap-1 bg-zinc-800 border-2 border-zinc-700 text-zinc-300 px-2 sm:py-0.5 md:py-1 rounded-xs focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200 flex items-center justify-between'
          >
            <span className={selected ? 'text-zinc-300' : 'text-zinc-500'}>
              {selected ?? 'Select pronouns'}
            </span>
            <svg
              className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              viewBox='0 0 12 12'
              fill='none'
            >
              <path
                d='M2 4l4 4 4-4'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <div className='text-xs gap-1 flex font-semibold tracking-wider text-zinc-400'>
            <span>Example: </span>
            <div>
              <span className='text-zinc-300'>{username}</span> added{' '}
              <span className='text-zinc-300'>Trainspotting</span> to{' '}
              {selected === PRONOUNS[0]
                ? 'his'
                : selected === PRONOUNS[1]
                  ? 'her'
                  : 'their'}{' '}
              <span className='text-zinc-300 underline underline-offset-2'>
                watchlist
              </span>
            </div>
          </div>
        </div>

        {open && (
          <div className='absolute max-w-30 top-full left-0 right-0 mt-1 bg-zinc-800 border-2 border-zinc-700 rounded-xs z-50 overflow-hidden'>
            {PRONOUNS.map((pronoun) => (
              <button
                key={pronoun}
                type='button'
                onClick={() => {
                  setSelected(pronoun);
                  setOpen(false);
                }}
                className={`w-full font-semibold tracking-wider text-left px-2 py-1.5 text-sm transition-colors duration-150 cursor-pointer
                  ${
                    selected === pronoun
                      ? 'bg-red-950 text-zinc-100'
                      : 'text-zinc-300 hover:bg-zinc-700'
                  }`}
              >
                {pronoun}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
