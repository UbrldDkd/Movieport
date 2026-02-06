import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/Keys.js';

// Module-level cache to persist between renders and route changes

export function useFetchMainContent() {
  const [movies, setMovies] = useState({
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: [],
    discover: [],
  });
  const [tvShows, setTvShows] = useState({ popular: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const { API1 } = Keys;
        const { Url, API_KEY, topics } = API1;

        // Fetch all categories in parallel
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;

        const [
          popularMovieRes,
          nowPlayingMovieRes,
          topRatedMovieRes,
          upcomingCurrentYearRes,
          upcomingNextYearRes,
          popularTvShowsRes,
          discoverMoviesRes,
        ] = await Promise.all([
          fetch(`${Url}${topics.movies.popular}${API_KEY}`),
          fetch(`${Url}${topics.movies.nowPlaying}${API_KEY}`),
          fetch(`${Url}${topics.movies.topRated}${API_KEY}`),
          fetch(
            `${Url}${topics.movies.upcoming}${API_KEY}&primary_release_year=${currentYear}&sort_by=popularity.desc`
          ),
          fetch(
            `${Url}${topics.movies.upcoming}${API_KEY}&primary_release_year=${nextYear}&sort_by=popularity.desc`
          ),
          fetch(`${Url}${topics.tv.popular}${API_KEY}`),
          fetch(`${Url}${topics.movies.discover}${API_KEY}`),
        ]);

        const responses = [
          popularMovieRes,
          nowPlayingMovieRes,
          topRatedMovieRes,
          upcomingCurrentYearRes,
          upcomingNextYearRes,
          popularTvShowsRes,
          discoverMoviesRes,
        ];
        if (responses.some((res) => !res.ok)) {
          throw new Error('Failed to load one or more movie categories');
        }

        const [
          popularMovieData,
          nowPlayingMovieData,
          topRatedMovieData,
          upcomingCurrentYearData,
          upcomingNextYearData,
          popularTvShowsData,
          discoverMoviesData,
        ] = await Promise.all(
          responses.map((res) => {
            const contentType = res.headers.get('content-type');
            if (!contentType || !contentType.startsWith('application/json')) {
              throw new Error('Invalid response format from TMDB');
            }
            return res.json();
          })
        );

        // Combine and filter upcoming movies to only show future releases
        const currentDate = new Date().toISOString().split('T')[0];
        const allUpcomingMovies = [
          ...upcomingCurrentYearData.results,
          ...upcomingNextYearData.results,
        ];

        const filteredUpcoming = allUpcomingMovies
          .filter(
            (movie) => movie.release_date && movie.release_date > currentDate
          )
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 20); // Limit to top 20 most popular upcoming movies

        const moviesData = {
          popular: popularMovieData.results,
          nowPlaying: nowPlayingMovieData.results,
          topRated: topRatedMovieData.results,
          upcoming: filteredUpcoming,
          discover: discoverMoviesData.results,
        };
        const tvData = { popular: popularTvShowsData.results };

        setMovies(moviesData);
        setTvShows(tvData);
      } catch (err) {
        setError(err.message || 'Failed to fetch content');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    fetchData();
  }, []);

  return { movies, tvShows, error, isLoading };
}
