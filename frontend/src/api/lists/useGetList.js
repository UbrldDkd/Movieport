import { useState, useEffect } from 'react';
import { ensureCsrf } from '../account/auth/ensureCsrf.js';
import { Keys } from '../../utils/Keys.js';

export const useGetList = (username, title_slug) => {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { API_KEY } = Keys.API1;

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

        // Fetch TMDB data for each item
        if (listData.items && listData.items.length) {
          const itemsWithTmdb = await Promise.all(
            listData.items.map(async (item) => {
              if (!item.tmdb_id) return { ...item, tmdb: null };
              try {
                const tmdbRes = await fetch(
                  `https://api.themoviedb.org/3/movie/${item.tmdb_id}?api_key=${API_KEY}`
                );
                if (!tmdbRes.ok) return { ...item, tmdb: null };
                const contentType = tmdbRes.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                  return { ...item, tmdb: null };
                }
                const tmdbData = await tmdbRes.json();
                return { ...item, tmdb: tmdbData };
              } catch {
                return { ...item, tmdb: null };
              }
            })
          );
          listData.items = itemsWithTmdb;
        } else {
          listData.items = [];
        }

        // Set state
        setList(listData);
      } catch (err) {
        console.error('Fetch single list error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getList();
  }, [username, title_slug, API_KEY]);

  return { list, loading, error };
};
