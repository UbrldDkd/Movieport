import { useEffect, useState } from 'react';
import apiClient from '../../../../api/publicApiClient';

export function useSearchLists({ value, pageNumber, itemsPerPage }) {
  const [lists, setLists] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) {
      setLists([]);
      setTotalPages(1);
      setTotalResults(0);
      return;
    }

    const fetchLists = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.get(`/lists/search_by_title`, {
          params: {
            query: value,
            page: pageNumber,
            per_page: itemsPerPage,
          },
        });

        const data = response.data;

        setLists(data.results || []);
        setTotalPages(data.total_pages || 1);
        setTotalResults(data.total_results || 0);
      } catch (err) {
        console.error('Error fetching lists by title:', err);
        setError(err);
        setLists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLists();
  }, [value, pageNumber, itemsPerPage]);

  return {
    lists,
    totalPages,
    totalResults,
    isLoading,
    error,
  };
}
