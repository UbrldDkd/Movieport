import { useEffect, useMemo } from 'react';
import { Keys } from '../../utils/Keys';

export function useFetchContentRelations(user, setUser) {
  // Memoize content_relations to avoid unnecessary effect runs
  const contentRelations = useMemo(
    () => user?.contentRelations || [],
    [user?.contentRelations]
  );

  useEffect(() => {
    if (!contentRelations.length) return;

    // Only fetch items missing tmdb data
    const itemsToFetch = contentRelations.filter((r) => !r.tmdb);
    if (!itemsToFetch.length) return;

    const fetchTMDB = async () => {
      try {
        const updatedItems = await Promise.all(
          itemsToFetch.map(async (item) => {
            const res = await fetch(
              `${Keys.API1.Url}movie/${item.tmdb_id}?api_key=${Keys.API1.API_KEY}`
            );
            const data = await res.json();
            return { ...item, tmdb: data };
          })
        );

        // Update user context with new tmdb data
        setUser((prev) => ({
          ...prev,
          contentRelations: prev.contentRelations.map((r) => {
            const updated = updatedItems.find((u) => u.tmdb_id === r.tmdb_id);
            return updated || r;
          }),
        }));
      } catch (err) {
        console.error('Failed to fetch TMDB data for content relations:', err);
      }
    };

    fetchTMDB();
  }, [contentRelations, setUser]);
}
