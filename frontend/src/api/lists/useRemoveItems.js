import { useContext } from 'react';
import axios from 'axios';
import { ensureCsrf } from '../account/auth/ensureCsrf';
import { AuthContext } from '../account/auth/AuthContext';

export const useRemoveItems = () => {
  const { setUser } = useContext(AuthContext);

  const removeItems = async ({ listId, tmdbIds }) => {
    const ids = Array.isArray(tmdbIds) ? tmdbIds : [tmdbIds];
    if (!listId || !ids.length) return null;

    let previousItems = [];

    // Optimistic removal: update state before API call
    setUser((prev) => ({
      ...prev,
      lists: prev.lists.map((list) => {
        if (list.id !== listId) return list;

        previousItems = list.items; // save for rollback
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

      const data = await axios.post(
        'http://127.0.0.1:8000/lists/remove_items/',
        { list: listId, tmdb_ids: ids },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      // Update context
      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                // remove items whose tmdb_id is in the ids array
                items: list.items.filter((item) => !ids.includes(item.tmdb_id)),
                item_count: list.items.length - ids.length,
              }
            : list
        ),
      }));

      return data;
    } catch (err) {
      console.error('RemoveItems error:', err);

      // Rollback to previous state
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
