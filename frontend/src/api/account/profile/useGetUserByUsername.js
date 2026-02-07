// Third-party imports
import { useState, useEffect } from 'react';
import axios from 'axios';

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

        const res = await axios.get(
          `http://127.0.0.1:8000/accounts/get_user/${username}/`,
          {
            withCredentials: true,
          }
        );

        console.log('user data', res.data);
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
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
