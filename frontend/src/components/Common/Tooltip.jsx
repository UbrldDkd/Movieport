import PropTypes from 'prop-types';

export function Tooltip({
  label,
  children,
  position = 'bottom-full left-1/2 -translate-x-1/2',
}) {
  return (
    <span className='relative inline-block group'>
      {children}

      <span
        className={`absolute ${position}
          bg-zinc-700 font-semibold tracking-wider backdrop-blur-3xl
          text-zinc-300 text-xs px-2 py-1 rounded shadow-md
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none z-1000 whitespace-nowrap`}
      >
        {label}
        <span
          className='absolute top-full left-1/2 w-0 h-0
                         border-l-4 border-r-4 border-t-4
                         border-l-transparent border-r-transparent border-t-zinc-700
                         -translate-x-1/2'
        />
      </span>
    </span>
  );
}

Tooltip.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.string,
};
