// src/hooks/useToggleListLike.js

// Standard library imports
import { useState, useContext } from 'react';

// Third-party imports
import axios from 'axios';

// Local application imports
import { AuthContext } from '../account/auth/AuthContext.js';
import { ensureCsrf } from '../account/auth/ensureCsrf.js';

/**
 * Custom hook to toggle like status for a list
 * Updates AuthContext with optimistic updates
 * @returns {Object} { toggleLike, isLoading, error }
 */
export function useToggleLikeList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  /**
   * Toggle like status for a specific list
   * @param {number|string} listId - The ID of the list to toggle like
   * @returns {Promise<Object>} { liked, likes_count } - The updated like status and count
   */
  const toggleLike = async (listId) => {
    setIsLoading(true);
    setError(null);

    // Store previous state for rollback
    const previousLikedListIds = user?.likedListIds || [];

    // Optimistically update context
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

      // Ensure CSRF token is available
      const csrfToken = await ensureCsrf();

      const response = await axios.post(
        `http://127.0.0.1:8000/lists/toggle_like/${listId}/`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
        }
      );

      setIsLoading(false);
      return response.data; // { liked: boolean, likes_count: number }
    } catch (err) {
      // Rollback on error
      setUser((prevUser) => ({
        ...prevUser,
        likedListIds: previousLikedListIds,
      }));

      setIsLoading(false);

      // Handle specific error responses from backend
      const errorMessage =
        err.response?.data?.error || err.message || 'Failed to toggle like';

      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return { toggleLike, isLoading, error };
}
