// Standard library
import { useContext, useState, useEffect, useMemo } from 'react';

// Third-party
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GiCaptainHatProfile, GiShipWreck } from 'react-icons/gi';
import { PiFilmReelFill } from 'react-icons/pi';

// Context and hooks
import { AuthContext } from '../../../api/account/auth/AuthContext.js';
import { useGetUserByUsername } from '../../../api/account/Profile/useGetUserByUsername.js';

// Components
import ProfileWatched from './Films/ProfileWatched.jsx';
import ProfileLists from './Lists/ProfileLists.jsx';
import ProfileWatchlist from './Watchlist/ProfileWatchlist.jsx';
import ProfileLikes from './Likes/ProfileLikes.jsx';
import ProfileActivity from './Activity/ProfileActivity.jsx';

const navLinks = [
  { label: 'Watched', to: 'watched' },
  { label: 'Activity', to: 'activity' },
  { label: 'Lists', to: 'lists' },
  { label: 'Watchlist', to: 'watchlist' },
  { label: 'Likes', to: 'likes/films' },
  { label: 'Network', to: 'following' },
];

// Animation variants
const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function ProfileBrowse() {
  const [userToDisplay, setUserToDisplay] = useState(undefined); // <-- undefined now
  const [displayIsLoading, setDisplayIsLoading] = useState(true);

  const { username, tab, subtab } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const {
    data: fetchedUser,
    loading: fetchedUserIsLoading,
    error: fetchedUserError,
  } = useGetUserByUsername(username);

  const activeTab = tab || 'films';

  // Set user to display
  useEffect(() => {
    if (!username || fetchedUserIsLoading) return;

    const isOwner =
      user && user?.username.toLowerCase() === username.toLowerCase();

    if (isOwner) {
      setUserToDisplay({
        ...user,
        lists: user.lists || [],
        likes: user.contentRelations?.filter((cr) => cr.liked) || [],
        watchlist: user.contentRelations?.filter((cr) => cr.watchlisted) || [],
        films: user.contentRelations?.filter((cr) => cr.watched) || [],
        likedListIds: user.likedListIds || [],
        isOwner: true,
      });
    } else if (fetchedUser) {
      setUserToDisplay({
        ...fetchedUser,
        lists: fetchedUser.lists || [],
        likes: fetchedUser.content_relations?.filter((cr) => cr.liked) || [],
        watchlist:
          fetchedUser.content_relations?.filter((cr) => cr.watchlisted) || [],
        films: fetchedUser.content_relations?.filter((cr) => cr.watched) || [],
        likedListIds: fetchedUser.liked_list_ids || [],
        isOwner: false,
      });
    }

    setDisplayIsLoading(false);
  }, [user, username, fetchedUser, fetchedUserIsLoading]);

  const handleTabClick = (newTab) => {
    if (!userToDisplay) return; // guard
    navigate(`/${userToDisplay.username}/${newTab}/`);
  };

  // Combined loading state
  const isLoading =
    fetchedUserIsLoading || displayIsLoading || userToDisplay === undefined;

  // Loading state with spinning film reel
  if (isLoading) {
    return (
      <div className='w-full h-[85vh] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-red-900 border-solid' />
      </div>
    );
  }

  // User not found state
  if (fetchedUserError || !userToDisplay) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center gap-4'>
        <GiShipWreck className='size-30' />
        <div className='text-zinc-400 font-semibold tracking-wider'>
          User could not be found
        </div>
        <button
          onClick={() => navigate('/')}
          className='text-xs font-semibold tracking-wider bg-zinc-900 px-2 py-0.5 text-zinc-300/90 hover:text-zinc-200 transition-colors duration-120 rounded-sm'
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={username}
        variants={pageVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className='min-h-screen bg-zinc-950 text-zinc-200'
      >
        <div className='mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60'>
          {/* Navbar */}
          <nav className='flex items-center justify-center rounded-l-sm rounded-r-3xl bg-zinc-900/90 py-0.5 mt-2 relative overflow-x-auto'>
            <div className='flex justify-center gap-2 sm:gap-4 flex-1 px-2'>
              {navLinks.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleTabClick(item.to)}
                  className={`tracking-wider hover:cursor-pointer text-xs sm:text-sm font-medium rounded px-2 sm:px-3 py-2 transition-colors whitespace-nowrap ${
                    activeTab === item.to
                      ? 'text-zinc-200'
                      : 'text-zinc-400 hover:text-zinc-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Link
              to={`/${userToDisplay.username}/`}
              className='hidden sm:flex absolute right-1.5 items-center gap-2'
            >
              <span className='text-sm font-medium'>
                {userToDisplay.username}
              </span>
              <div className='w-8 h-8 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center'>
                <GiCaptainHatProfile className='text-lg text-zinc-400' />
              </div>
            </Link>
          </nav>

          {/* Animated tab content */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className='mt-2 space-y-6 sm:space-y-10 pb-10'
            >
              {activeTab === 'watched' && (
                <ProfileWatched
                  username={username}
                  items={userToDisplay.films}
                  subtab={subtab}
                  isOwner={userToDisplay?.isOwner}
                />
              )}
              {activeTab === 'activity' && <ProfileActivity />}

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
      </motion.div>
    </AnimatePresence>
  );
}
