import { useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

export const useDeleteList = () => {
  const { setUser } = useContext(AuthContext);

  const deleteList = async (listId) => {
    try {
      await authApiClient.delete(`/lists/${listId}/delete_list/`);

      setUser((prev) => ({
        ...prev,
        lists: prev.lists.filter((list) => list.id !== listId),
      }));
    } catch (err) {
      console.error('Delete list error:', err);
      throw err;
    }
  };

  return deleteList;
};