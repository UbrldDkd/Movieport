// useUpdateList.js
import { useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext'; // updated import
import { ensureCsrf } from '../account/auth/ensureCsrf';

export const useUpdateList = () => {
  const { user, setUser } = useContext(AuthContext);

  const updateList = async (draft) => {
    if (!draft?.id) return null;

    const { id, ...fields } = draft;
    if (Object.keys(fields).length === 0) return null;

    const csrfToken = await ensureCsrf();

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/lists/${id}/update_list/`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          body: JSON.stringify(fields),
        }
      );

      if (!res.ok) throw new Error('Failed to update list');

      const data = await res.json();
      console.log('List updated:', data);

      // Sync updated list into user context
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
