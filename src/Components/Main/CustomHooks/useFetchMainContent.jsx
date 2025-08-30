import { useState, useEffect } from 'react';
import { Keys } from '../../Keys.js'

// Module-level cache to persist between renders and route changes
const contentCache = {
  movies: null,
  tv: null,
};

export function useFetchMainContent() {
  const [movies, setMovies] = useState({ popular: [], nowPlaying: [], topRated: [], discover: [] });
  const [tvShows, setTvShows] = useState({ popular: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Return cached data immediately if available
      if (contentCache.movies && contentCache.tv) {
        setMovies(contentCache.movies);
        setTvShows(contentCache.tv);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { API1 } = Keys;
        const { Url, API_KEY, topics } = API1;

        // Fetch all categories in parallel
        const [
          popularMovieRes,
          nowPlayingMovieRes,
          topRatedMovieRes,
          popularTvShowsRes,
          discoverMoviesRes
        ] = await Promise.all([
          fetch(`${Url}${topics.movies.popular}${API_KEY}`),
          fetch(`${Url}${topics.movies.nowPlaying}${API_KEY}`),
          fetch(`${Url}${topics.movies.topRated}${API_KEY}`),
          fetch(`${Url}${topics.tv.popular}${API_KEY}`),
          fetch(`${Url}${topics.movies.discover}${API_KEY}`),
        ]);

        const responses = [popularMovieRes, nowPlayingMovieRes, topRatedMovieRes, popularTvShowsRes, discoverMoviesRes];
        if (responses.some(res => !res.ok)) {
          throw new Error('Failed to load one or more movie categories');
        }

        const [
          popularMovieData,
          nowPlayingMovieData,
          topRatedMovieData,
          popularTvShowsData,
          discoverMoviesData
        ] = await Promise.all(responses.map(res => res.json()));

        const moviesData = {
          popular: popularMovieData.results,
          nowPlaying: nowPlayingMovieData.results,
          topRated: topRatedMovieData.results,
          discover: discoverMoviesData.results,
        };
        const tvData = { popular: popularTvShowsData.results };

        // Cache results
        contentCache.movies = moviesData;
        contentCache.tv = tvData;

        setMovies(moviesData);
        setTvShows(tvData);

      } catch (err) {
        setError(err.message || 'Failed to fetch content');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return {movies, tvShows, error, isLoading}
}
