import { useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

export const useUpdateList = () => {
  const { user, setUser } = useContext(AuthContext);

  const updateList = async (draft) => {
    if (!draft?.id) return null;

    const { id, ...fields } = draft;
    if (Object.keys(fields).length === 0) return null;

    try {
      const res = await authApiClient.patch(`/lists/${id}/update_list/`, fields);

      if (!res.data) throw new Error('Failed to update list');
      const data = res.data;
      console.log('List updated:', data);

      setUser((prev) => ({
        ...prev,
        lists: prev.lists.map((l) => (l.id === data.id ? data : l)),
      }));
      console.log(
        'updated list',
        user?.lists.find((l) => l.id === data.id)
      );

      return data;
    } catch (err) {
      console.error('UpdateList error:', err);
      return null;
    }
  };

  return updateList;
};