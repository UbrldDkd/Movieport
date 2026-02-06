import { AnimatePresence, motion } from 'framer-motion';
import ContentCard from '../../../ContentCard/ContentCard';
import ContentCardListview from '../../../ContentCard/ContentCardListView';

export default function EditListItems({ newList, view, handleRemoveItem }) {
  if (!newList?.items?.length) return null;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={view}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className={
          view === 'grid'
            ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 justify-items-center'
            : 'flex flex-col gap-2'
        }
      >
        {newList.items.map((item, i) => (
          <motion.div key={item.tmdb_id || i} variants={itemVariants}>
            {view === 'grid' ? (
              <ContentCard item={item} view='lg' />
            ) : (
              <ContentCardListview item={item} onRemove={handleRemoveItem} />
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
