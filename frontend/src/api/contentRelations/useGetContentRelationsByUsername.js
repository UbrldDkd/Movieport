import { useState, useEffect } from 'react';
import { Keys } from '../../utils/Keys';

export function useGetContentRelationsByUsername(username) {
  const [contentRelations, setContentRelations] = useState([]);

  const { API_KEY } = Keys.API1;

  useEffect(() => {
    if (!username) return;

    const getContentRelations = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/content_relations/by_username/${username}/`
        );
        if (!res.ok) throw new Error('Could not fetch content relations');
        const data = await res.json();

        // Fetch TMDB details for each relation
        const relationsWithTMDB = await Promise.all(
          data.map(async (relation) => {
            if (!relation.tmdb_id) return relation;
            try {
              const tmdbRes = await fetch(
                `https://api.themoviedb.org/3/movie/${relation.tmdb_id}?api_key=${API_KEY}`
              );
              if (!tmdbRes.ok) throw new Error('TMDB fetch failed');
              const tmdbData = await tmdbRes.json();
              return { ...relation, tmdb: tmdbData };
            } catch {
              return { ...relation, tmdb: null };
            }
          })
        );

        setContentRelations(relationsWithTMDB);
        console.log('cr', relationsWithTMDB);
      } catch (err) {
        console.log(err);
      }
    };

getContentRelations();
  }, [username, API_KEY]);

  return contentRelations;
}
