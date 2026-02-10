import { useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext'; // updated import
import { ensureCsrf } from '../account/auth/ensureCsrf';

export const useCreateList = () => {
  const { setUser } = useContext(AuthContext);

  const createList = async (newList) => {
    if (!newList?.title) return null;

    console.log('list to create', newList);

    const tempId = `temp-${Date.now()}`;
    const optimisticList = {
      ...newList,
      id: tempId,
      items: newList.items || [],
      item_count: newList.items?.length || 0,
    };

    // Optimistic UI update: add temporary list immediately
    setUser((prev) => ({
      ...prev,
      lists: [optimisticList, ...(prev.lists || [])],
    }));

    try {
      const csrfToken = await ensureCsrf();

      const res = await fetch('http://127.0.0.1:8000/lists/create_list/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify(newList),
      });

      if (!res.ok) throw new Error('Failed to create list');
      const data = await res.json();

      // Replace temp list with server response, keeping items
      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((l) =>
          l.id === tempId
            ? { ...data, items: data.items || newList.items || [] }
            : l
        ),
      }));

      return data;
    } catch (err) {
      console.error('CreateList error:', err);

      // Rollback optimistic list
      setUser((prev) => ({
        ...prev,
        lists: prev.lists.filter((l) => l.id !== tempId),
      }));

      return null;
    }
  };

  return createList;
};
