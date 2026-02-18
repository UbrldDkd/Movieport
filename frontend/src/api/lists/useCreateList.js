import { useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

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

    setUser((prev) => ({
      ...prev,
      lists: [optimisticList, ...(prev.lists || [])],
    }));

    try {
      const res = await authApiClient.post('/lists/create_list/', newList);

      if (!res.data) throw new Error('Failed to create list');
      const data = res.data;

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

      setUser((prev) => ({
        ...prev,
        lists: prev.lists.filter((l) => l.id !== tempId),
      }));

      return null;
    }
  };

  return createList;
};