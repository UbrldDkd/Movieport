import { useState, useEffect } from 'react';
import { Keys } from '../../../../utils/Keys';

export function useFetchPreview(value) {
  const [previewContent, setPreviewContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof value !== 'string' || !value.trim()) {
      setPreviewContent([]);
      return;
    }

    const controller = new AbortController();
    const { API1 } = Keys;
    const { Url, API_KEY, details } = API1;

    const debounceTimeout = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [movieRes, tvRes] = await Promise.all([
          fetch(
            `${Url}search/movie?api_key=${API_KEY}&query=${encodeURIComponent(value)}`,
            {
              signal: controller.signal,
            }
          ),
          fetch(
            `${Url}search/tv?api_key=${API_KEY}&query=${encodeURIComponent(value)}`,
            {
              signal: controller.signal,
            }
          ),
        ]);

        if (!movieRes.ok || !tvRes.ok)
          throw new Error('Failed to fetch search results');

        const [movieData, tvData] = await Promise.all([
          movieRes.json(),
          tvRes.json(),
        ]);

        const merged = [...movieData.results, ...tvData.results]
          .filter(
            (item, index, arr) =>
              arr.findIndex((t) => t.id === item.id) === index
          )
          .sort((a, b) => b[details.popularity] - a[details.popularity])
          .filter(
            (item) =>
              item.poster_path &&
              (item[details.movieTitle] || item[details.tvTitle])
          )
          .filter((item) => {
            const title = item[details.movieTitle] || item[details.tvTitle];
            return title && title.toLowerCase().startsWith(value.toLowerCase());
          });

        setPreviewContent(merged);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(debounceTimeout);
      controller.abort();
    };
  }, [value]);

  return { previewContent, isLoading, error };
}
