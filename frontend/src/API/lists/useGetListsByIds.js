import { useEffect, useState } from 'react';
import { Keys } from '../../utils/Keys';
import { ensureCsrf } from '../account/auth/ensureCsrf';

export function useGetListsByIds(likedListIds) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    if (!likedListIds?.length) return;

    const fetchLists = async () => {
      try {
        const csrfToken = await ensureCsrf();

        // Fetch lists from backend
        const res = await fetch('http://127.0.0.1:8000/lists/lists_by_ids/', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify({ list_ids: likedListIds }),
        });

        if (!res.ok) throw new Error(`Failed to fetch lists: ${res.status}`);
        const listsData = await res.json();

        // Fetch TMDB data for each item
        for (const list of listsData) {
          if (!list.items?.length) continue;

          for (const item of list.items) {
            if (!item.tmdb_id) {
              item.tmdb = null;
              continue;
            }

            try {
              const tmdbRes = await fetch(
                `https://api.themoviedb.org/3/movie/${item.tmdb_id}?api_key=${Keys.API1.API_KEY}`
              );
              if (!tmdbRes.ok) {
                item.tmdb = null;
                continue;
              }
              const tmdbData = await tmdbRes.json();
              item.tmdb = tmdbData;
            } catch {
              item.tmdb = null;
            }
          }
        }

        setLists(listsData);
      } catch (err) {
        console.error('Failed to fetch lists or TMDB data:', err);
      }
    };

    fetchLists();
  }, [likedListIds?.join(',')]);

  return lists;
}
