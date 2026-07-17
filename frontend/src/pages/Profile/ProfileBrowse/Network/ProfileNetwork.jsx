import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';

import { tabVariants } from '../../../../utils/style/animations/motionVariants';
import SlidingTabsNavigation from '../../../../components/Common/SlidingTabsNavigation';
import ContentContainer from '../../../../components/WrapperContainers/ContentContainer';
import NetworkProfileCard from './NetworkProfileCard';
import ProfileNoResults from '../ProfileNoResults';

const mockProfiles = [
  {
    id: 1,
    username: 'Mina',
    avatar: 'war',
    likes: 12,
    lists: 3,
    watchlist: 7,
    watched: 24,
    following: 18,
    followers: 21,
  },
  {
    id: 2,
    username: 'Dorian',
    avatar: 'conquest',
    likes: 5,
    lists: 2,
    watchlist: 4,
    watched: 16,
    following: 11,
    followers: 9,
  },
  {
    id: 3,
    username: 'Lena',
    avatar: 'famine',
    likes: 8,
    lists: 4,
    watchlist: 6,
    watched: 19,
    following: 14,
    followers: 13,
  },
  {
    id: 4,
    username: 'Theo',
    avatar: 'death',
    likes: 10,
    lists: 1,
    watchlist: 8,
    watched: 22,
    following: 7,
    followers: 12,
  },
];

export default function ProfileNetwork({
  username,
  subtab = 'following',
  followers,
  following,
  isOwner,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(subtab || 'following');

  useEffect(() => {
    setActiveTab(subtab || 'following');
  }, [subtab]);

  const tabs = [
    { key: 'following', label: 'Following' },
    { key: 'followers', label: 'Followers' },
  ];

  const displayedProfiles =
    subtab === 'following' ? following || [] : followers || [];

  return (
    <ContentContainer>
      <SlidingTabsNavigation
        tabs={tabs}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          navigate(`/${username}/${key}/`);
        }}
      />

      <AnimatePresence mode='wait'>
        <Motion.div
          key={activeTab}
          variants={tabVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className='flex flex-col gap-2'
        >
          {displayedProfiles.length === 0 ? (
            <div className='py-12 text-center text-zinc-400 font-medium text-sm'>
              {isOwner && activeTab === 'following'
                ? "You haven't followed anyone yet"
                : !isOwner && activeTab === 'following'
                  ? `${username} hasn't followed anyone yet`
                  : isOwner
                    ? "You don't have any followers yet"
                    : `${username} doesn't have any followers yet`}
            </div>
          ) : (
            displayedProfiles.map((profile) => (
              <NetworkProfileCard key={profile.id} profile={profile} />
            ))
          )}
        </Motion.div>
      </AnimatePresence>
    </ContentContainer>
  );
}
