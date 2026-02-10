// Standard library
import { useState, useEffect, useContext } from 'react';

// Third-party imports
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiShipWreck } from 'react-icons/gi';

// Context and hooks
import { AuthContext } from '../../api/account/auth/AuthContext.js';
import { useGetUserByUsername } from '../../api/account/Profile/useGetUserByUsername.js';

// Components
import ProfileCard from './ProfileCard';
import ProfileNavBar from './ProfileNavBar';
import ProfileMain from './ProfileMain/ProfileMain.jsx';

// Animation variants
import {
  containerVariantsStagger,
  sectionVariants,
} from '../../utils/animations/motionVariants.js';

export default function Profile() {
  const [userToDisplay, setUserToDisplay] = useState(undefined);
  const [displayIsLoading, setdisplayIsLoading] = useState(true);

  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const {
    data: fetchedUser,
    loading: fetchedUserIsLoading,
    error: fetchedUserError,
  } = useGetUserByUsername(username);

  // Determine overall loading state - wait for both auth and fetch to complete
  const isLoading = fetchedUserIsLoading || displayIsLoading;

  const navigate = useNavigate();

  useEffect(() => {
    // Don't process until we have the necessary data
    if (!username || fetchedUserIsLoading) return;

    // Check if viewing own profile
    const isOwner =
      user && user.username.toLowerCase() === username.toLowerCase();

    if (isOwner) {
      // Use authenticated user data
      setUserToDisplay({
        ...user,
        lists: user.lists || [],
        contentRelations: user.contentRelations || [],
        likedListIds: user.likedListIds || [],
        isOwner: true,
      });
    } else if (fetchedUser) {
      // Use fetched user data
      setUserToDisplay({
        ...fetchedUser,
        lists: fetchedUser.lists || [],
        contentRelations: fetchedUser.content_relations || [],
        likedListIds: fetchedUser.liked_list_ids || [],
        isOwner: false,
      });
    } else {
      setUserToDisplay(null);
    }

    setdisplayIsLoading(false);
  }, [user, username, fetchedUser, fetchedUserIsLoading]);

  console.log('utd', userToDisplay);

  // Loading state with spinning film reel
  if (isLoading) {
    return (
      <div className='w-full h-[85vh] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-red-900 border-solid' />
      </div>
    );
  }

  // User not found state
  if (fetchedUserError) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center gap-4'>
        <GiShipWreck className='size-30' />
        <div className='text-zinc-400 font-semibold tracking-wider'>
          User could not be found
        </div>
        <button
          onClick={() => navigate('/')}
          className='text-sm hover:cursor-pointer font-semibold tracking-wider bg-zinc-900 px-2 py-0.5 text-zinc-300/90 hover:text-zinc-200 transition-colors duration-120 rounded-sm'
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className='min-h-screen bg-zinc-950 text-zinc-200'
      initial='hidden'
      animate='visible'
      variants={containerVariantsStagger}
    >
      <div className='mx-auto w-full max-w-[1120px] px-4 sm:px-6 md:px-8 lg:px-12 pb-8 flex flex-col'>
        <motion.div variants={sectionVariants}>
          <ProfileCard user={userToDisplay} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <ProfileNavBar username={userToDisplay?.username} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <div className='flex flex-col '>
            <div className='flex flex-col flex-1 min-w-0 gap-4'>
              <ProfileMain user={userToDisplay} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
