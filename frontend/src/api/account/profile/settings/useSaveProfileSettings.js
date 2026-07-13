import { useState } from 'react';
import authApiClient from '../../auth/authApiClient';

export function useSaveProfileSettings() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      setError(null);

      const res = await authApiClient.patch(
        '/accounts/profile/update_settings/',
        updates
      );

      return res.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, isLoading, error };
}
