// React
import { useState, useEffect, useContext } from 'react';

// Context
import { AuthContext } from '../../../api/account/auth/AuthContext.js';

// API hooks
import { useGetUserByUsername } from '../../../api/account/Profile/useGetUserByUsername.js';

// Sets display user by username(uses logged in user or fetched user)
export function useUserToDisplay(username) {
  const { user } = useContext(AuthContext);
  const {
    data: fetchedUser,
    isLoading: fetchedUserIsLoading,
    error: fetchedUserError,
  } = useGetUserByUsername(username);

  const [userToDisplay, setUserToDisplay] = useState(null);
  const [displayIsLoading, setDisplayIsLoading] = useState(true);

  useEffect(() => {
    console.log('useUserToDisplay called with:', {
      username,
      user,
      fetchedUser,
      fetchedUserIsLoading,
    });

    if (!username) {
      setDisplayIsLoading(false);
      return;
    }

    if (fetchedUserIsLoading) {
      setDisplayIsLoading(true);
      return;
    }

    const isOwner = user?.username?.toLowerCase() === username.toLowerCase();

    if (isOwner) {
      const contentRelations = user?.content_relations || [];
      console.log('Using logged-in user data:', user);

      setUserToDisplay({
        ...user,
        lists: user.lists || [],
        likes: contentRelations.filter((cr) => cr.liked),
        favourites: contentRelations.filter((cr) => cr.favurited),
        watchlist: contentRelations.filter((cr) => cr.watchlisted),
        watched: contentRelations.filter((cr) => cr.watched),
        likedListIds: user.liked_list_ids || [],
        isOwner: true,
      });
    } else if (fetchedUser) {
      const contentRelations = fetchedUser?.content_relations || [];
      console.log('Using fetched user data:', fetchedUser);

      setUserToDisplay({
        ...fetchedUser,
        lists: fetchedUser.lists || [],
        likes: contentRelations.filter((cr) => cr.liked),
        favourites: contentRelations.filter((cr) => cr.favurited),
        watchlist: contentRelations.filter((cr) => cr.watchlisted),
        watched: contentRelations.filter((cr) => cr.watched),
        likedListIds: fetchedUser.likedListIds || [],
        isOwner: false,
      });
    } else {
      console.log('No user found, setting userToDisplay to null');
      setUserToDisplay(null);
    }

    setDisplayIsLoading(false);
  }, [user, username, fetchedUser, fetchedUserIsLoading]);

  return {
    userToDisplay,
    isLoading: fetchedUserIsLoading || displayIsLoading,
    error: fetchedUserError,
  };
}
