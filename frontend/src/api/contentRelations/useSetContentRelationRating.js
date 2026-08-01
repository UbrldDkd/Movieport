import { useState, useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

export function useSetContentRelationRating() {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const setRating = async (item, rating) => {
    if (!item || typeof rating !== 'number') {
      return 'failed';
    }

    if (rating < 0 || rating > 5 || (rating !== 0 && rating < 0.5)) {
      return 'failed';
    }

    if (!user) {
      return 'failed';
    }

    const currentRelations = user.content_relations || [];
    const existingRelation = currentRelations.find(
      (cr) => cr.tmdb_id === item.tmdb_id
    );

    if (rating === 0 && !existingRelation) {
      return 'success';
    }

    const normalizedRating = rating === 0 ? 0 : rating;
    const previousRelation = existingRelation ? { ...existingRelation } : null;

    setUser((prevUser) => {
      const relations = prevUser?.content_relations || [];
      const updatedRelations = relations.some(
        (cr) => cr.tmdb_id === item.tmdb_id
      )
        ? relations.map((cr) =>
            cr.tmdb_id === item.tmdb_id
              ? { ...cr, rating: normalizedRating }
              : cr
          )
        : [...relations, { ...item, rating: normalizedRating }];

      return {
        ...prevUser,
        content_relations: updatedRelations,
      };
    });

    setIsLoading(true);
    setError(null);

    try {
      const response = await authApiClient.post(
        '/content_relations/set_rating/',
        {
          tmdb_id: item.tmdb_id,
          rating: normalizedRating,
          title: item.title,
          poster_path: item.poster_path,
          release_date: item.release_date,
          media_type: item.media_type,
        }
      );

      const updatedRating = response.data?.rating ?? null;

      setUser((prevUser) => ({
        ...prevUser,
        content_relations: (prevUser.content_relations || []).map((cr) =>
          cr.tmdb_id === item.tmdb_id ? { ...cr, rating: updatedRating } : cr
        ),
      }));

      setIsLoading(false);
      return 'success';
    } catch (err) {
      console.error('Failed to save content relation rating:', err);
      setError(
        err.response?.data?.error || err.message || 'Failed to save rating'
      );
      setIsLoading(false);

      setUser((prevUser) => {
        const relations = prevUser?.content_relations || [];

        if (!previousRelation) {
          return {
            ...prevUser,
            content_relations: relations.filter(
              (cr) => cr.tmdb_id !== item.tmdb_id
            ),
          };
        }

        return {
          ...prevUser,
          content_relations: relations.map((cr) =>
            cr.tmdb_id === item.tmdb_id ? previousRelation : cr
          ),
        };
      });

      return 'failed';
    }
  };

  return { setRating, isLoading, error };
}
