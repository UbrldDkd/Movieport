import { Keys } from '../../../utils/Keys.js';
import { useState, useEffect } from 'react';

export function useFetchSimilar({ id, mediaType }) {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { API1 } = Keys;
  const { Url, API_KEY } = API1;

  useEffect(() => {
    // Fetch similar movies or TV shows
    const fetchSimilar = async () => {
      try {
        if (!id || !mediaType) return;

        setIsLoading(true);

        const simRes = await fetch(
          `${Url}${mediaType}/${id}/similar?api_key=${API_KEY}&with_original_language=en`
        );

        if (!simRes.ok) throw new Error(`HTTP error! Status: ${simRes.status}`);

        const simData = await simRes.json();

        // Update state with fetched data
        setContent(simData.results || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching similar data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilar();
  }, [id, mediaType, Url, API_KEY]);

  // Return data, error status, and loading state
  return { content, error, isLoading };
}
