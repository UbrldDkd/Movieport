import { useState } from 'react';
import authApiClient from '../../auth/authApiClient';

export default function useSaveNotifications() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveNotifications = async (notifications) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authApiClient.patch(
        '/accounts/notifications/update/',
        notifications
      );

      return res.data;
    } catch (err) {
      setError(err?.response?.data || 'Update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveNotifications, loading, error };
}
