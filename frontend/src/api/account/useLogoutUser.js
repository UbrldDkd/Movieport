import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import authApiClient from './auth/authApiClient';

export function useLogoutUser() {
  const { setUser } = useContext(AuthContext);

  const logoutUser = async () => {
    try {
      const response = await authApiClient.post('/accounts/logout_user/');

      const data = response.data;
      setUser(null);
      return { success: true, message: data?.message || 'Logged out successfully' };
    } catch (err) {
      console.error('Logout error:', err);
      setUser(null);
      return { success: true, message: 'Logged out' };
    }
  };

  return logoutUser;
}