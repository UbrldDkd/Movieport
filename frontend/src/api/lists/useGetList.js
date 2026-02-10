import { useState, useEffect } from 'react';
import { ensureCsrf } from '../account/auth/ensureCsrf.js';

export const useGetList = (username, title_slug) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || !title_slug) return;

    const getList = async () => {
      setLoading(true);
      try {
        const csrfToken = await ensureCsrf();

        // 1Fetch the list from your backend
        const listRes = await fetch(
          `http://127.0.0.1:8000/lists/list/${username}/${title_slug}/`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
            },
          }
        );
        if (!listRes.ok)
          throw new Error(`Failed to fetch list: ${listRes.status}`);
        const listData = await listRes.json();

        setList(listData);
      } catch (err) {
        console.error('Fetch single list error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, [username, title_slug]);

  return { list, loading, error };
};
