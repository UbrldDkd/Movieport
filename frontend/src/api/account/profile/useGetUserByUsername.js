import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/Keys';

const { API_KEY } = Keys.API1;

async function fetchTmdbById(tmdbId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error('TMDB fetch failed');
  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('TMDB response is not JSON');
  }
  return res.json();
}

async function enrichItemWithTmdb(item) {
  if (!item.tmdb_id) return item;

  try {
    const tmdb = await fetchTmdbById(item.tmdb_id);
    return { ...item, tmdb };
  } catch {
    return { ...item, tmdb: null };
  }
}

export function useGetUserByUsername(username) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!username) return;

    const getUser = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/accounts/get_user/${username}/`
        );
        if (!res.ok) throw new Error('User not found');

        const data = await res.json();

        // enrich content_relations
        const contentRelations = await Promise.all(
          (data.content_relations || []).map(enrichItemWithTmdb)
        );

        // enrich lists -> items
        const lists = await Promise.all(
          (data.lists || []).map(async (list) => {
            const items = await Promise.all(
              (list.items || []).map(enrichItemWithTmdb)
            );
            return { ...list, items };
          })
        );

        setUser({
          ...data,
          content_relations: contentRelations,
          lists,
        });
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, [username]);

  return user;
}