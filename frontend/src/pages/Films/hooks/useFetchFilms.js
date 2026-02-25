import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/constants/Keys.js';

export function useFetchFilms() {
  const [films, setFilms] = useState({
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: [],
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
        console.log(topics);

        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;

        const [
          popularRes,
          nowPlayingRes,
          topRatedRes,
          upcomingCurrentYearRes,
          upcomingNextYearRes,
          discoverRes,
        ] = await Promise.all([
          fetch(`${Url}${topics.films.popular}${API_KEY}`),
          fetch(`${Url}${topics.films.nowPlaying}${API_KEY}`),
          fetch(`${Url}${topics.films.topRated}${API_KEY}`),
          fetch(
            `${Url}${topics.films.upcoming}${API_KEY}&primary_release_year=${currentYear}&sort_by=popularity.desc`
          ),
          fetch(
            `${Url}${topics.films.upcoming}${API_KEY}&primary_release_year=${nextYear}&sort_by=popularity.desc`
          ),
          fetch(`${Url}${topics.films.discover}${API_KEY}`),
        ]);

        const responses = [
          popularRes,
          nowPlayingRes,
          topRatedRes,
          upcomingCurrentYearRes,
          upcomingNextYearRes,
          discoverRes,
        ];
        for (const res of responses) {
          if (!res.ok)
            throw new Error(`Request failed: ${res.url} (${res.status})`);
        }

        const [
          popularData,
          nowPlayingData,
          topRatedData,
          upcomingCurrentYearData,
          upcomingNextYearData,
          discoverData,
        ] = await Promise.all(responses.map((res) => res.json()));

        const currentDate = new Date().toISOString().split('T')[0];
        const filteredUpcoming = [
          ...upcomingCurrentYearData.results,
          ...upcomingNextYearData.results,
        ]
          .filter(
            (movie) => movie.release_date && movie.release_date > currentDate
          )
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20);

        setFilms({
          popular: popularData.results,
          nowPlaying: nowPlayingData.results,
          topRated: topRatedData.results,
          upcoming: filteredUpcoming,
          discover: discoverData.results,
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch films');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { content: films, isLoading, error };
}
