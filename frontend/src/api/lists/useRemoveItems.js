import { useContext } from 'react';
import authApiClient from '../account/auth/authApiClient';
import { AuthContext } from '../account/auth/AuthContext';

export const useRemoveItems = () => {
  const { setUser } = useContext(AuthContext);

  const removeItems = async ({ listId, tmdbIds }) => {
    const ids = Array.isArray(tmdbIds) ? tmdbIds : [tmdbIds];
    if (!listId || !ids.length) return null;

    let previousItems = [];

    setUser((prev) => ({
      ...prev,
      lists: prev.lists.map((list) => {
        if (list.id !== listId) return list;

        previousItems = list.items;
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
      const res = await authApiClient.post('/lists/remove_items/', { list: listId, tmdb_ids: ids });

      const data = res.data;

      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.filter((item) => !ids.includes(item.tmdb_id)),
                item_count: list.items.length - ids.length,
              }
            : list
        ),
      }));

      return data;
    } catch (err) {
      console.error('RemoveItems error:', err);

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