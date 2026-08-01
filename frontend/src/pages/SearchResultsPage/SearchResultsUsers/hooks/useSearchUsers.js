import { useState, useEffect } from 'react';
import apiClient from '../../../../api/publicApiClient';

export function useSearchUsers({ value, usersPerPage = 20, pageNumber = 1 }) {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value || value.trim() === '') {
      setUsers([]);
      setTotalPages(1);
      setTotalResults(0);
      return;
    }

    async function fetchUsers() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await apiClient.get('/accounts/search_users/', {
          params: {
            value,
            usersPerPage,
            pageNumber,
          },
        });

        setUsers(response.data.results || []);
        setTotalPages(response.data.total_pages || 1);
        setTotalResults(response.data.total_results || 0);
        console.log(response.data.results);
      } catch (err) {
        console.error('User search error:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, [value, usersPerPage, pageNumber]);

  return {
    users,
    totalPages,
    totalResults,
    isLoading,
    error,
  };
}
