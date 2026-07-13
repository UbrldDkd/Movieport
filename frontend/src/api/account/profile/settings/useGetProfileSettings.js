import { useState, useEffect } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import authApiClient from '../../auth/authApiClient';

export function useGetProfileSettings() {
  const [settingsData, setSettingsData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all settings (profile + favorites) from single endpoint
        const res = await authApiClient.get('/accounts/profile/get_settings/');
        const data = res.data;

        setSettingsData(data);

        console.log('settingsData:', data);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { settingsData, isLoading, error };
}
