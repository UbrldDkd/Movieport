import { useContext } from 'react';
import { AuthContext } from '../../api/account/auth/AuthContext';

// Check if user is logged in, returns a boolean value
export const useIsLoggedIn = () => {
  const { user } = useContext(AuthContext);
  return Boolean(user);
};
