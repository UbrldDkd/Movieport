import { useState, useEffect } from 'react';
import { Keys } from '../Components/Keys';
import MovieDisplayBlock from '../Components/Main/MovieDisplays/MovieDisplayBlock.jsx';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react'
import { GenreMap } from '../Components/GenreMap.js'

export default function DisplayByMedia() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
 
  const genreIds = useMemo(() => {
  return searchParams.get('genres')?.split(',').map(Number) || [];
  }, [searchParams]);//gets the genre ids and memo checks if it has changed

  const matchType = searchParams.get('match') || 'and';//gets the match type from the URL, defaults to 'and' if not present

  const location = useLocation();
  const mediaType = location.pathname.split('/')[1];// gets the media type from the URL path

  const ContentPerPage= 72 ;//number of items to display per page, can be changed later
  
//Handles URL changes, updates the fetch requests and prepares data for display
useEffect(() => {

      const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        

        // Validate mediaType
        const validMediaTypes = ['movie', 'tv'];

        if (!validMediaTypes.includes(mediaType)) {
        setError({ message: `Invalid media type: ${mediaType}` });
        setContent([]);
        setIsLoading(false);
        return;
        }
        
        // Calculate the pages to fetch based on the current page
        const startPage = (currentPage - 1) * 4 + 1;
        const fetchPromises = [];
        
        // Fetch 4 pages of content starting from the calculated startPage
        for (let i = 0; i < 4; i++) {
        const queryType = matchType === 'or' ? '&with_any_genres=' : '&with_genres=';// Determine the query type based on matchType
      
        const genreQuery = (genreIds && genreIds.length > 0)// If genreIds are provided, append them to the query
        ? `${queryType}${genreIds.join(',')}`
        : '';

        const url = `${Keys.Url}discover/${mediaType}?api_key=${Keys.API_KEY}&page=${startPage + i}${genreQuery}`;
  
        fetchPromises.push(fetch(url));
        }

        const responses = await Promise.all(fetchPromises)
        
        // Error handling for fetch responses
        for (const res of responses) {
            if (!res.ok) {
                throw new Error('Content could not be loaded');
            }
        }
        
        // Parse all responses and store in resData
        const resData = await Promise.all(responses.map(res => res.json()));
        const allContent = resData.

        flatMap(data => data.results).//combines all 4 pages(20movies each) into one single array
        filter((item, index, fullArr) => index === fullArr.//gets the first occurence of each item by id and removes duplicates
        findIndex((t) => t.id === item.id)).
        filter(item => item[Keys.details.poster] && item[Keys.details.title] || item[Keys.details.titleTv] && item[Keys.details.id]).//checks if poster, title and id are present
        slice(0, ContentPerPage);//limits the content to the first 72 items
        

        //add select by year in filterbox and make this default for all searches
        const sortedResults = allContent.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return dateB - dateA; // Descending (newest first)
        });


        console.log(sortedResults);
        setContent(sortedResults);
        
        // calculate total movies devided by pages of ContentPerPage
        if (currentPage === 1) {
            const totalResults = resData[0].total_results;
            const totalUserPages = Math.ceil(totalResults / ContentPerPage);
            setTotalPages(totalUserPages);

        }

      } catch (err) {
        setError(err.message);
        setContent(null); 

      } finally {
        setIsLoading(false);

      }
    };

    

    

  fetchMovies();
    
  }, [currentPage, mediaType, genreIds, matchType]);
  
  // Reset currentPage when mediaType changes
  useEffect(() => {
    setCurrentPage(1);
  },[mediaType]);

  // Function to handle page changes
  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }
   
   if (isLoading) {
    return (
    <div className="w-full h-[85vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500 border-solid" />
    </div>
    );
   }

   if (error) {
    return (
    <div className="w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg">
      Something went wrong: {error.message || 'Unknown error'}
    </div>
     );
    }

  if(!isLoading && !error) return(

    <div className="bg-zinc-950 min-h-screen pt-5 px-7 pb-8 relative">

        <div className='flex space-x-1'>
          <h3 className='text-sm text-zinc-400 font-light '>Search results based on:</h3>
           
            {genreIds.length > 0 && (

                <div className="flex items-center">

                  <p className="mr-2 text-sm text-red-800 font-base"> Genres:</p> 

                    {genreIds.map((id) => {
                       console.log(id);
                      return (

                     <span key={id} className={` text-sm font-light cursor-default mr-2
                      ${GenreMap[id] === 'Horror' ? 'text-red-800' : 'text-zinc-300'}`}>
                      {GenreMap[id]}
                     </span>
                      );
                    
                    })}
                 </div>
            )}

          
        </div>
       
        <MovieDisplayBlock fullContent={content} toDisplay={ContentPerPage} />
        <div className='flex justify-center items-center gap-0 mt-5 relative'>
        
        <div className={`py-[3px] px-[3px] rounded-l-3xl pointer-events-none hover:bg-gradient-to-r hover:from-zinc-800 hover:to-zinc-950 hover:text-zinc-200 inline-block ${currentPage === 1 ? 'bg-gradient-to-r from-zinc-800 to-zinc-950':'bg-gradient-to-r  from-red-950 to-zinc-950' }`}>
        <button 
        onClick={() => handlePageChange(1)} 
        disabled={currentPage === 1}
        className={'w-[60px] px-2 py-1 text-sm font-normal pointer-events-auto bg-gradient-to-r from-zinc-400 to-zinc-950 text-red-950 hover:bg-gadient-to-r hover:from-red-950 hover:to-zinc-950 hover:text-zinc-400 disabled:bg-zinc-500 disabled:text-zinc-400 disabled:bg-gradient-to-r disabled:from-zinc-600 disabled:to-zinc-950 disabled:cursor-default z-0 relative cursor-pointer  rounded-l-3xl'}
        >
        First
        </button>
        </div>

        <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className={'px-1 min-w-19 text-center font-light p-2 cursor-pointer rounded-l-3xl ' +
                   'bg-gradient-to-r from-red-950 to-zinc-950 text-zinc-300 ' +
                   'hover:bg-gradient-to-r hover:from-zinc-400 hover:to-zinc-950 hover:text-red-900 ' +
                   'disabled:bg-gradient-to-r disabled:from-zinc-500 disabled:to-zinc-950 disabled:text-zinc-400 disabled:cursor-default'}>
        Previous
        </button>
        <div className='flex items-center justify-center py-3 px-2 text-zinc-300 font-light rounded bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950'>
        <p className='cursor-pointer font-light'>Page {currentPage}/{totalPages}</p>
        </div>

        <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className={'px-1 min-w-19 text-center font-light p-2 cursor-pointer rounded-r-3xl ' +
                   'bg-gradient-to-l from-red-950 to-zinc-950 text-zinc-300 ' +
                   'hover:bg-gradient-to-l hover:from-zinc-400 hover:to-zinc-950 hover:text-red-900 ' +
                   'disabled:bg-gradient-to-l disabled:from-zinc-500 disabled:to-zinc-950 disabled:text-zinc-400 disabled:cursor-default '}
        >Next</button>

        <div className={`py-[3px] px-[3px] rounded-r-3xl pointer-events-none hover:bg-gradient-to-l hover:from-zinc-800 hover:to-zinc-950 hover:text-zinc-200 inline-block ${currentPage === 1 ? 'bg-gradient-to-l from-zinc-800 to-zinc-950':'bg-gradient-to-l  from-red-950 to-zinc-950' }`}>
        <button 
        onClick={() => handlePageChange(totalPages)} 
        disabled={currentPage === totalPages}
        className={'w-[60px] cursor-pointer px-2 py-1 text-sm font-normal pointer-events-auto bg-gradient-to-l from-zinc-400 to-zinc-950 text-red-950 hover:bg-gadient-to-l hover:from-red-950 hover:to-zinc-950 hover:text-zinc-400 disabled:bg-zinc-500 disabled:text-zinc-400 disabled:bg-gradient-to-l disabled:from-zinc-600 disabled:to-zinc-950 z-0 relative rounded-r-3xl'}
        >Last</button>

        </div>

        </div>
    </div>




  )
}