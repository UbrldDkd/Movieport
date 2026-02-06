import { Keys } from '../../../utils/Keys.js';
import { useState, useEffect } from 'react';

export function useFetchSimilar({
  id,
  mediaType,
  currentPage,
  contentPerPage,
}) {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { API1 } = Keys;
  const { details, Url, API_KEY } = API1;

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        if (!id || !mediaType) return;

        // Validate media type
        const validMediaTypes = ['movie', 'tv'];
        if (!validMediaTypes.includes(mediaType)) {
          setError(new Error(`Invalid media type: ${mediaType}`));
          setContent([]);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);

        // Fetch 4 pages at a time for better content coverage
        const startPage = (currentPage - 1) * 4 + 1;
        const fetchPromises = Array.from({ length: 4 }, (_, i) =>
          fetch(
            `${Url}${mediaType}/${id}/similar?api_key=${API_KEY}&page=${startPage + i}`
          )
        );

        const responses = await Promise.all(fetchPromises);

        // Check all responses
        for (let res of responses) {
          if (!res.ok) throw new Error('Similar data not available');
        }

        const resData = await Promise.all(responses.map((res) => res.json()));

        // Combine and filter recommended content
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
          .slice(0, contentPerPage);

        // Calculate total pages based on TMDb total results
        if (currentPage === 1 && resData[0]?.total_results) {
          const totalUserPages = Math.ceil(
            resData[0].total_results / contentPerPage
          );
          setTotalPages(totalUserPages);
        }

        setContent(allContent);
      } catch (err) {
        console.error('Error fetching similar content:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilar();
  }, [id, mediaType, currentPage, contentPerPage, details, Url, API_KEY]);

  return { content, error, isLoading, totalPages };
}
