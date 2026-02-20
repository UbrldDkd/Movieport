import { useState, useEffect } from 'react';
import publicApiClient from '../publicApiClient';

export const useGetList = (username, title_slug) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || !title_slug) return;

    const getList = async () => {
      setLoading(true);
      try {
        const res = await publicApiClient.get(`/lists/list/${username}/${title_slug}/`);

        if (!res.data) throw new Error(`Failed to fetch list`);
        const listData = res.data;

        setList(listData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, [username, title_slug]);

  return { list, loading, error };
};