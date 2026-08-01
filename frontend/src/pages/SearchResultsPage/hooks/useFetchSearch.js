import { useEffect, useState } from 'react';
import { Keys } from '../../../utils/constants/Keys.js';

export function useFetchSearch({ value, type, currentPage, contentPerPage }) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const { API1 } = Keys;
  const { Url, API_KEY, details } = API1;
  const { movieTitle, tvTitle } = details;

  useEffect(() => {
    if (!value) return;

    async function fetchSearch() {
      try {
        setIsLoading(true);
        setError(null);

        const searchTerm = encodeURIComponent(value);

        const endpoints = [];
        const startPage = (currentPage - 1) * 2 + 1;

        const addTv = type === 'tv' || type === 'both';
        const addFilm = type === 'film' || type === 'both';

        if (addTv) {
          endpoints.push(
            `${Url}search/tv?api_key=${API_KEY}&query=${searchTerm}&page=${startPage}`,
            `${Url}search/tv?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + 1}`
          );
        }

        if (addFilm) {
          endpoints.push(
            `${Url}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${startPage}`,
            `${Url}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + 1}`
          );
        }

        const responses = await Promise.all(endpoints.map((url) => fetch(url)));
        const jsonData = await Promise.all(responses.map((r) => r.json()));

        let allResults = jsonData.flatMap((d) => d.results || []);

        allResults = allResults.filter(
          (item, index, arr) => index === arr.findIndex((t) => t.id === item.id)
        );

        // FIXED: media_type always "film" or "tv"
        allResults = allResults.map((item) => {
          const isFilm = item[movieTitle];
          const isTv = item[tvTitle];

          const media_type = isFilm ? 'film' : isTv ? 'tv' : null;

          return {
            ...item,
            media_type,
          };
        });

        // FIXED: use media_type, not mediaType
        const detailedResults = await Promise.all(
          allResults.map(async (item) => {
            if (!item.media_type) return item;

            // FIXED: film → movie endpoint
            const endpointType = item.media_type === 'film' ? 'movie' : 'tv';

            const detailsRes = await fetch(
              `${Url}${endpointType}/${item.id}?api_key=${API_KEY}&append_to_response=alternative_titles,credits`
            );

            const detailsData = await detailsRes.json();

            if (!detailsData || detailsData.status_code) {
              return item;
            }

            if (item.media_type === 'film') {
              return {
                ...item,
                director:
                  detailsData.credits?.crew?.find((p) => p.job === 'Director')
                    ?.name || null,
                alternative_titles:
                  detailsData.alternative_titles?.titles || [],
              };
            }

            if (item.media_type === 'tv') {
              return {
                ...item,
                creator: detailsData.created_by || [],
                seasons: detailsData.number_of_seasons || 0,
                alternative_titles:
                  detailsData.alternative_titles?.results || [],
              };
            }

            return item;
          })
        );

        detailedResults.sort((a, b) => {
          const titleA = (a.title || a.name || '').toLowerCase();
          const titleB = (b.title || b.name || '').toLowerCase();
          const searchLower = value.toLowerCase();

          if (titleA === searchLower) return -1;
          if (titleB === searchLower) return 1;

          return (b.popularity || 0) - (a.popularity || 0);
        });

        const sliced = detailedResults.slice(0, contentPerPage);
        setContent(sliced);

        const firstPageData = jsonData[0];
        if (firstPageData?.total_results) {
          setTotalPages(
            Math.ceil(firstPageData.total_results / contentPerPage)
          );
        }
      } catch (err) {
        console.error('Search error:', err);
        setError(err);
        setContent([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearch();
  }, [value, type, currentPage, contentPerPage]);

  return { content, isLoading, error, totalPages };
}
