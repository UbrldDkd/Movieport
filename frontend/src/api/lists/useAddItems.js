// Standard library
import { useContext } from 'react';

// Third-party
import axios from 'axios';

// Local application
import { AuthContext } from '../account/auth/AuthContext';
import { ensureCsrf } from '../account/auth/ensureCsrf';

export const useAddItems = () => {
  const { user, setUser } = useContext(AuthContext);

  const addItems = async ({ listId, items }) => {
    if (!user) return;

    // Ensure items is always an array for consistent processing
    const itemsArray = Array.isArray(items) ? items : [items];
    const contentRelations = user.contentRelations || [];

    // Build optimistic items - use existing relations if available, otherwise use the item data
    const optimisticItems = itemsArray.map((item) => {
      const existing = contentRelations.find(
        (cr) => cr.tmdb_id === item.tmdb_id
      );
      return (
        existing || {
          ...item,
          optimistic: true, // Mark as optimistic for rollback
        }
      );
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

      const res = await axios.post(
        'http://127.0.0.1:8000/lists/add_items/',
        {
          list: listId,
          items: items, // Send items as-is (single object or array)
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      const addedItems = res.data; // Backend returns the added ContentRelations

      // Update user context with real backend data
      setUser((prev) => ({
        ...prev,
        // Update content_relations with new items
        content_relations: [
          ...prev.content_relations,
          ...addedItems.filter(
            (newItem) =>
              !prev.content_relations.some(
                (cr) => cr.tmdb_id === newItem.tmdb_id
              )
          ),
        ],
        // Replace optimistic items with real backend items in the list
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) => {
                  const updated = addedItems.find(
                    (backendItem) => backendItem.tmdb_id === item.tmdb_id
                  );
                  return updated || item;
                }),
              }
            : list
        ),
      }));

      return addedItems;
    } catch (err) {
      console.error('Failed to add items:', err);

      // Rollback optimistic items
      const tmdbIds = itemsArray.map((item) => item.tmdb_id);

      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.filter(
                  (item) => !tmdbIds.includes(item.tmdb_id) || !item.optimistic
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
