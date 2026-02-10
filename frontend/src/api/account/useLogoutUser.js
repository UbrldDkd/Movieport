import { useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import { ensureCsrf } from './auth/ensureCsrf';

export function useLogoutUser() {
  const { setUser } = useContext(AuthContext);

const logoutUser = async () => {
    try {
      const csrfToken = await ensureCsrf();
      const response = await fetch(
        'http://127.0.0.1:8000/accounts/logout_user/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Failed to logout');
      }

      const data = await response.json();
      setUser(null);
      return { success: true, message: data?.message || 'Logged out successfully' };
    } catch (err) {
      console.error('Logout error:', err);
      return { success: false, message: err.message };
    }
  };

  return logoutUser;
}
