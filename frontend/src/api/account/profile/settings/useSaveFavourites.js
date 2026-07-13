import { useState } from 'react';
import authApiClient from '../../auth/authApiClient';

export function useSaveFavourites() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveFavourites = async (favourites) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        favourites: favourites || [],
      };

      const res = await authApiClient.post(
        '/content_relations/save_favourites/',
        payload
      );

      return res.data;
    } catch (err) {
      setError(
        err.response?.data || err.message || 'Failed to save favourites'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveFavourites, isLoading, error };
}
