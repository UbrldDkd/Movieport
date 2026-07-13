import { useContext } from 'react';

import { AuthContext } from '../../../api/account/auth/AuthContext';
import { useGetUserByUsername } from '../../../api/account/profile/useGetUserByUsername';

export function useUserToDisplay(username) {
  const { user } = useContext(AuthContext);

  const isOwner = user?.username?.toLowerCase() === username?.toLowerCase();

  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useGetUserByUsername(username, {
    enabled: !!username && !isOwner,
  });

  return {
    userToDisplay: isOwner ? user : fetchedUser,
    isLoading: isOwner ? false : isLoading,
    error,
  };
}
