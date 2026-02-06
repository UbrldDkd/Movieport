import { Keys } from '../../../utils/Keys.js';
import { useState, useEffect } from 'react';

export function useFetchContentDetails({
  id,
  mediaType,
  setTrailerOpen,
  selectedSeason,
}) {
  const [content, setContent] = useState(null);
  const [seasonContent, setSeasonContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mediaType || !id) return;

    const { API1, API2 } = Keys;
    const { details: details1, Url: Url1, API_KEY: API_KEY1 } = API1;
    const { Url: Url2, API_KEY: API_KEY2 } = API2;

    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setTrailerOpen(false);

        // Fetch base TMDb data
        const tmdbRes = await fetch(
          `${Url1}${mediaType}/${id}?api_key=${API_KEY1}&language=en-US&append_to_response=alternative_titles,release_dates`
        );

        if (!tmdbRes.ok) {
          if (tmdbRes.status === 404) {
            throw new Error(
              `${mediaType === 'movie' ? 'Movie' : 'TV show'} not found`
            );
          }
          throw new Error(`Failed to load content (${tmdbRes.status})`);
        }

        const tmdbContentType = tmdbRes.headers.get('content-type');
        if (!tmdbContentType || !tmdbContentType.includes('application/json')) {
          throw new Error('Invalid response format from TMDB');
        }
        const tmdbData = await tmdbRes.json();

        // Fetch credits
        const creditsRes = await fetch(
          `${Url1}${mediaType}/${id}/credits?api_key=${API_KEY1}&language=en-US`
        );

        const creditsData = creditsRes.ok
          ? (function () {
              const creditsContentType = creditsRes.headers.get('content-type');
              if (
                !creditsContentType ||
                !creditsContentType.includes('application/json')
              ) {
                return { cast: [], crew: [] };
              }
              return creditsRes.json();
            })()
          : { cast: [], crew: [] };

        const fullTmdb = {
          ...tmdbData,
          credits: creditsData,
        };

        // Fetch OMDb data if imdb_id exists
        let omdbData = null;
        if (tmdbData[details1.imdbId]) {
          try {
            const omdbRes = await fetch(
              `${Url2}${tmdbData[details1.imdbId]}&apikey=${API_KEY2}&plot=full`
            );
            if (omdbRes.ok) {
              const omdbContentType = omdbRes.headers.get('content-type');
              if (
                omdbContentType &&
                omdbContentType.includes('application/json')
              ) {
                omdbData = await omdbRes.json();
              }
            }
          } catch (omdbErr) {
            console.warn('OMDb fetch failed:', omdbErr);
          }
        }

        // Store main content
        setContent({
          tmdb: fullTmdb,
          omdb: omdbData,
          title:
            mediaType === 'movie'
              ? tmdbData[details1.movieTitle]
              : tmdbData[details1.tvTitle],
        });

        // If TV show and season selected, fetch season data
        if (mediaType === 'tv' && selectedSeason) {
          try {
            const seasonRes = await fetch(
              `${Url1}tv/${id}/season/${selectedSeason}?api_key=${API_KEY1}`
            );
            if (seasonRes.ok) {
              const seasonContentType = seasonRes.headers.get('content-type');
              if (
                seasonContentType &&
                seasonContentType.includes('application/json')
              ) {
                const seasonData = await seasonRes.json();
                setSeasonContent(seasonData);
              } else {
                setSeasonContent(null);
              }
            } else {
              setSeasonContent(null);
            }
          } catch (seasonErr) {
            console.warn('Season fetch failed:', seasonErr);
            setSeasonContent(null);
          }
        } else {
          setSeasonContent(null);
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error('Content fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id, mediaType, selectedSeason, setTrailerOpen]);

  return { content, seasonContent, isLoading, error };
}
