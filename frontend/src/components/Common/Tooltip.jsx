import PropTypes from 'prop-types';

export function Tooltip({ label, children, icon }) {
  return (
    <div className='relative inline-flex items-center group'>
      {children}

      <div
        className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2
        px-2 py-1 rounded bg-zinc-800/90 text-zinc-300/90 text-xs font-semibold
        whitespace-nowrap opacity-0 group-hover:opacity-100
        transition-opacity pointer-events-none z-10'
      >
        <div className='flex '>
          {icon}
          {label}
        </div>
        <div
          className='absolute top-full left-1/2 -translate-x-1/2
          border-4 border-transparent border-t-zinc-800/90'
        />
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
