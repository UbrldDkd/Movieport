import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/Keys.js';

export function useFetchRelated({ collectionId, currentId }) {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { API1 } = Keys;
  const { Url, API_KEY } = API1;

  useEffect(() => {
    if (!collectionId || !currentId) return;

    const fetchRelated = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${Url}collection/${collectionId}?api_key=${API_KEY}&language=en-US`
        );

        if (!res.ok) throw new Error('Failed to fetch collection');

        const data = await res.json();

        const filteredResults = (data.parts || [])
          .filter((item) => item.id !== Number(currentId))
          .slice(0, 5);

        setContent(filteredResults);
      } catch (err) {
        console.error('useFetchRelated error:', err);
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelated();
  }, [collectionId, currentId, Url, API_KEY]);

  return { content, error, isLoading };
}
