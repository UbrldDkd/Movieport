import { Keys } from '../../../Components/Keys.js';
import { useState, useEffect } from 'react';

export function useFetchContent({ id, mediaType, setTrailerOpen, selectedSeason }) {
  const [content, setContent] = useState(null);
  const [seasonContent, setSeasonContent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debugging: log whenever content or seasonContent changes
  useEffect(() => {
    if (content) {
      console.log('Updated content in state:', content);
    }
  }, [content, seasonContent]);

  useEffect(() => {
    // Exit early if required parameters are missing
    if (!mediaType || !id) return;

    const { API1, API2 } = Keys;
    const { details: details1, Url: Url1, API_KEY: API_KEY1 } = API1;
    const { Url: Url2, API_KEY: API_KEY2 } = API2;

    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setTrailerOpen(false);

        // 🔹 Fetch base TMDb data (movie or TV show)
        const tmdbRes = await fetch(`${Url1}${mediaType}/${id}?api_key=${API_KEY1}&language=en-US`);
        if (!tmdbRes.ok) throw new Error('Content could not be loaded');
        const tmdbData = await tmdbRes.json();

        // 🔹 Fetch credits (cast & crew) for full details
        const creditsRes = await fetch(`${Url1}${mediaType}/${id}/credits?api_key=${API_KEY1}&language=en-US`);
        if (!creditsRes.ok) throw new Error('Credits could not be loaded');
        const creditsData = await creditsRes.json();

        const fullTmdb = {
          ...tmdbData,
          credits: creditsData,
        };

        // 🔹 Fetch OMDb data if imdb_id exists (mostly for movies)
        let omdbData = null;
        if (tmdbData.imdb_id) {
          const omdbRes = await fetch(`${Url2}${tmdbData[details1.imdb_id]}&apikey=${API_KEY2}&plot=full`);
          if (omdbRes.ok) omdbData = await omdbRes.json();
        }

        // Store main content (movie or full TV show info)
        setContent({
          tmdb: fullTmdb,
          omdb: omdbData,
          title: mediaType === 'movie' ? tmdbData[details1.title] : tmdbData[details1.titleTv],
        });

        // 🔹 If it's a TV show and a season is selected, fetch that season
        if (mediaType === 'tv') {
          const seasonRes = await fetch(`${Url1}tv/${id}/season/${selectedSeason}?api_key=${API_KEY1}`);
          if (!seasonRes.ok) throw new Error('Season could not be loaded');

          const seasonData = await seasonRes.json();
          setSeasonContent(seasonData);

          console.log('url', `${Url1}tv/${id}/season/${selectedSeason}?api_key=${API_KEY1}`);
        } else {
          setSeasonContent(null); // reset if not TV
        }

      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();

  }, [id, mediaType, selectedSeason]); // refetch when id, mediaType, or season changes

  return { content, seasonContent, isLoading, error };
}
