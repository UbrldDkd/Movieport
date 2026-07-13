import { useState } from 'react';
import authApiClient from '../../../../api/account/auth/authApiClient';

export function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changePassword = async ({ currentPassword, newPassword }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApiClient.post(
        '/accounts/profile/change_password/',
        {
          current_password: currentPassword,
          new_password: newPassword,
        }
      );

      return response.data;
    } catch (err) {
      const data = err?.response?.data;
      setError(data);
      throw data;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
}
