import { useEffect, useState } from 'react'
import { Keys } from '../../../Components/Keys.js'

export function useFetchSearch({ value, currentPage, ContentPerPage }) {
    const [ isLoading, setIsLoading ] = useState();
    const [ error, setError ] = useState();
    const [ totalPages, setTotalPages ] = useState();
    const [ content, setContent ] = useState([]);

    useEffect(() => {
        const fetchSearch = async () => {
            
            try{
                const { API1 } = Keys;
                const { details, Url, API_KEY } = API1
                
                
                setIsLoading(true);
                
                const startPage = (currentPage - 1) * 4 + 1;
                const fetchPromises = [];
                
                //for each page get movies and tv-shows(40-40 each)
            for(let i= 0; i < 2; i++ ){
            const searchTerm = encodeURIComponent(value);
            console.log(value)
           

            fetchPromises.push(fetch(`${Url}search/tv?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + i}`))
            fetchPromises.push(fetch(`${Url}search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${startPage + i}`))
          
            }
           
            const searchRes = await Promise.all(fetchPromises)
            
            for (const res of searchRes ) {
            if(!res.ok) throw new Error('Search results could not be loaded')
            }

            const searchData = await Promise.all(searchRes.map((res) => res.json()))
           
            //combine all data and filter out duplicates
           const allContent = searchData
          .flatMap(data => data.results)
          .filter((item, index, fullArr) => index === fullArr.findIndex(t => t.id === item.id))
          .filter(item =>
            (item[details.poster] && item[details.title]) || (item[details.titleTv] && item[details.id])
          )
          .slice(0, ContentPerPage);

            const sortedResults = allContent.sort((a, b) => {
          const dateA = new Date(a[details.releaseDate] || a[details.releaseDateTv]);
          const dateB = new Date(b[details.releaseDate] || b[details.releaseDateTv]);
          return dateB - dateA;
        })
        
        setContent(sortedResults)

        if (currentPage === 1) {
          const totalResults = searchData[0].total_results;
          const totalUserPages = Math.ceil(totalResults / ContentPerPage);
          setTotalPages(totalUserPages);
        }

        }
        catch(err) {
            setError(err)
            setContent([])
        }
        finally {
            setIsLoading(false)
        }
    }
    fetchSearch()
    },[ value, currentPage, ContentPerPage])

    return { content, isLoading, error, totalPages }
    
}