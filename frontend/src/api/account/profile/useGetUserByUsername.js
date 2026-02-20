import { useState, useEffect } from 'react';
import publicApiClient from '../../publicApiClient';

export function useGetUserByUsername(username) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const getUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await publicApiClient.get(`/accounts/get_user/${username}/`);

        setData(res.data);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { data, isLoading, error };
}