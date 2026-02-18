import { useState, useContext } from 'react';
import { AuthContext } from '../account/auth/AuthContext';
import authApiClient from '../account/auth/authApiClient';

export function useToggleLikeList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  const toggleLike = async (listId) => {
    setIsLoading(true);
    setError(null);

    const previousLikedListIds = user?.likedListIds || [];

    const isCurrentlyLiked = previousLikedListIds.includes(listId);
    const updatedLikedListIds = isCurrentlyLiked
      ? previousLikedListIds.filter((id) => id !== listId)
      : [...previousLikedListIds, listId];

    setUser((prevUser) => ({
      ...prevUser,
      likedListIds: updatedLikedListIds,
    }));

    try {
      if (!user) {
        throw new Error('You must be logged in to like lists');
      }

      const response = await authApiClient.post(`/lists/toggle_like/${listId}/`);

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setUser((prevUser) => ({
        ...prevUser,
        likedListIds: previousLikedListIds,
      }));

      setIsLoading(false);

      const errorMessage =
        err.response?.data?.error || err.message || 'Failed to toggle like';

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { toggleLike, isLoading, error };
}