import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSearchLists } from './hooks/useSearchLists';
import PaginationPanel from '../../../components/common/PaginationPanel.jsx';
import LightHouse from '../../../components/common/loadingScreens/LightHouse.jsx';
import SearchNoResults from '../SearchNoResults';
import ListCard from '../../../components/List/ListCard.jsx';

import {
  contentCardContainerVariantsFast,
  itemVariants,
} from '../../../utils/style/animations/motionVariants.js';

export default function SearchResultsLists({ value }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { lists, totalPages, isLoading } = useSearchLists({
    value,
    pageNumber: currentPage,
    itemsPerPage: 20,
  });

  console.log('lists', lists);

  useEffect(() => {
    setCurrentPage(1);
  }, [value]);

  return (
    <AnimatePresence mode='wait'>
      {isLoading ? (
        <motion.div
          key='loading'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className='w-full'
        >
          <LightHouse />
        </motion.div>
      ) : lists.length === 0 ? (
        <SearchNoResults type='lists' value={value} />
      ) : (
        <motion.div
          key={`list-results-${value}-${currentPage}`}
          variants={contentCardContainerVariantsFast}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='space-y-8'
        >
          <AnimatePresence mode='popLayout'>
            {lists.map((list, index) => (
              <motion.div
                key={list.id}
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <div className='flex flex-col'>
                  <ListCard list={list} />

                  {/* Divider */}
                  {index !== lists.length - 1 && (
                    <div className='h-px w-full bg-zinc-800' />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <PaginationPanel
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
