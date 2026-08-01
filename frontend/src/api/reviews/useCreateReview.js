import { useState, useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

export function useCreateReview() {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReview = async ({ item, review, rating, watched_status }) => {
    if (!user) {
      setError('You must be logged in to write a review.');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authApiClient.post('/reviews/create_review/', {
        item,
        review,
        rating,
        watched_status,
      });

      const savedReview = response.data;

      setUser((prevUser) => {
        const relations = prevUser.content_relations || [];
        const existingRelation = relations.find(
          (cr) => cr.tmdb_id === item.tmdb_id
        );

        const updatedRelation = existingRelation
          ? {
              ...existingRelation,
              rating,
              watched: true,
            }
          : {
              ...item,
              rating,
              watched: true,
            };

        return {
          ...prevUser,
          content_relations: existingRelation
            ? relations.map((cr) =>
                cr.tmdb_id === item.tmdb_id ? updatedRelation : cr
              )
            : [...relations, updatedRelation],
        };
      });

      setIsLoading(false);
      return savedReview;
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || 'Failed to save review.'
      );
      setIsLoading(false);
      return null;
    }
  };

  return { createReview, isLoading, error };
}
