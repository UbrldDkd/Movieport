// hooks/useFetchContent.js
import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/constants/Keys.js';
import { buildDiscoverUrl } from '../helpers/buildDiscoverUrl.js';

const PAGES_PER_BATCH = 4;

export function useFetchContent({
  mediaType,
  filters = {},
  contentPerPage = 18,
}) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  console.log('FETCH FILTERS:', filters);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchContent() {
      const validMediaTypes = ['movie', 'tv'];

      if (!validMediaTypes.includes(mediaType)) {
        setError(new Error(`Invalid media type: ${mediaType}`));
        setContent([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { API1 } = Keys;
        const { details } = API1;

        const currentPage = filters.page ?? 1;

        const startPage = (currentPage - 1) * PAGES_PER_BATCH + 1;

        const fetchUrls = [];

        for (let i = 0; i < PAGES_PER_BATCH; i++) {
          const url = buildDiscoverUrl({
            mediaType,
            filters: {
              ...filters,
              page: startPage + i,
            },
          });

          fetchUrls.push(url);
          console.log(`Fetching page ${startPage + i} from URL:`, url);
        }

        console.log('TMDB REQUEST URLS:', fetchUrls);

        const responses = await Promise.all(
          fetchUrls.map((url) =>
            fetch(url, {
              signal: controller.signal,
            })
          )
        );

        for (const response of responses) {
          if (!response.ok) {
            throw new Error('Content could not be loaded');
          }
        }

        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        if (data.length) {
          setTotalResults(data[0].total_results || 0);
          setTotalPages(
            Math.ceil((data[0].total_results || 0) / contentPerPage)
          );
        }

        const allContent = data
          .flatMap((page) => page.results || [])
          .filter(
            (item, index, array) =>
              index === array.findIndex((t) => t.id === item.id)
          )
          .filter(
            (item) =>
              (item[details.poster] && item[details.movieTitle]) ||
              (item[details.poster] && item[details.tvTitle])
          )
          .sort((a, b) => {
            const popA = a[details.popularity] || 0;
            const popB = b[details.popularity] || 0;

            if (popB !== popA) {
              return popB - popA;
            }

            const dateA = new Date(
              a[details.movieReleaseDate] || a[details.tvReleaseDate] || 0
            );

            const dateB = new Date(
              b[details.movieReleaseDate] || b[details.tvReleaseDate] || 0
            );

            return dateB - dateA;
          })
          .slice(0, contentPerPage);

        setContent(allContent);
      } catch (err) {
        if (err.name === 'AbortError') return;

        setError(err);
        setContent([]);
        setTotalResults(0);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContent();

    return () => controller.abort();
  }, [mediaType, contentPerPage, JSON.stringify(filters)]);

  return {
    content,
    isLoading,
    error,
    totalPages,
    totalResults,
  };
}
