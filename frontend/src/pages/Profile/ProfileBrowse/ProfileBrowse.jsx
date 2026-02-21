// Third-party
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Icons
import { GiCaptainHatProfile, GiShipWreck } from 'react-icons/gi';

// Hooks
import { useUserToDisplay } from '../hooks/useUserToDisplay.js';

// Components
import ProfileWatched from './Watched/ProfileWatched.jsx';
import ProfileLists from './Lists/ProfileLists.jsx';
import ProfileWatchlist from './Watchlist/ProfileWatchlist.jsx';
import ProfileLikes from './Likes/ProfileLikes.jsx';
import ProfileActivity from './Activity/ProfileActivity.jsx';
import ProfileReviews from './Reviews/ProfileReviews.jsx';
import BackgroundContainer from '../../../components/WrapperContainers/BackgroundContainer.jsx';

const navLinks = [
  { label: 'Watched', to: 'watched' },
  { label: 'Activity', to: 'activity' },
  { label: 'Reviews', to: 'reviews' },
  { label: 'Lists', to: 'lists' },
  { label: 'Watchlist', to: 'watchlist' },
  { label: 'Likes', to: 'likes' },
  { label: 'Network', to: 'following' },
];

import { tabVariants } from '../../../utils/style/animations/motionVariants.js';

export default function ProfileBrowse() {
  const { username, subtab } = useParams();
  const navigate = useNavigate();

  const { userToDisplay, isLoading, error } = useUserToDisplay(username);

  // Only allow tabs defined in navLinks
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean); // removes empty strings
  const activeTabSegment = pathSegments[1] || ''; // 0 = username, 1 = tab
  const activeTab =
    navLinks.find((item) => activeTabSegment.startsWith(item.to))?.to ||
    navLinks[0].to;

  const handleTabClick = (newTab) => {
    if (!userToDisplay) return;
    navigate(`/${userToDisplay.username}/${newTab}/`);
  };

  if (isLoading) {
    return (
      <div className='w-full h-[85vh] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-red-900 border-solid' />
      </div>
    );
  }

  if (error || !userToDisplay) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center gap-4'>
        <GiShipWreck className='size-30' />
        <div className='text-zinc-400 font-semibold tracking-wider'>
          User could not be found
        </div>
        <button
          onClick={() => navigate('/')}
          className='text-xs font-semibold tracking-wider bg-zinc-900 px-2 py-0.5 text-text-primary hover:text-zinc-200 transition-colors duration-120 rounded-sm'
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <BackgroundContainer>
      <div className='space-y-2'>
        {/* Navbar */}
        <nav className='flex items-center sm:py-1 md:py-1 justify-center rounded-l-sm rounded-r-3xl bg-bg-secondary   relative overflow-x-auto'>
          <div className='flex flex-col sm:w-auto sm:flex-row md:flex-row w-full md:w-auto divide-y md:divide-y-0 divide-zinc-800/50 '>
            {navLinks.map((item) => (
              <button
                key={item.to}
                onClick={() => handleTabClick(item.to)}
                className={`w-full md:hover:bg-transparent sm:hover:bg-transparentmd:w-auto text-left md:text-center hover:text-text-primary hover:bg-zinc-800 tracking-wider  text-xs sm:text-sm font-medium rounded px-2 sm:px-3 py-2 transition-colors whitespace-nowrap ${
                  activeTab === item.to
                    ? 'text-zinc-200 md:bg-transparent sm:bg-transparent bg-zinc-800 cursor-default'
                    : 'text-zinc-400 cursor-pointer '
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <Link
            to={`/${userToDisplay.username}/`}
            className='hidden md:flex absolute right-1.5 items-center gap-2'
          >
            <span className='text-sm font-medium'>
              {userToDisplay.username}
            </span>
            <div className='w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center'>
              <GiCaptainHatProfile className='text-lg text-zinc-400' />
            </div>
          </Link>
        </nav>

        {/* Tab content */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className=' space-y-6 sm:space-y-10 pb-10'
          >
            {activeTab === 'watched' && (
              <ProfileWatched
                username={username}
                items={userToDisplay.watched}
                subtab={subtab}
                isOwner={userToDisplay?.isOwner}
              />
            )}
            {activeTab === 'activity' && <ProfileActivity />}
            {activeTab === 'reviews' && <ProfileReviews />}
            {activeTab === 'lists' && (
              <ProfileLists
                lists={userToDisplay.lists}
                username={userToDisplay.username}
                isOwner={userToDisplay.isOwner}
              />
            )}
            {activeTab === 'watchlist' && (
              <ProfileWatchlist
                items={userToDisplay.watchlist}
                username={userToDisplay.username}
                isOwner={userToDisplay.isOwner}
              />
            )}
            {activeTab === 'likes' && (
              <ProfileLikes
                items={userToDisplay.likes}
                username={userToDisplay.username}
                subtab={subtab}
                isOwner={userToDisplay.isOwner}
                likedListIds={userToDisplay.likedListIds}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </BackgroundContainer>
  );
}
