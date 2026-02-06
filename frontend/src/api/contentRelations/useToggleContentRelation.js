import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../account/auth/AuthContext';
import { ensureCsrf } from '../account/auth/ensureCsrf';

export function useToggleContentRelation() {
  const { user, setUser } = useContext(AuthContext);

  async function toggleField(item, field) {
    if (!item || !field) return `failed to toggle ${field}`;

    const current = user?.contentRelations?.find(
      (cr) => cr.tmdb_id === item.tmdb_id
    );
    const prevValue = current ? current[field] : false;
    const newValue = !prevValue;

    // Optimistic UI
    setUser((prev) => {
      const relations = prev.contentRelations || [];
      const exists = relations.find((r) => r.tmdb_id === item.tmdb_id);

      if (exists) {
        return {
          ...prev,
          contentRelations: relations.map((cr) =>
            cr.tmdb_id === item.tmdb_id ? { ...cr, [field]: newValue } : cr
          ),
        };
      } else {
        return {
          ...prev,
          contentRelations: [...relations, { ...item, [field]: newValue }],
        };
      }
    });

    try {
      const csrfToken = await ensureCsrf();

      const response = await axios.post(
        'http://127.0.0.1:8000/content_relations/toggle/',
        { item, field },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      const updated = response.data;

      // Reconcile with backend
      setUser((prev) => ({
        ...prev,
        contentRelations: prev.contentRelations.map((cr) =>
          cr.tmdb_id === item.tmdb_id ? { ...cr, ...updated } : cr
        ),
      }));

      return 'success';
    } catch (err) {
      console.error('Failed to toggle content relation:', err);

      // Rollback
      setUser((prev) => ({
        ...prev,
        contentRelations: prev.contentRelations.map((cr) =>
          cr.tmdb_id === item.tmdb_id ? { ...cr, [field]: prevValue } : cr
        ),
      }));

      return 'failed';
    }
  }

  return toggleField;
}
