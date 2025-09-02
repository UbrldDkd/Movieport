import { useEffect, useState } from 'react';
import { Keys } from '../../../Components/Keys.js';

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
            fetch(`${Url}search/tv?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + i}`)
          );
          fetchPromises.push(
            fetch(`${Url}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + i}`)
          );
        }

        const responses = await Promise.all(fetchPromises);

        for (const res of responses) {
          if (!res.ok) throw new Error('Search results could not be loaded');
        }

        const resultsData = await Promise.all(responses.map(res => res.json()));

        // Flatten, remove duplicates, filter invalid entries, and sort by popularity
        const allContent = resultsData
          .flatMap(data => data.results)
          .filter((item, index, arr) => index === arr.findIndex(t => t.id === item.id))
          .filter(item =>
            (item[details.poster] && item[details.title]) || (item[details.titleTv] && item[details.id])
          )
          .sort((a, b) => b[details.popularity] - a[details.popularity])
          .slice(0, contentPerPage)
          .filter(item => {
            const title = item[details.title] || item[details.titleTv];
            return title && title.toLowerCase().startsWith(value.toLowerCase());
          });

        setContent(allContent);

        // Calculate total pages based on TMDb results
        if (currentPage === 1 && resultsData[0]?.total_results) {
          const totalUserPages = Math.ceil(resultsData[0].total_results / contentPerPage);
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
