import { Keys } from '../../../utils/constants/Keys.js';
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

    const mediaTypePath = mediaType === 'film' ? 'movie' : 'tv';

    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setTrailerOpen(false);

        // Fetch base TMDb data with aggregate_credits for TV
        const tmdbRes = await fetch(
          `${Url1}${mediaTypePath}/${id}?api_key=${API_KEY1}&language=en-US&append_to_response=alternative_titles,release_dates${mediaType === 'tv' ? ',aggregate_credits' : ''}`
        );

        if (!tmdbRes.ok) {
          if (tmdbRes.status === 404) {
            throw new Error(
              `${mediaTypePath === 'film' ? 'Movie' : 'TV show'} not found`
            );
          }
          throw new Error(`Failed to load content (${tmdbRes.status})`);
        }

        const tmdbContentType = tmdbRes.headers.get('content-type');
        if (!tmdbContentType || !tmdbContentType.includes('application/json')) {
          throw new Error('Invalid response format from TMDB');
        }
        const tmdbData = await tmdbRes.json();

        // Fetch credits for movies (for TV, aggregate_credits is already in tmdbData)
        const creditsData =
          mediaType === 'film'
            ? await (async () => {
                const creditsRes = await fetch(
                  `${Url1}${mediaTypePath}/${id}/credits?api_key=${API_KEY1}&language=en-US`
                );
                if (creditsRes.ok) {
                  const creditsContentType =
                    creditsRes.headers.get('content-type');
                  if (
                    creditsContentType &&
                    creditsContentType.includes('application/json')
                  ) {
                    return await creditsRes.json();
                  }
                }
                return { cast: [], crew: [] };
              })()
            : tmdbData.aggregate_credits || { cast: [], crew: [] };

        const fullTmdb = {
          ...tmdbData,
          credits: creditsData,
          aggregate_credits: mediaType === 'tv' ? creditsData : undefined,
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
          }
        }

        // Store main content
        setContent({
          tmdb: fullTmdb,
          omdb: omdbData,
          title:
            mediaType === 'film'
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
            setSeasonContent(null);
          }
        } else {
          setSeasonContent(null);
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id, mediaType, selectedSeason, setTrailerOpen]);

  return { content, seasonContent, isLoading, error };
}
