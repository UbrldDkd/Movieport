// Standard library
import { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { GiCaptainHatProfile } from 'react-icons/gi';

// Third-party
import { AnimatePresence, motion } from 'framer-motion';

// Context
import { AuthContext } from '../../../api/account/auth/AuthContext.js';
// API/Hooks
import { useGetUserByUsername } from '../../../api/account/Profile/useGetUserByUsername.js';

// Components
import ProfileFilms from './Films/ProfileFilms.jsx';
import ProfileLists from './Lists/ProfileLists.jsx';
import ProfileWatchlist from './Watchlist/ProfileWatchlist.jsx';
import ProfileLikes from './Likes/ProfileLikes.jsx';
import ProfileActivity from './Activity/ProfileActivity.jsx';

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
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function ProfileBrowse() {
  const { username, tab, subtab } = useParams();
  const navigate = useNavigate();

  const [userToDisplay, setUserToDisplay] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || 'films');
  const [isLoading, setIsLoading] = useState(true);

  const { user: activeUser } = useContext(AuthContext);
  const fetchedUser = useGetUserByUsername(username);

  useEffect(() => {
    if (tab && tab !== activeTab) setActiveTab(tab);
  }, [tab, activeTab]);

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

  const handleTabClick = (newTab) => {
    setActiveTab(newTab);
    navigate(`/${userToDisplay.username}/${newTab}/`);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200 flex items-center justify-center'>
        <div className='w-6 h-6 border-2 border-red-900 border-t-transparent rounded-full animate-spin' />
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
                  className={`tracking-wider text-xs sm:text-sm hover:cursor-pointer font-medium rounded px-2 sm:px-3 py-2 transition-colors whitespace-nowrap ${
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
              <div className='w-8 h-8 rounded-full cursor-pointer border border-zinc-700 bg-zinc-800 flex items-center justify-center'>
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
              {activeTab === 'films' && (
                <ProfileFilms items={userToDisplay.films} />
              )}
              {activeTab === 'activity' && <ProfileActivity />}

              {activeTab === 'lists' && (
                <ProfileLists
                  lists={userToDisplay.lists}
                  username={userToDisplay.username}
                  isOwner={userToDisplay.is_owner}
                />
              )}

              {activeTab === 'watchlist' && (
                <ProfileWatchlist
                  items={userToDisplay.watchlist}
                  username={userToDisplay.username}
                  isOwner={userToDisplay.is_owner}
                />
              )}

              {activeTab === 'likes' && (
                <ProfileLikes
                  items={userToDisplay?.likes}
                  username={username}
                  subtab={subtab}
                  isOwner={userToDisplay?.is_owner}
                  likedListIds={userToDisplay?.likedListIds}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
