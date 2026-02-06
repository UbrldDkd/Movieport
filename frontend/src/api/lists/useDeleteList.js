import { useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext'; // assuming user context is here
import { ensureCsrf } from '../account/auth/ensureCsrf';

export const useDeleteList = () => {
  const { setUser } = useContext(AuthContext);

  const deleteList = async (listId) => {
    try {
      const csrfToken = await ensureCsrf();

      const res = await fetch(
        `http://127.0.0.1:8000/lists/${listId}/delete_list/`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to delete list');
      }

      // remove from user's lists
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
