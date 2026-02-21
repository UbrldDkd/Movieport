import { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GenreMap } from '../../utils/constants/GenreMap.js';
import { useFetchContent } from './hooks/useFetchContent.jsx';
import { useFetchSearch } from './hooks/useFetchSearch.jsx';
import { useFetchSimilar } from './hooks/useFetchSimilar.jsx';
import { DeadEndFilters } from './DeadEndFilters.jsx';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock.jsx';

export default function DisplayByMedia() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState();
  const location = useLocation();
  const { mediaType, by, id } = useParams();

  const contentPerPage = 72;

  // Set initial filter value
  useEffect(() => {
    setValue(by ? by : []);
  }, [by]);

  // Parse query parameters
  const selectedYears = useMemo(() => {
    return searchParams.get('years')?.split(',').map(Number) || [];
  }, [searchParams]);

  const selectedCountries = useMemo(() => {
    return searchParams.get('countries')?.split(',') || [];
  }, [searchParams]);

  const genreIds = useMemo(() => {
    return searchParams.get('genres')?.split(',').map(Number) || [];
  }, [searchParams]);

  const matchType = searchParams.get('match') || 'any';

  // Page type flags
  const isSearchPage = location.pathname.includes('/search');
  const isDiscoverPage = location.pathname.includes('discover') && !!id;

  // Fetch search, default, and similar content
  const {
    content: searchContent,
    isLoading: searchIsLoading,
    error: searchError,
    totalPages: searchTotalPages,
  } = useFetchSearch({
    value,
    currentPage,
    contentPerPage,
  });

  const {
    content: defContent,
    isLoading: defIsLoading,
    error: defError,
    totalPages: defTotalPages,
  } = useFetchContent({
    mediaType,
    genreIds,
    matchType,
    currentPage,
    contentPerPage,
    selectedYears,
    selectedCountries,
  });

  const {
    content: simContent,
    isLoading: simIsLoading,
    error: simError,
    totalPages: simTotalPages,
  } = useFetchSimilar({
    id,
    mediaType,
    currentPage,
    contentPerPage,
  });

  // Determine active content, loading state, error, and total pages
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

  // Reset page when mediaType changes
  useEffect(() => {
    setCurrentPage(1);
  }, [mediaType]);

  // Pagination handler
  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }

  // Error state
  if (error) {
    return (
      <div className='w-full h-[85vh] flex items-center justify-center text-red-500 font-semibold text-lg'>
        Something went wrong: {error.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className='bg-zinc-950 min-h-screen pt-5 px-3 md:px-7 pb-8 relative'>
      <AnimatePresence mode='wait'>
        {isLoading ? (
          // Loading state
          <motion.div
            key='loading'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='w-full h-[85vh] flex items-center justify-center'
          >
            <img
              src='/assets/lightHouseSm.gif'
              alt='Loading...'
              className='w-100 h-100'
            />
          </motion.div>
        ) : content.length === 0 ? (
          // No content
          <motion.div
            key='no-content'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className='flex flex-col items-center justify-center min-h-screen text-center text-zinc-400 px-4'
          >
            <DeadEndFilters
              genreIds={genreIds}
              selectedYears={selectedYears}
              selectedCountries={selectedCountries}
              value={value}
            />
          </motion.div>
        ) : (
          // Display content
          <motion.div
            key='content'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Filter summary */}
            <div className='flex space-x-1'>
              {(genreIds.length > 0 ||
                selectedYears.length > 0 ||
                selectedCountries.length > 0) && (
                <div className='flex items-center flex-wrap gap-2'>
                  <h3 className='text- text-gray-400 font-light'>
                    Search results based on:
                  </h3>
                  <div className='h-10 w-0.5 bg-gradient-to-b from-zinc-950 via-red-950 to-zinc-950' />

                  {/* Genres */}
                  {genreIds.length > 0 && (
                    <p className='mr-1 text-sm text-zinc-400 font-base'>
                      {genreIds.length === 1 ? 'Genre: ' : 'Genres: '}
                      {genreIds.map((id) => (
                        <span
                          key={id}
                          className={`text-sm font-light cursor-default mr-2 ${
                            GenreMap[id] === 'Horror'
                              ? 'text-red-800'
                              : 'text-text-primary'
                          }`}
                        >
                          {GenreMap[id]}
                        </span>
                      ))}
                    </p>
                  )}

                  {/* Years */}
                  {selectedYears.length > 0 && (
                    <p className='mr-2 text-sm text-zinc-400 font-base'>
                      {selectedYears.length === 1
                        ? 'Release Year: '
                        : 'Release Years: '}
                      {selectedYears.map((y) => (
                        <span
                          key={y}
                          className='text-sm font-light cursor-default mr-2 text-text-primary'
                        >
                          {y}
                        </span>
                      ))}
                    </p>
                  )}

                  {/* Countries */}
                  {selectedCountries.length > 0 && (
                    <p className='mr-2 text-sm text-zinc-400 font-base'>
                      {selectedCountries.length === 1
                        ? 'Country: '
                        : 'Countries: '}
                      {selectedCountries.map((c) => (
                        <span
                          key={c}
                          className='text-sm font-light cursor-default text-text-primary mr-2'
                        >
                          {c}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Movie/TV Display Block */}
            <ContentDisplayBlock
              fullContent={content}
              toDisplay={contentPerPage}
            />

            {/* Pagination */}
            <div className='flex justify-center items-center gap-0 mt-5 relative'>
              {/* First */}
              <div
                className={`py-[3px] px-[3px] rounded-l-3xl pointer-events-none ${
                  currentPage === 1
                    ? 'bg-gradient-to-r from-zinc-800 to-zinc-950'
                    : 'bg-gradient-to-r from-red-950 to-zinc-950'
                }`}
              >
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className='w-[60px] px-2 py-1 text-sm font-normal pointer-events-auto bg-gradient-to-r from-zinc-400 to-zinc-950 text-red-950 disabled:cursor-default rounded-l-3xl'
                >
                  First
                </button>
              </div>

              {/* Previous */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='px-1 min-w-19 text-center font-light p-2 cursor-pointer rounded-l-3xl bg-gradient-to-r from-red-950 to-zinc-950 text-text-primary disabled:cursor-default'
              >
                Previous
              </button>

              {/* Current Page */}
              <div className='flex items-center justify-center py-3 px-2 text-text-primary font-light rounded bg-gradient-to-r from-zinc-950/10 via-zinc-900 to-zinc-950/10'>
                <p className='cursor-pointer font-light'>
                  Page {currentPage}/{totalPages}
                </p>
              </div>

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='px-1 min-w-19 text-center font-light p-2 cursor-pointer rounded-r-3xl bg-gradient-to-l from-red-950 to-zinc-950 text-text-primary disabled:cursor-default'
              >
                Next
              </button>

              {/* Last */}
              <div
                className={`py-[3px] px-[3px] rounded-r-3xl pointer-events-none ${
                  currentPage === 1
                    ? 'bg-gradient-to-l from-zinc-800 to-zinc-950'
                    : 'bg-gradient-to-l from-red-950 to-zinc-950'
                }`}
              >
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className='w-[60px] px-2 py-1 text-sm font-normal pointer-events-auto bg-gradient-to-l from-zinc-400 to-zinc-950 text-red-950 disabled:cursor-default rounded-r-3xl'
                >
                  Last
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
