import { useContext } from 'react';

import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

export const useAddItems = () => {
  const { user, setUser } = useContext(AuthContext);

  const addItems = async ({ listId, items }) => {
    if (!user) return;

    const itemsArray = Array.isArray(items) ? items : [items];
    const contentRelations = user.contentRelations || [];

    const optimisticItems = itemsArray.map((item) => {
      const existing = contentRelations.find(
        (cr) => cr.tmdb_id === item.tmdb_id
      );
      return (
        existing || {
          ...item,
          optimistic: true,
        }
      );
    });

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
      const res = await authApiClient.post('/lists/add_items/', {
        list: listId,
        items: items,
      });

      const addedItems = res.data;

      setUser((prev) => ({
        ...prev,
        content_relations: [
          ...prev.content_relations,
          ...addedItems.filter(
            (newItem) =>
              !prev.content_relations.some(
                (cr) => cr.tmdb_id === newItem.tmdb_id
              )
          ),
        ],
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