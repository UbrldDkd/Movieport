import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetchAllLists() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get('http://127.0.0.1:8000/lists/get_all_public_lists/', {
          withCredentials: true,
        });

        setData(res.data);
        console.log('Lists data:', res.data);
      } catch (err) {
        console.error('Failed to fetch lists:', err);
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