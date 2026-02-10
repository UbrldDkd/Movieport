import { useEffect, useState } from 'react';
import { Keys } from '../../../utils/constants/Keys.js';

export function useFetchSearch({ value, currentPage, contentPerPage }) {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!value) return;

    const fetchSearch = async () => {
      try {
        const { API1 } = Keys;
        const { details, Url, API_KEY } = API1;

        setIsLoading(true);
        setError(null);

        const startPage = (currentPage - 1) * 2 + 1; // fetch 2 pages (TV + Movie)
        const fetchPromises = [];
        const searchTerm = encodeURIComponent(value);

        for (let i = 0; i < 2; i++) {
          fetchPromises.push(
            fetch(
              `${Url}search/tv?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + i}`
            )
          );
          fetchPromises.push(
            fetch(
              `${Url}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + i}`
            )
          );
        }

        const responses = await Promise.all(fetchPromises);
        for (const res of responses) {
          if (!res.ok) throw new Error('Search results could not be loaded');
        }

        const resultsData = await Promise.all(
          responses.map((res) => res.json())
        );

        // Flatten, remove duplicates, filter invalid entries
        let allContent = resultsData
          .flatMap((data) => data.results)
          .filter(
            (item, index, arr) =>
              index === arr.findIndex((t) => t.id === item.id)
          )
          .filter(
            (item) =>
              (item[details.movieTitle] || item[details.tvTitle]) &&
              (item[details.id] || item[details.id])
          );

        // Boost exact matches first
        allContent.sort((a, b) => {
          const titleA = (
            a[details.movieTitle] ||
            a[details.tvTitle] ||
            ''
          ).toLowerCase();
          const titleB = (
            b[details.movieTitle] ||
            b[details.tvTitle] ||
            ''
          ).toLowerCase();
          const searchLower = value.toLowerCase();

          if (titleA === searchLower) return -1;
          if (titleB === searchLower) return 1;

          // If neither exact match, fallback to popularity
          return (
            (b[details.popularity] || b[details.popularity] || 0) -
            (a[details.popularity] || a[details.popularity] || 0)
          );
        });

        // Slice to current page limit
        allContent = allContent.slice(0, contentPerPage);

        setContent(allContent);

        // Calculate total pages based on first response's total_results
        if (currentPage === 1 && resultsData[0]?.total_results) {
          const totalUserPages = Math.ceil(
            resultsData[0].total_results / contentPerPage
          );
          setTotalPages(totalUserPages);
        }
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError(err);
        setContent([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearch();
  }, [value, currentPage, contentPerPage]);

  return { content, isLoading, error, totalPages };
}
