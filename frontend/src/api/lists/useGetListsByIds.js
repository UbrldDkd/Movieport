import { useEffect, useState } from 'react';
import { Keys } from '../../utils/constants/Keys';
import publicApiClient from '../publicApiClient';

export function useGetListsByIds(likedListIds) {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!likedListIds?.length) {
      setLists([]);
      return;
    }

    const fetchLists = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await publicApiClient.post('/lists/lists_by_ids/', { list_ids: likedListIds });

        if (!res.data) {
          throw new Error(`Failed to fetch lists`);
        }

        const listsData = res.data;

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

              const contentType = tmdbRes.headers.get('content-type');
              if (!contentType?.includes('application/json')) {
                item.tmdb = null;
                continue;
              }

              item.tmdb = await tmdbRes.json();
            } catch {
              item.tmdb = null;
            }
          }
        }

        setLists(listsData);
      } catch (err) {
        console.error(err);
        setError(err);
        setLists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLists();
  }, [likedListIds]);

  return { lists, isLoading, error };
}