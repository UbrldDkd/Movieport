// Third-party
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Icons
import { GiCaptainHatProfile } from 'react-icons/gi';

// Hooks
import { useGetUserByUsername } from '../../../api/account/profile/useGetUserByUsername.js';

// Components
import ProfileWatched from './Watched/ProfileWatched.jsx';
import ProfileLists from './Lists/ProfileLists.jsx';
import ProfileWatchlist from './Watchlist/ProfileWatchlist.jsx';
import ProfileLikes from './Likes/ProfileLikes.jsx';
import ProfileActivity from './Activity/ProfileActivity.jsx';
import ProfileReviews from './Reviews/ProfileReviews.jsx';
import ProfileNetwork from './Network/ProfileNetwork.jsx';
import ProfileNoResults from './ProfileNoResults.jsx';
import BackgroundContainer from '../../../components/WrapperContainers/BackgroundContainer.jsx';
import TabsContainers from '../../../components/WrapperContainers/TabsContainer.jsx';
import Pfp from '../../../components/Common/Pfp.jsx';

const navLinks = [
  { label: 'Watched', to: 'watched' },
  { label: 'Activity', to: 'activity' },
  { label: 'Reviews', to: 'reviews' },
  { label: 'Lists', to: 'lists' },
  { label: 'Watchlist', to: 'watchlist' },
  { label: 'Likes', to: 'likes' },
  { label: 'Network', to: 'network' },
];

import { tabVariants } from '../../../utils/style/animations/motionVariants.js';

export default function ProfileBrowse() {
  const { username, subtab } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserByUsername(username);

  // Only allow tabs defined in navLinks
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean); // removes empty strings
  const activeTabSegment = pathSegments[1] || ''; // 0 = username, 1 = tab
  const activeTab =
    navLinks.find((item) => {
      if (item.to === 'network') {
        return ['following', 'followers'].includes(activeTabSegment);
      }
      return activeTabSegment === item.to;
    })?.to || navLinks[0].to;

  const handleTabClick = (newTab) => {
    if (!user) return;
    if (newTab === 'network') {
      navigate(`/${user.username}/following/`);
      return;
    }
    navigate(`/${user.username}/${newTab}/`);
  };

  if (isLoading) {
    return (
      <div className='w-full h-[85vh] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-red-900 border-solid' />
      </div>
    );
  }

  if (error || !user) {
    return <ProfileNoResults message='User could not be found' />;
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
            to={`/${user.username}/`}
            className='hidden md:flex absolute right-1.5 items-center gap-2'
          >
            <span className='text-sm font-medium'>{user.username}</span>
            <Pfp avatar={user.avatar} size='sm' className='border-zinc-700' />
          </Link>
        </nav>

        {/* Tab content */}
        <TabsContainers activeTab={activeTab}>
          {activeTab === 'watched' && (
            <ProfileWatched
              username={username}
              items={user.watched}
              subtab={subtab}
              isOwner={user?.isOwner}
            />
          )}
          {activeTab === 'activity' && <ProfileActivity />}
          {activeTab === 'reviews' && <ProfileReviews />}
          {activeTab === 'lists' && (
            <ProfileLists
              lists={user.lists}
              username={user.username}
              isOwner={user.is_owner}
            />
          )}
          {activeTab === 'watchlist' && (
            <ProfileWatchlist
              items={user.watchlist}
              username={user.username}
              isOwner={user.is_owner}
            />
          )}
          {activeTab === 'likes' && (
            <ProfileLikes
              items={user.likes}
              username={user.username}
              subtab={subtab}
              isOwner={user.is_owner}
              likedListIds={user.likedListIds}
            />
          )}
          {activeTab === 'network' && (
            <ProfileNetwork
              username={user.username}
              followers={user.followers}
              following={user.following}
              subtab={activeTabSegment}
              isOwner={user.is_owner}
            />
          )}
        </TabsContainers>
      </div>
    </BackgroundContainer>
  );
}
