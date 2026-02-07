import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/Keys';

export function useGetUserByUsername(username) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const getUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          `http://127.0.0.1:8000/accounts/get_user/${username}/`
        );
        if (!res.ok) throw new Error('User not found');

        const data = await res.json();

        setUser({
          ...data,
        });
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { user, isLoading, error };
}
