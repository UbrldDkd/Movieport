import { useState, useEffect } from 'react';
import apiClient from '../../../api/publicApiClient';

export function useFetchAllLists() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiClient.get('/lists/get_all_public_lists/');

        setData(res.data);
      } catch (err) {
        setError(err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  return { data, isLoading, error };
}
