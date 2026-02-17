import { AnimatePresence, motion } from 'framer-motion';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';
import ContentCardListView from '../../components/ContentDisplays/ContentCard/ContentCardListView';
import {
  itemVariants,
  containerVariants,
} from '../../utils/style/animations/motionVariants';

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
      {view === 'grid' ? (
        <motion.div
          key='grid'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <ContentDisplayBlock content={items} view='lg' justify='start' />
        </motion.div>
      ) : (
        <motion.div
          key='list'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='flex flex-col gap-2.5'
        >
          {items.map((item, i) => (
            <motion.div key={item.tmdb_id || i} variants={itemVariants}>
              <ContentCardListView item={item} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
