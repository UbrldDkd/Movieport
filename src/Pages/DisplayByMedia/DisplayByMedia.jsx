import { useState, useEffect } from 'react';
import MovieDisplayBlock from '../../Components/Main/MovieDisplays/MovieDisplayBlock.jsx';
import { useLocation, useSearchParams, useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { GenreMap } from '../../Components/GenreMap.js';
import { useFetchContent } from './CustomHooks/UseFetchContent.jsx'
import { useFetchSearch } from './CustomHooks/UseFetchSearch.jsx'
import useFetchSimilar from '../Watch/CustomHooks/useFetchSimilar.jsx'

export default function DisplayByMedia() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState()
  const location = useLocation();
  const { by, simId } = useParams();

  
  const ContentPerPage= 72 ;//number of items to display per page, can be changed later
  

useEffect(() => {
  
  setValue(by? by : []);
  }, [by]);

  const genreIds = useMemo(() => {
    return searchParams.get('genres')?.split(',').map(Number) || [];
  }, [searchParams]);//gets the genre ids and memo checks if it has changed
  
  const matchType = searchParams.get('match') || 'and';//gets the match type from the URL, defaults to 'and' if not present

  const mediaType = location.pathname.split('/')[1] || 'movie';// gets the media type from the URL path

  const isSearchPage = location.pathname.includes('/search');

  const isDiscoverPage = location.pathname.includes('discover') && !!simId ;
  
  //Handles URL changes, updates the fetch requests and prepares corresponding data for display
  const { content:searchContent , isLoading:searchIsLoading, error:searchError, totalPages:searchTotalPages } = useFetchSearch({
    value,
    currentPage,
    ContentPerPage
  })

  const { content:defContent, isLoading:defIsLoading, error:defError, totalPages:defTotalPages } = useFetchContent({
    mediaType,
    genreIds, 
    matchType, 
    currentPage, 
    ContentPerPage
  })
  
  const { content:simContent, isLoading:simIsLoading, error:simError, totalPages:simTotalPages } = useFetchSimilar({
    simId,
    mediaType
  })
  const content = isDiscoverPage 
  ? simContent 
  : isSearchPage 
    ? searchContent 
    : defContent;

const isLoading = isDiscoverPage 
  ? simIsLoading 
  : isSearchPage 
    ? searchIsLoading 
    : defIsLoading;

const error = isDiscoverPage 
  ? simError 
  : isSearchPage 
    ? searchError 
    : defError;

const totalPages = isDiscoverPage 
  ? simTotalPages 
  : isSearchPage 
    ? searchTotalPages 
    : defTotalPages;
  
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
            {genreIds.length > 0 && (
              
              <div className="flex items-center">

                  <h3 className='text-sm text-zinc-400 font-light '>Search results based on:</h3>
                   
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
        <div className='flex items-center justify-center py-3 px-2 text-zinc-300 font-light rounded bg-gradient-to-r from-zinc-950/10 via-zinc-900 to-zinc-950/10'>
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