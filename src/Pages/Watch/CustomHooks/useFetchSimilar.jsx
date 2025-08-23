import { Keys } from '../../../Components/Keys.js'
import { useState, useEffect } from 'react';

export default function useFetchSimilar({ id, mediaType }) {
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { API1 } = Keys;
  const { Url, API_KEY } = API1;




  useEffect(() => {
    if (!id || !mediaType) return;

    setIsLoading(true);
    fetch(`${Url}${mediaType}/${id}/similar?api_key=${API_KEY}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setContent(data.results || []);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching similar data:', err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [id, mediaType, Url, API_KEY]);

  return { content, error, isLoading };
}

