export default function NavButton({ label, icon }) {
  const getIcon = () => {
    switch (label) {
      case 'Home':
        return (
          <svg
            className='w-4 h-4 md:w-5 md:h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
          </svg>
        );
      case 'Movies':
        return (
          <svg
            className='w-4 h-4 md:w-5 md:h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M2 3a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm4 0h8v14H6V3z' />
            <path d='M2 8h4v4H2V8zm12 0h4v4h-4V8z' />
          </svg>
        );
      case 'TV Shows':
        return (
          <svg
            className='w-4 h-4 md:w-5 md:h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z'
              clipRule='evenodd'
            />
            <path d='M9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' />
          </svg>
        );
      default:
        return icon || null;
    }
  };

  return (
    <div>
      <button className=' select-none cursor-pointer text-zinc-200 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded md:ml-2 hover:text-zinc-400 transition-colors duration-300 flex items-center gap-1.5 md:gap-2'>
        <span className='md:hidden'>{getIcon()}</span>
        {label}
      </button>
    </div>
  );
}
