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
        throw new Error(data?.message || 'Failed to logout');
      }

      const data = await response.json();
      // clear the user in context
      console.log('success');
      setUser([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return logoutUser;
}
