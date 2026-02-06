import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/Keys.js';

export function useFetchEpisode({ id, seasonNumber, episodeNumber }) {
  const [episode, setEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { API1 } = Keys;
  const { Url, API_KEY } = API1;

  useEffect(() => {
    // Exit early if any required parameter is missing
    if (!id || !seasonNumber || !episodeNumber) return;

    // Fetch data for a specific TV episode
    const fetchEpisode = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `${Url}tv/${id}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${API_KEY}&language=en-US`
        );

        if (!response.ok) throw new Error(`TMDb API error: ${response.status}`);

        const episodeData = await response.json();

        setEpisode(episodeData);
      } catch (err) {
        setError(err);
        setEpisode(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisode();
  }, [id, seasonNumber, episodeNumber, API_KEY, Url]);

  // Return the fetched episode object
  return { episode, isLoading, error };
}
