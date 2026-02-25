import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/constants/Keys';

export default function useFetchOscarTitles() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = Keys.API1.API_KEY;
  const Url = Keys.API1.Url;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOscarTitles() {
      setIsLoading(true);
      setError(null);

      try {
        // Step 1: Get the "oscar" keyword ID
        const keywordRes = await fetch(
          `${Url}/search/keyword?api_key=${API_KEY}&query=oscar`,
          { signal: controller.signal }
        );
        if (!keywordRes.ok) throw new Error('Failed to fetch Oscar keyword ID');

        const keywordData = await keywordRes.json();
        if (!keywordData.results || !keywordData.results.length) {
          throw new Error('Oscar keyword not found');
        }

        const oscarKeywordId = keywordData.results[0].id;

        // Step 2: Fetch movies with this keyword
        const moviesRes = await fetch(
          `${Url}/discover/movie?api_key=${API_KEY}&with_keywords=${oscarKeywordId}&sort_by=popularity.desc`,
          { signal: controller.signal }
        );
        if (!moviesRes.ok) throw new Error('Failed to fetch Oscar movies');

        const moviesData = await moviesRes.json();
        console.log(moviesData);
        setContent(moviesData.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOscarTitles();

    return () => controller.abort();
  }, [API_KEY, Url]);

  return { content, isLoading, error };
}
