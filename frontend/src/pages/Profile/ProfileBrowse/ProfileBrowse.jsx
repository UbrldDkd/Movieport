// Standard library
import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Third-party
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { AuthContext } from '../../../API/account/auth/AuthContext.js';
// API/Hooks
import { useGetUserByUsername } from '../../../API/account/Profile/useGetUserByUsername.js';

// Components
import ProfileFilms from './Films/ProfileFilms.jsx';
import ProfileLists from './Lists/ProfileLists.jsx';
import ProfileWatchlist from './Watchlist/ProfileWatchlist.jsx';
import ProfileLikes from './Likes/ProfileLikes.jsx';

const navLinks = [
  { label: 'Films', to: 'films' },
  { label: 'Activity', to: 'activity' },
  { label: 'Lists', to: 'lists' },
  { label: 'Watchlist', to: 'watchlist' },
  { label: 'Likes', to: 'likes/films' },
  { label: 'Network', to: 'following' },
];

const tabVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ProfileBrowse() {
  // Router
  const { username, tab, subtab } = useParams();
  const navigate = useNavigate();

  // State
  const [userToDisplay, setUserToDisplay] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || 'films');
  const [isLoading, setIsLoading] = useState(true);

  // Contexts
  const { user: activeUser } = useContext(AuthContext);

  // Data fetching hooks
  const fetchedUser = useGetUserByUsername(username);

  console.log('new user data', fetchedUser);
  // Sync tab param with state
  useEffect(() => {
    if (tab && tab !== activeTab) setActiveTab(tab);
  }, [tab, activeTab]);

  // Build userToDisplay object
  useEffect(() => {
    if (!username) return;

    const isActive =
      activeUser?.username?.toLowerCase() === username?.toLowerCase();

    if (isActive && activeUser) {
      setUserToDisplay({
        ...activeUser,
        lists: activeUser.lists || [],
        likes: activeUser.contentRelations?.filter((cr) => cr.liked) || [],
        watchlist:
          activeUser.contentRelations?.filter((cr) => cr.watchlisted) || [],
        films: activeUser.contentRelations?.filter((cr) => cr.watched) || [],
        likedListIds: activeUser.likedListIds || [],
        is_owner: true,
      });
      setIsLoading(false);
    } else if (fetchedUser) {
      setUserToDisplay({
        ...fetchedUser,
        lists: fetchedUser.lists || [],
        likes: fetchedUser.content_relations?.filter((cr) => cr.liked),
        watchlist: fetchedUser.content_relations?.filter(
          (cr) => cr.watchlisted
        ),
        films: fetchedUser.content_relations?.filter((cr) => cr.watched),
        likedListIds: fetchedUser.liked_list_ids || [],
        is_owner: false,
      });
      setIsLoading(false);
    }
  }, [username, activeUser, fetchedUser]);

  // Handle tab switching
  const handleTabClick = (newTab) => {
    setActiveTab(newTab);
    navigate(`/${userToDisplay.username}/${newTab}/`);
  };

  console.log('userToDisplay', userToDisplay);
  // Loading state
  if (isLoading) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200'>
        <div className='mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60'>
          <div className='flex items-center justify-center h-screen'>
            <div className='text-red-900 animate-spin rounded-full'></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userToDisplay) return null;

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={username}
        variants={pageVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className='min-h-screen bg-zinc-950 text-zinc-200'
      >
        <div className='mx-auto px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60'>
          {/* Navbar */}
          <nav className='flex items-center justify-center rounded-l-sm rounded-r-3xl bg-zinc-900/90 py-0.5 mt-2 relative overflow-x-auto'>
            <div className='flex justify-center gap-2 sm:gap-4 min-w-0 flex-1 px-2'>
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
              <img
                src={userToDisplay.avatar || '/default-avatar.png'}
                alt='Profile'
                className='w-9 h-9 rounded-full border border-zinc-800 object-cover'
              />
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
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='mt-2 space-y-6 sm:space-y-10 pb-10'
            >
              {activeTab === 'films' && (
                <ProfileFilms items={userToDisplay.films} />
              )}

              {activeTab === 'lists' && (
                <ProfileLists
                  lists={userToDisplay.lists}
                  username={userToDisplay.username}
                  is_owner={userToDisplay.is_owner}
                />
              )}

              {activeTab === 'watchlist' && (
                <ProfileWatchlist
                  items={userToDisplay.watchlist}
                  username={userToDisplay.username}
                  is_owner={userToDisplay.is_owner}
                />
              )}

              {activeTab === 'likes' && (
                <ProfileLikes
                  items={userToDisplay.likes}
                  username={username}
                  subtab={subtab}
                  is_owner={userToDisplay.is_owner}
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
