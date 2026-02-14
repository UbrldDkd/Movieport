import { AnimatePresence, motion } from 'framer-motion';
import ContentCard from '../../../../../../components/ContentDisplays/ContentCard/ContentCard';
import ContentCardListView from '../../../../../../components/ContentDisplays/ContentCard/ContentCardListView';
import {
  itemVariants,
  containerVariants,
} from '../../../../../../utils/style/animations/motionVariants';

export default function EditListItems({ items, view, handleRemoveItem }) {
  if (!items?.length) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial={false} // ← prevents existing items from re-animating and being transparent
        animate='visible'
        exit='exit'
        className={
          view === 'grid'
            ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 justify-items-center'
            : 'flex flex-col gap-2'
        }
      >
        {items.map((item, i) => (
          <motion.div key={item.tmdb_id || i} variants={itemVariants}>
            {view === 'grid' ? (
              <ContentCard item={item} view='lg' />
            ) : (
              <ContentCardListView item={item} onRemove={handleRemoveItem} />
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
