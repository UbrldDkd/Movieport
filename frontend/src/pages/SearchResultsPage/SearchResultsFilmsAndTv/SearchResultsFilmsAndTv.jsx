import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useFetchSearch } from '../hooks/useFetchSearch.js';

import PaginationPanel from '../../../components/Common/PaginationPanel.jsx';
import LightHouse from '../../../components/Common/loadingScreens/LightHouse.jsx';

import SearchResultsContentCard from './SearchResultsContentCard.jsx';
import SearchNoResults from '../SearchNoResults';

import {
  contentCardContainerVariantsFast,
  itemVariants,
} from '../../../utils/style/animations/motionVariants.js';

export default function SearchResultsFilmsAndTv({ value, type }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { content, isLoading, totalPages } = useFetchSearch({
    value,
    type,
    currentPage,
    contentPerPage: 20,
  });

  console.log(content);

  useEffect(() => {
    setCurrentPage(1);
  }, [value, type]);

  const showMediaType = type === 'both' ? true : false;

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
      ) : content.length === 0 ? (
        <SearchNoResults type={type} value={value} />
      ) : (
        <motion.div
          key={`results-${value}-${type}-${currentPage}`}
          variants={contentCardContainerVariantsFast}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='space-y-8'
        >
          <AnimatePresence mode='popLayout'>
            {content.map((item) => (
              <motion.div
                key={`${item.mediaType}-${item.id}`}
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <SearchResultsContentCard
                  item={item}
                  showMediaType={showMediaType}
                />
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
