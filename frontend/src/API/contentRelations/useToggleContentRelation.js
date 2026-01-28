// Standard library
import { useContext } from 'react';

// Third-party
import axios from 'axios';

// Local application
import { AuthContext } from '../account/auth/AuthContext';
import { ensureCsrf } from '../account/auth/ensureCsrf';

/**
 * Custom hook to toggle content relation fields (watched, watchlisted, likes)
 * @returns {Function} toggleField - Function to toggle a field for a content item
 */
export function useToggleContentRelation() {
  const { user, setUser } = useContext(AuthContext);

  /**
   * Toggle a field for a content relation
   * @param {number|string} tmdbId - The TMDB ID of the content
   * @param {string} field - The field to toggle (watched, watchlisted, likes)
   * @returns {Promise<string>} 'success' or 'failed'
   */
  async function toggleField(tmdbId, field) {
    if (!tmdbId || !field) return 'failed';

    const tmdbIdNumber = Number(tmdbId);
    const contentRelation = user?.contentRelations?.find(
      (r) => r.tmdb_id === tmdbIdNumber
    );
    const prevValue = contentRelation ? contentRelation[field] : false;
    const newValue = !prevValue;

    // Optimistic UI update
    setUser((prev) => {
      const contentRelations = prev.contentRelations || [];
      const exists = contentRelations.find((r) => r.tmdb_id === tmdbIdNumber);

      if (exists) {
        return {
          ...prev,
          contentRelations: contentRelations.map((r) =>
            r.tmdb_id === tmdbIdNumber ? { ...r, [field]: newValue } : r
          ),
        };
      } else {
        return {
          ...prev,
          contentRelations: [
            ...contentRelations,
            { tmdb_id: tmdbIdNumber, [field]: newValue },
          ],
        };
      }
    });

    try {
      const csrfToken = await ensureCsrf();

      const response = await axios.post(
        'http://127.0.0.1:8000/content_relations/toggle/',
        { tmdb_id: tmdbIdNumber, [field]: newValue },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      const updated = response.data;

      // Reconcile with backend response
      setUser((prev) => ({
        ...prev,
        contentRelations: prev.contentRelations.map((r) =>
          r.tmdb_id === tmdbIdNumber ? { ...r, ...updated } : r
        ),
      }));

      return 'success';
    } catch (error) {
      console.error('Failed to toggle content relation:', error);

      // Rollback on failure
      setUser((prev) => ({
        ...prev,
        contentRelations: prev.contentRelations.map((cr) =>
          cr.tmdb_id === tmdbIdNumber ? { ...cr, [field]: prevValue } : cr
        ),
      }));

      return 'failed';
    }
  }

  return toggleField;
}
