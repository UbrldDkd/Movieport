import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useSearchUsers } from './hooks/useSearchUsers';
import PaginationPanel from '../../../components/Common/PaginationPanel.jsx';
import LightHouse from '../../../components/Common/loadingScreens/LightHouse.jsx';
import Pfp from '../../../components/Common/Pfp';
import SearchNoResults from '../SearchNoResults';

import {
  contentCardContainerVariantsFast,
  itemVariants,
} from '../../../utils/style/animations/motionVariants.js';

export default function SearchResultsUsers({ value }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { users, totalPages, isLoading } = useSearchUsers({
    value,
    usersPerPage: 20,
    pageNumber: currentPage,
  });

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
      ) : users.length === 0 ? (
        <SearchNoResults type='users' value={value} />
      ) : (
        <motion.div
          key={`user-results-${value}-${currentPage}`}
          variants={contentCardContainerVariantsFast}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <AnimatePresence mode='popLayout'>
            {users.map((user, index) => (
              <motion.div
                key={user.username}
                variants={itemVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
              >
                <div className='flex flex-col '>
                  <div className='flex items-center px-3 py-5 gap-7'>
                    <Link to={`/${user.username}`}>
                      <Pfp user={user} size='sm' />
                    </Link>

                    <Link to={`/${user.username}`}>
                      <span className='text-zinc-300 text-lg font-semibold tracking-wide'>
                        {user.username}
                      </span>
                    </Link>
                  </div>

                  {/* Horizontal divider */}
                  {index !== users.length - 1 && (
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
