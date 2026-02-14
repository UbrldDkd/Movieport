import { useState, useEffect } from 'react';
import { Keys } from '../../../utils/constants/Keys.js';

export function useFetchContent({
  mediaType,
  genreIds,
  matchType,
  currentPage,
  contentPerPage,
  selectedYears,
  selectedCountries,
}) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { API1 } = Keys;
        const { details, Url, API_KEY } = API1;

        setIsLoading(true);
        setError(null);

        const validMediaTypes = ['movie', 'tv'];
        if (!validMediaTypes.includes(mediaType)) {
          setError(new Error(`Invalid media type: ${mediaType}`));
          setContent([]);
          setIsLoading(false);
          return;
        }

        const today = new Date().toISOString().split('T')[0];
        const startPage = (currentPage - 1) * 4 + 1;
        const fetchPromises = [];

        // Optional query params
        const yearQuery =
          selectedYears.length > 0
            ? `&primary_release_year=${selectedYears.join(',')}`
            : '';

        const noExtraFilters =
          genreIds.length === 0 &&
          selectedYears.length === 0 &&
          selectedCountries.length === 0;

        const languageQuery =
          selectedCountries.length === 0 ? `&with_original_language=en` : '';

        // Hybrid sorting: newest first, then popularity if no extra filters
        let sortQuery = '';
        if (mediaType) {
          if (mediaType === 'movie') {
            sortQuery = noExtraFilters
              ? `&sort_by=primary_release_date.desc,popularity.desc&primary_release_date.lte=${today}`
              : `&sort_by=primary_release_date.desc&primary_release_date.lte=${today}`;
          } else {
            sortQuery = noExtraFilters
              ? `&sort_by=${details.tvReleaseDate}.desc,popularity.desc&${details.tvReleaseDate}.lte=${today}`
              : `&sort_by=${details.tvReleaseDate}.desc&${details.tvReleaseDate}.lte=${today}`;
          }
        }

        const countryList =
          selectedCountries.length > 0 ? selectedCountries : [null];

        // Construct all API URLs based on pages, genres, countries, and match type
        for (let i = 0; i < 4; i++) {
          for (const country of countryList) {
            if (matchType?.toLowerCase() === 'any' && genreIds.length > 0) {
              // If "any" match, fetch each genre individually
              for (const genreId of genreIds) {
                const fullUrl = `${Url}discover/${mediaType}?api_key=${API_KEY}&page=${startPage + i}&with_genres=${genreId}${yearQuery}${country ? `&with_origin_country=${country}` : ''}${languageQuery}${sortQuery}`;
                fetchPromises.push(fetch(fullUrl));
              }
            } else {
              // If "all" match, combine genres into a single query
              const genreQuery =
                genreIds.length > 0 ? `&with_genres=${genreIds.join(',')}` : '';
              const fullUrl = `${Url}discover/${mediaType}?api_key=${API_KEY}&page=${startPage + i}${genreQuery}${yearQuery}${country ? `&with_origin_country=${country}` : ''}${sortQuery}`;
              fetchPromises.push(fetch(fullUrl));
            }
          }
        }

        // Fetch all pages simultaneously
        const responses = await Promise.all(fetchPromises);
        for (const res of responses) {
          if (!res.ok) throw new Error('Content could not be loaded');
        }

        const resData = await Promise.all(responses.map((res) => res.json()));

        // Combine results, remove duplicates, filter incomplete entries, and sort
        const allContent = resData
          .flatMap((data) => data.results)
          .filter(
            (item, index, arr) =>
              index === arr.findIndex((t) => t.id === item.id)
          )
          .filter(
            (item) =>
              (item[details.poster] && item[details.movieTitle]) ||
              (item[details.tvTitle] && item[details.id])
          )
          .sort((a, b) => {
            // Sort by popularity first, then by release date if popularity is equal
            const popA = a[details.popularity] || 0;
            const popB = b[details.popularity] || 0;
            if (popB !== popA) return popB - popA;

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

        // Compute total pages for pagination on first page
        if (currentPage === 1) {
          const totalResults = resData[0].total_results;
          const totalUserPages = Math.ceil(totalResults / contentPerPage);
          setTotalPages(totalUserPages);
        }
      } catch (err) {
        setError(err);
        setContent([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [
    mediaType,
    genreIds,
    matchType,
    currentPage,
    contentPerPage,
    selectedYears,
    selectedCountries,
  ]);

  return { content, isLoading, error, totalPages };
}
