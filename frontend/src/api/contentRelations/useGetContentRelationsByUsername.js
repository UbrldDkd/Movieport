import { useState, useEffect } from 'react';
import { Keys } from '../../utils/constants/Keys';
import publicApiClient from '../publicApiClient';

export function useGetContentRelationsByUsername(username) {
  const [contentRelations, setContentRelations] = useState([]);

  const { API_KEY } = Keys.API1;

  useEffect(() => {
    if (!username) return;

    const getContentRelations = async () => {
      try {
        const res = await publicApiClient.get(`/content_relations/by_username/${username}/`);
        if (!res.data) throw new Error('Could not fetch content relations');
        const data = res.data;

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
      } catch (err) {
      }
    };

    getContentRelations();
  }, [username, API_KEY]);

  return contentRelations;
}