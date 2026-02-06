import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { AuthContext } from '../../api/account/auth/AuthContext.js';
import { useGetUserByUsername } from '../../api/account/Profile/useGetUserByUsername.js';

import ProfileCard from './ProfileCard';
import ProfileNavBar from './ProfileNavBar';
import ProfileMain from './ProfileMain/ProfileMain.jsx';

export default function Profile() {
  const [userToDisplay, setUserToDisplay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const fetchedUser = useGetUserByUsername(username);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;
      setIsLoading(true);

      if (user && user.username.toLowerCase() === username.toLowerCase()) {
        setUserToDisplay({
          ...user,
          lists: user.lists || [],
          contentRelations: user.contentRelations || [],
          likedListIds: user.likedListIds || [],
          is_owner: true,
        });
      } else {
        try {
          setUserToDisplay({
            ...fetchedUser,
            lists: fetchedUser.lists || [],
            contentRelations: fetchedUser.content_relations || [],
            likedListIds: fetchedUser.liked_list_ids || [],
            is_owner: false,
          });
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
      setIsLoading(false);
    };
    fetchUserData();
  }, [user, username, fetchedUser]);

  if (isLoading || !userToDisplay) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='text-zinc-400'>
          {isLoading ? 'Loading...' : 'User not found'}
        </div>
      </div>
    );
  }

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, ease: 'easeOut' },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className='min-h-screen bg-zinc-950 text-zinc-200'
      initial='hidden'
      animate='visible'
      variants={containerVariants}
    >
      <div className='mx-auto w-full max-w-[1120px] px-4 sm:px-6 md:px-8 lg:px-12 pb-8 flex flex-col'>
        <motion.div variants={sectionVariants}>
          <ProfileCard user={userToDisplay} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <ProfileNavBar user={userToDisplay} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex flex-col flex-1 min-w-0 gap-4'>
              <ProfileMain user={userToDisplay} />
            </div>
            {/* Right column can be added here */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
