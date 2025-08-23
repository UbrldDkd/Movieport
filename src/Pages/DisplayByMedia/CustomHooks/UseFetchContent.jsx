import { useState, useEffect } from 'react';
import { Keys } from '../../../Components/Keys';

export function useFetchContent({ mediaType, genreIds, matchType, currentPage, ContentPerPage }) {
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
        
        //calculates what pages to fetch from the API, depending on how many are needed to display on one web page
        const startPage = (currentPage - 1) * 4 + 1;
        const fetchPromises = [];

        for (let i = 0; i < 2; i++) {
          const queryType = matchType === 'or' ? '&with_any_genres=' : '&with_genres=';//checks for type of filtering(any, and)
          const genreQuery = genreIds.length > 0 ? `${queryType}${genreIds.join(',')}` : '';//checks for genres and adds it to query if positive
          
          const fullUrl = `${Url}discover/${mediaType}?api_key=${API_KEY}&page=${startPage + i}${genreQuery}`;
         
          fetchPromises.push(fetch(fullUrl));
        }
        
        const responses = await Promise.all(fetchPromises);

        for (const res of responses) {
          if (!res.ok) {
            throw new Error('Content could not be loaded');
          }
        }

        const resData = await Promise.all(responses.map(res => res.json()));
        
        //merged data from multiple tmdb pages
        const allContent = resData
          .flatMap(data => data.results)
          .filter((item, index, fullArr) => index === fullArr.findIndex(t => t.id === item.id))
          .filter(item =>
            (item[details.poster] && item[details.title]) || (item[details.titleTv] && item[details.id])
          )
          .slice(0, ContentPerPage);
        
        //sets results from recent
        const sortedResults = allContent.sort((a, b) => {
          const dateA = new Date(a[details.releaseDate] || a[details.releaseDateTv]);
          const dateB = new Date(b[details.releaseDate] || b[details.releaseDateTv]);
          return dateB - dateA;
        });

        console.log(genreIds)

        setContent(sortedResults);
        
        //get total pages from tmdb depending on how much content is required for display on one web page
        if (currentPage === 1) {
          const totalResults = resData[0].total_results;
          const totalUserPages = Math.ceil(totalResults / ContentPerPage);
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
  }, [mediaType, genreIds, matchType, currentPage, ContentPerPage]);

  return { content, isLoading, error, totalPages };
}
