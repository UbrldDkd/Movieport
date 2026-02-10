import { AnimatePresence, motion } from 'framer-motion';
import ContentCard from '../../../../../components/ContentDisplays/ContentCard/ContentCard';
import ContentCardListView from '../../../../../components/ContentDisplays/ContentCard/ContentCardListView';
import {
  itemVariants,
  containerVariants,
} from '../../../../../utils/animations/motionVariants';

export default function ListItemsDisplay({ items, view }) {
  if (!items) return null;

  // Show message if there are no items
  if (items.length === 0) {
    return (
      <div className='text-zinc-400 text-center font-semibold text-sm tracking-wider py-6'>
        No items in this list yet
      </div>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={view}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={`grid gap-2.5 ${
          view === 'list' ? 'grid-cols-1' : 'grid-cols-auto-fill'
        }`}
        style={{
          gridTemplateColumns:
            view === 'list' ? '1fr' : 'repeat(auto-fill, minmax(140px, 1fr))',
        }}
      >
        {items.map((item, i) => (
          <motion.div key={item.tmdb_id || i} variants={itemVariants}>
            {view === 'list' ? (
              <ContentCardListView item={item} />
            ) : (
              <ContentCard item={item} view='lg' />
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
