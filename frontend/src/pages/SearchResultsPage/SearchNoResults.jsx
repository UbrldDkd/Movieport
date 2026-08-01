import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SearchNoResults({ type, value }) {
  const navigate = useNavigate();

  const contentType =
    type === 'film'
      ? 'films'
      : type === 'tv'
        ? 'TV shows'
        : type === 'both'
          ? 'films or TV shows'
          : type === 'users'
            ? 'users'
            : 'lists';

  return (
    <motion.div
      key={`no-results-${type}-${value}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='min-h-100 w-full flex flex-col items-center justify-center gap-4'
    >
      <i
        className='ti ti-search-off text-zinc-600'
        style={{ fontSize: 32 }}
        aria-hidden
      />

      <div className='flex flex-col items-center gap-1.5 text-center'>
        <p className='text-sm font-medium text-zinc-400 tracking-widest'>
          No <span className='text-text-primary'>{contentType}</span> found with
          the search term <span className='text-text-primary'>"{value}"</span>
        </p>
        <p className='text-xs tracking-wider text-zinc-600 font-semibold'>
          Try a different keyword — this search washed up empty.
        </p>
      </div>
    </motion.div>
  );
}
