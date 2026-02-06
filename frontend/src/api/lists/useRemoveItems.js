import { useContext } from 'react';
import { ensureCsrf } from '../account/auth/ensureCsrf';
import { AuthContext } from '../account/auth/AuthContext'; // user context

export const useRemoveItems = () => {
  const { setUser } = useContext(AuthContext);

  const removeItems = async ({ listId, tmdb_id }) => {
    const ids = Array.isArray(tmdb_id) ? tmdb_id : [tmdb_id];
    if (!listId || !ids.length) return null;

    let previousItems = [];

    // Optimistic removal
    setUser((prev) => ({
      ...prev,
      lists: prev.lists.map((list) => {
        if (list.id !== listId) return list;
        previousItems = list.items; // save previous items for rollback
        const updatedItems = list.items.filter(
          (item) => !ids.includes(item.tmdb_id)
        );
        return {
          ...list,
          items: updatedItems,
          item_count: list.item_count - ids.length,
        };
      }),
    }));

    try {
      const csrfToken = await ensureCsrf();

      const res = await fetch('http://127.0.0.1:8000/lists/remove_items/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ list: listId, tmdb_id: ids }),
      });

      if (!res.ok) throw new Error(`Failed to remove items: ${res.status}`);

      const data = await res.json();

      // Merge backend response if needed
      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) => {
                  const backendItem = data.find(
                    (d) => Number(d.tmdb_id) === Number(item.tmdb_id)
                  );
                  return backendItem ? backendItem : item;
                }),
              }
            : list
        ),
      }));

      return data;
    } catch (err) {
      console.error('RemoveItems error:', err);

      // Rollback
      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: previousItems,
                item_count: previousItems.length,
              }
            : list
        ),
      }));

      return null;
    }
  };

  return removeItems;
};
