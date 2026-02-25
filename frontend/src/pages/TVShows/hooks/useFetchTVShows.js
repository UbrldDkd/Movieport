import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/constants/Keys.js';

export function useFetchTVShows() {
  const [content, setContent] = useState({
    popular: [],
    airingToday: [],
    topRated: [],
    onTheAir: [],
    discover: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const { API1 } = Keys;
        const { Url, API_KEY, topics } = API1;

        const [
          popularRes,
          airingTodayRes,
          topRatedRes,
          onTheAirRes,
          discoverRes,
        ] = await Promise.all([
          fetch(`${Url}${topics.tv.popular}${API_KEY}`),
          fetch(`${Url}${topics.tv.airingToday}${API_KEY}`),
          fetch(`${Url}${topics.tv.topRated}${API_KEY}`),
          fetch(`${Url}${topics.tv.onTheAir}${API_KEY}`),
          fetch(`${Url}${topics.tv.discover}${API_KEY}`),
        ]);

        const responses = [
          popularRes,
          airingTodayRes,
          topRatedRes,
          onTheAirRes,
          discoverRes,
        ];
        for (const res of responses) {
          if (!res.ok)
            throw new Error(`Request failed: ${res.url} (${res.status})`);
        }

        const [
          popularData,
          airingTodayData,
          topRatedData,
          onTheAirData,
          discoverData,
        ] = await Promise.all(responses.map((res) => res.json()));

        setContent({
          popular: popularData.results,
          airingToday: airingTodayData.results,
          topRated: topRatedData.results,
          onTheAir: onTheAirData.results,
          discover: discoverData.results,
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch TV shows');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { content, isLoading, error };
}
