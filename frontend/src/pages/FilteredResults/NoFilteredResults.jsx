import { motion } from 'framer-motion';

export default function NoFilteredResults({ filters }) {
  const activeFilters = [];

  if (filters.genre?.length) {
    activeFilters.push('genre');
  }

  if (filters.year?.length) {
    activeFilters.push('year');
  }

  if (filters.country?.length) {
    activeFilters.push('country');
  }

  if (filters.decade) {
    activeFilters.push('decade');
  }

  if (filters.service) {
    activeFilters.push('service');
  }

  return (
    <motion.div
      key='no-filter-results'
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='min-h-100 w-full flex flex-col items-center justify-center gap-4'
    >
      <i
        className='ti ti-filter-off text-zinc-600'
        style={{ fontSize: 32 }}
        aria-hidden
      />

      <div className='flex flex-col items-center gap-1.5 text-center'>
        <p className='text-sm font-medium text-zinc-400 tracking-widest'>
          No{' '}
          <span className='text-text-primary'>
            {activeFilters.length ? activeFilters.join(', ') : 'content'}
          </span>{' '}
          results found
        </p>

        <p className='text-xs tracking-wider text-zinc-600 font-semibold'>
          Try adjusting your filters — nothing matched this combination.
        </p>
      </div>
    </motion.div>
  );
}
