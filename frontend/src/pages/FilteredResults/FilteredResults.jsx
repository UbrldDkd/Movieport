// pages/Films/FilteredFilms.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useUrlFilters } from './helpers/useUrlFilters';
import { useFetchContent } from './hooks/useFetchContent';
import BackgroundContainer from '../../components/WrapperContainers/BackgroundContainer';
import PageContainer from '../../components/WrapperContainers/PageContainer';
import LightHouse from '../../components/Common/loadingScreens/LightHouse';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';
import PaginationPanel from '../../components/Common/PaginationPanel';
import NoFilteredResults from './NoFilteredResults';

export default function FilteredResults({ mediaType }) {
  const filters = useUrlFilters();
  const location = useLocation();
  const navigate = useNavigate();

  const isLarge = location.pathname.includes('/size/large');

  const contentPerPage = isLarge ? 18 : 72;
  const view = isLarge ? 'lg' : 'sm';

  const {
    content = [],
    isLoading,
    error,
    totalPages,
    totalResults,
  } = useFetchContent({
    mediaType,
    filters,
    currentPage: filters.page,
    contentPerPage,
  });

  console.log('FILTERS:', filters);
  console.log('CONTENT:', content);

  const getBasePath = () => {
    return location.pathname
      .replace(/\/page\/\d+/, '')
      .replace('/size/large', '');
  };

  return (
    <BackgroundContainer>
      <PageContainer>
        <div className='flex items-center justify-between mt-4 mb-2'>
          <p className='text-sm text-zinc-400'>
            {content.length > 0 ? `${content.length} results` : 'No results'}
          </p>

          {totalResults}

          <div className='flex gap-1'>
            <button
              onClick={() => navigate(getBasePath())}
              className={`px-2 py-1 rounded-sm text-xs font-semibold tracking-wide transition-colors ${
                !isLarge
                  ? 'bg-zinc-700 text-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Compact
            </button>

            <button
              onClick={() => navigate(`${getBasePath()}/size/large`)}
              className={`px-2 py-1 rounded-sm text-xs font-semibold tracking-wide transition-colors ${
                isLarge
                  ? 'bg-zinc-700 text-zinc-200'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Large
            </button>
          </div>
        </div>

        {error ? (
          <p className='text-red-400 text-sm py-6'>{error.message}</p>
        ) : isLoading ? (
          <LightHouse />
        ) : content.length === 0 ? (
          <NoFilteredResults filters={filters} />
        ) : (
          <ContentDisplayBlock
            content={content}
            displayAmount={contentPerPage}
            view={view}
          />
        )}
        <PaginationPanel
          currentPage={filters.page}
          totalPages={totalPages - 1}
          handlePageChange={(page) => {
            if (page === 1) {
              navigate(getBasePath());
            } else {
              navigate(`${getBasePath()}/page/${page}`);
            }
          }}
        />
      </PageContainer>
    </BackgroundContainer>
  );
}
