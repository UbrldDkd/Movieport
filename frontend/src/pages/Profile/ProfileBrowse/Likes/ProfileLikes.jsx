import { useState } from 'react';

// Third-party
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';

// API hooks
import { useGetListsByIds } from '../../../../api/lists/useGetListsByIds';

// Utils animations
import { tabVariants } from '../../../../utils/style/animations/motionVariants';

// Components
import SlidingTabsNavigation from '../../../../components/Common/SlidingTabsNavigation';
import ProfileLikesFilms from './ProfileLikesFilms';
import ProfileLikesLists from './ProfileLikesLists';
import ProfileLikesTvShows from './ProfileLikesTvShows';
import ContentContainer from '../../../../components/WrapperContainers/ContentContainer';

export default function ProfileLikes({
  items,
  username,
  subtab = 'films',
  isOwner,
  likedListIds,
}) {
  const navigate = useNavigate();
  const { lists, isLoading, error } = useGetListsByIds(likedListIds);

  const films = items?.filter((i) => i.media_type === 'film');
  const tvShows = items?.filter((i) => i.media_type === 'tv');

  const tabs = [
    { key: 'films', label: 'FILMS' },
    { key: 'tv-shows', label: 'TV-SHOWS' },
    { key: 'lists', label: 'LISTS' },
  ];

  return (
    <ContentContainer>
      {/* Tabs */}
      <SlidingTabsNavigation
        tabs={tabs}
        activeKey={subtab}
        onChange={(key) => navigate(`/${username}/likes/${key}/`)}
      />

      {/* Animated Tab Content */}
      <AnimatePresence mode='wait'>
        {subtab === 'films' && (
          <Motion.div
            key='films'
            variants={tabVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ProfileLikesFilms
              items={films}
              username={username}
              isOwner={isOwner}
            />
          </Motion.div>
        )}

        {subtab === 'tv-shows' && (
          <Motion.div
            key='tv-shows'
            variants={tabVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <ProfileLikesTvShows
              items={tvShows}
              username={username}
              isOwner={isOwner}
            />
          </Motion.div>
        )}

        {subtab === 'lists' && (
          <Motion.div
            key='lists'
            variants={tabVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {isLoading && (
              <div className='text-center py-8 text-sm animate-pulse'>
                Loading lists…
              </div>
            )}

            {error && (
              <div className='text-center py-8 text-sm text-red-900'>
                Failed to load lists
              </div>
            )}

            {!isLoading && !error && (
              <ProfileLikesLists
                lists={lists}
                username={username}
                isOwner={isOwner}
              />
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </ContentContainer>
  );
}
