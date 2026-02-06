import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/Keys.js';

export function useFetchSimilar({ id, mediaType }) {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { API1 } = Keys;
  const { Url, API_KEY } = API1;

  useEffect(() => {
    if (!id || !mediaType) return;

    const fetchSimilar = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // TMDB similar endpoint
        const res = await fetch(
          `${Url}${mediaType}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
        );
        if (!res.ok) throw new Error(`Failed to fetch similar ${mediaType}`);

        const data = await res.json();

        // Filter out the current item just in case
        const filteredResults = (data.results || []).filter(
          (item) => item.id !== Number(id)
        );

        setContent(filteredResults);
      } catch (err) {
        console.error('useFetchSimilar error:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilar();
  }, [id, mediaType, Url, API_KEY]);

  return { content, error, isLoading };
}
