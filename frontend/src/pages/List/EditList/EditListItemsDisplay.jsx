import { AnimatePresence, motion } from 'framer-motion';
import ContentCard from '../../../components/ContentDisplays/ContentCard/ContentCard';
import ContentCardListView from '../../../components/ContentDisplays/ContentCard/ContentCardListView';
import {
  itemVariants,
  containerVariants,
} from '../../../utils/style/animations/motionVariants';
import ContentDisplayBlock from '../../../components/ContentDisplays/ContentDisplayBlock';

export default function EditListItems({ items, view, handleRemoveItem }) {
  if (!items?.length) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial={false} // ← prevents existing items from re-animating and being transparent
        animate='visible'
        exit='exit'
      >
        {view === 'grid' ? (
          <div className=''>
            <ContentDisplayBlock content={items} view='lg' justify='start ' />
          </div>
        ) : (
          items.map((item) => (
            <div className='flex flex-col space-y-2'>
              <ContentCardListView item={item} onRemove={handleRemoveItem} />
            </div>
          ))
        )}
      </motion.div>
    </AnimatePresence>
  );
}
