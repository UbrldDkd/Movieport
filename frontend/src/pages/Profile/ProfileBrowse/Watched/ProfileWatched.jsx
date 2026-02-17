import { useState } from 'react';

// Third-party
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Components
import ContentDisplayBlock from '../../../../components/ContentDisplays/ContentDisplayBlock';
import Pagination from '../Pagination/Pagination';
import AnimatedTabs from '../../../../components/Common/AnimatedTabs';
import { tabVariants } from '../../../../utils/style/animations/motionVariants';

export default function ProfileWatched({ username, items, subtab, isOwner }) {
  const ITEMS_PER_PAGE = 36;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Filter items by media type
  const films = items?.filter((i) => i.media_type === 'film') || [];
  const tvShows = items?.filter((i) => i.media_type === 'tv') || [];
  const filteredItems = subtab === 'tv' ? tvShows : films;

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const tabs = [
    { key: 'films', label: 'FILMS' },
    { key: 'tv', label: 'TV-SHOWS' },
  ];

  return (
    <div className='bg-zinc-900/90 rounded-sm p-3 text-zinc-200'>
      {/* Tabs */}
      <AnimatedTabs
        tabs={tabs}
        activeKey={subtab || 'films'}
        onChange={(key) => navigate(`/${username}/watched/${key}/`)}
      />

      {/* Tab Content */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={subtab || 'films'}
          variants={tabVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {filteredItems.length > 0 ? (
            <>
              <div className='flex'>
                <ContentDisplayBlock
                  includeContentRelations={true}
                  displayAmount={ITEMS_PER_PAGE}
                  view='sm'
                  justify='start'
                  content={paginatedItems}
                />
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <div className='py-12 text-center text-zinc-400 font-medium text-sm'>
              {isOwner
                ? `You haven't watched any ${
                    subtab === 'tv' ? 'TV shows' : 'films'
                  } yet`
                : `${username} hasn't watched any ${
                    subtab === 'tv' ? 'TV shows' : 'films'
                  } yet`}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
