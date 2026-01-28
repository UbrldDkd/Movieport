// Standard library
import { useContext } from 'react';

// Third-party
import axios from 'axios';

// Local application
import { AuthContext } from '../account/auth/AuthContext';
import { ensureCsrf } from '../account/auth/ensureCsrf';

/**
 * Custom hook to add items to a list
 * @returns {Function} addItems - Function to add items to a list
 */
export const useAddItems = () => {
  const { user, setUser } = useContext(AuthContext);

  /**
   * Add items to a list
   * @param {Object} params - Parameters
   * @param {number} params.listId - The list ID
   * @param {number|Array<number>} params.tmdb_id - Single or array of TMDB IDs
   * @returns {Promise<Array>} Array of added content relations
   */
  const addItems = async ({ listId, tmdb_id }) => {
    if (!user) return;

    const ids = Array.isArray(tmdb_id) ? tmdb_id : [tmdb_id];
    const relations = user.relations || [];

    // Build optimistic items if they don't exist in relations
    const optimisticItems = ids.map((id) => {
      const existing = relations.find((cr) => cr.tmdb_id === id);
      return existing
        ? existing
        : {
            tmdb_id: id,
            likes: false,
            watched: false,
            watchlisted: false,
            user: null,
            optimistic: true, // mark for rollback
          };
    });

    // Optimistically add items to the list in user context
    setUser((prev) => ({
      ...prev,
      lists: prev.lists.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: [...list.items, ...optimisticItems],
              item_count: list.item_count + optimisticItems.length,
            }
          : list
      ),
    }));

    try {
      const csrfToken = await ensureCsrf();

      const response = await axios.post(
        'http://127.0.0.1:8000/lists/add_items/',
        { tmdb_id: ids, list: listId },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      const relationsData = response.data; // backend returns updated items

      // Replace optimistic items with real backend items
      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) => {
                  const updated = relationsData.find(
                    (r) => r.tmdb_id === item.tmdb_id
                  );
                  return updated ? updated : item;
                }),
              }
            : list
        ),
      }));

      return relationsData;
    } catch (err) {
      console.error('Failed to add items:', err);

      // Rollback optimistic items
      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.filter(
                  (item) => !item.optimistic || !ids.includes(item.tmdb_id)
                ),
                item_count: list.item_count - optimisticItems.length,
              }
            : list
        ),
      }));

      throw err;
    }
  };

  return addItems;
};
