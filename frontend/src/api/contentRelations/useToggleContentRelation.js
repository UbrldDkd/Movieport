import { useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

export function useToggleContentRelation() {
  const { user, setUser } = useContext(AuthContext);

  async function toggleField(item, field) {
    if (!item || !field) return `failed to toggle ${field}`;

    const current = user?.content_relations?.find(
      (cr) => cr.tmdb_id === item.tmdb_id
    );
    const prevValue = current ? current[field] : false;
    const newValue = !prevValue;

    setUser((prev) => {
      const relations = prev.content_relations || [];
      const exists = relations.find((r) => r.tmdb_id === item.tmdb_id);

      if (exists) {
        return {
          ...prev,
          content_relations: relations.map((cr) =>
            cr.tmdb_id === item.tmdb_id ? { ...cr, [field]: newValue } : cr
          ),
        };
      } else {
        return {
          ...prev,
          content_relations: [...relations, { ...item, [field]: newValue }],
        };
      }
    });

    try {
      const response = await authApiClient.post('/content_relations/toggle/', { item, field });

      const updated = response.data;

      setUser((prev) => ({
        ...prev,
        content_relations: prev.content_relations.map((cr) =>
          cr.tmdb_id === item.tmdb_id ? { ...cr, ...updated } : cr
        ),
      }));

      return 'success';
    } catch (err) {
      console.error('Failed to toggle content relation:', err);

      setUser((prev) => ({
        ...prev,
        content_relations: prev.content_relations.map((cr) =>
          cr.tmdb_id === item.tmdb_id ? { ...cr, [field]: prevValue } : cr
        ),
      }));

      return 'failed';
    }
  }

  return toggleField;
}