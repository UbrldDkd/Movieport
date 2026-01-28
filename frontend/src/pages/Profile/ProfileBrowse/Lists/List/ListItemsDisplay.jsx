import { motion, AnimatePresence } from 'framer-motion';
import ContentCard from '../../ContentCard/ContentCard';
import ContentCardListView from '../../ContentCard/ContentCardListView';

export default function ListItemsDisplay({ items, view }) {
  // Animation variants
  const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
  const gridVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={view}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className={`grid gap-2.5 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-auto-fill'}`}
        style={{
          gridTemplateColumns:
            view === 'list'
              ? '1fr'
              : 'repeat(auto-fill, minmax(140px, 1fr))', // responsive cards, fill width
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.tmdb_id || i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            {view === 'list' ? (
              <ContentCardListView item={item} />
            ) : (
              <ContentCard item={item} view="lg" /> // ContentCard handles its own responsive sizing
            )}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
