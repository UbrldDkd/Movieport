import { useEffect, useMemo } from 'react';
import { Keys } from '../../utils/Keys';

export function useFetchListsItems(user, setUser) {
  // Memoize all list items to avoid effect running on unrelated user changes
  const listItems = useMemo(() => {
    return user?.lists?.flatMap((l) => l.items || []) || [];
  }, [user?.lists]);

  useEffect(() => {
    if (!listItems.length) return;

    // Filter items missing tmdb data
    const itemsToFetch = listItems.filter((item) => !item.tmdb);
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

        // Merge back into user.lists
        setUser((prevUser) => ({
          ...prevUser,
          lists: prevUser.lists.map((list) => ({
            ...list,
            items: list.items.map((item) => {
              const updated = updatedItems.find(
                (u) => u.tmdb_id === item.tmdb_id
              );
              return updated || item;
            }),
          })),
        }));
      } catch (err) {
        console.error('Failed to fetch TMDB data for list items:', err);
      }
    };

    fetchTMDB();
  }, [listItems, setUser]);
}
