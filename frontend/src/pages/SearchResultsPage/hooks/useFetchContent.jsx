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
          throw new Error(`Invalid media type: ${mediaType}`);
        }

        const today = new Date().toISOString().split('T')[0];
        const startPage = (currentPage - 1) * 4 + 1;
        const fetchPromises = [];
        const urls = [];

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

        let sortQuery = '';
        if (mediaType === 'movie') {
          sortQuery = noExtraFilters
            ? `&sort_by=primary_release_date.desc,popularity.desc&primary_release_date.lte=${today}`
            : `&sort_by=primary_release_date.desc&primary_release_date.lte=${today}`;
        } else {
          sortQuery = noExtraFilters
            ? `&sort_by=${details.tvReleaseDate}.desc,popularity.desc&${details.tvReleaseDate}.lte=${today}`
            : `&sort_by=${details.tvReleaseDate}.desc&${details.tvReleaseDate}.lte=${today}`;
        }

        const countryList =
          selectedCountries.length > 0 ? selectedCountries : [null];

        for (let i = 0; i < 4; i++) {
          for (const country of countryList) {
            if (matchType?.toLowerCase() === 'any' && genreIds.length > 0) {
              for (const genreId of genreIds) {
                const fullUrl = `${Url}discover/${mediaType}?api_key=${API_KEY}&page=${startPage + i}&with_genres=${genreId}${yearQuery}${country ? `&with_origin_country=${country}` : ''}${languageQuery}${sortQuery}`;

                urls.push(fullUrl);
                fetchPromises.push(fetch(fullUrl));
              }
            } else {
              const genreQuery =
                genreIds.length > 0 ? `&with_genres=${genreIds.join(',')}` : '';

              const fullUrl = `${Url}discover/${mediaType}?api_key=${API_KEY}&page=${startPage + i}${genreQuery}${yearQuery}${country ? `&with_origin_country=${country}` : ''}${sortQuery}`;

              urls.push(fullUrl);
              fetchPromises.push(fetch(fullUrl));
            }
          }
        }

        const responses = await Promise.all(fetchPromises);

        responses.forEach((res, index) => {
          if (!res.ok) {
            console.error('Request failed:', {
              url: urls[index],
              status: res.status,
              statusText: res.statusText,
            });

            throw new Error(
              `Failed to fetch content (${res.status} ${res.statusText})`
            );
          }
        });

        const resData = await Promise.all(
          responses.map(async (res, index) => {
            const contentType = res.headers.get('content-type');

            if (!contentType?.includes('application/json')) {
              console.error('Invalid response:', {
                url: urls[index],
                contentType,
              });

              throw new Error('Invalid response format from TMDB');
            }

            return res.json();
          })
        );

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

        if (currentPage === 1 && resData.length > 0) {
          const totalResults = resData[0].total_results;
          setTotalPages(Math.ceil(totalResults / contentPerPage));
        }
      } catch (err) {
        console.error('Failed to fetch content:', err);

        if (err instanceof Error) {
          console.error('Error message:', err.message);
          console.error('Stack:', err.stack);
        }

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
