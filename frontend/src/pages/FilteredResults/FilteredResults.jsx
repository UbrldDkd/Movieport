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
import FilteredResultsSelectionPanel from './FilteredResultsSelectionPanel.jsx';
import DecadeYearSelector from '../../components/FilteredResults/DecadeYearSelector.jsx';
import { TfiLayoutGrid2Alt } from 'react-icons/tfi';
import { CgMenuGridR } from 'react-icons/cg';
import BrowseBy from '../../components/BrowseBy/BrowseBy.jsx';

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
        <div className='max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row gap-6'>
          <div className='flex-1 min-w-0'>
            <div className='flex flex-col gap-3'>
              <div className='flex items-center justify-between mb-4'>
                {/* Top section */}
                <div className='flex  flex-col w-full'>
                  <div className='flex justify-between  items-center '>
                    <div className='text-text-primary font-semibold tracking-wider '>
                      {mediaType === 'films' ? 'Films' : 'TV Shows'}
                    </div>
                    <div className='flex gap-1'>
                      <BrowseBy
                        mediaType={mediaType}
                        filters={filters}
                        style='filteredResults'
                      />
                      <button
                        onClick={() => navigate(getBasePath())}
                        className={`py-1 rounded-sm text-xs font-semibold tracking-wide transition-colors ${
                          !isLarge
                            ? ' text-zinc-200'
                            : 'text-zinc-500 hover:text-zinc-300 cursor-pointer'
                        }`}
                      >
                        <CgMenuGridR size={20} />
                      </button>

                      <button
                        onClick={() => navigate(`${getBasePath()}/size/large`)}
                        className={` rounded-sm text-xs font-semibold tracking-wide transition-colors ${
                          isLarge
                            ? ' text-zinc-200'
                            : 'text-zinc-500 hover:text-zinc-300 cursor-pointer'
                        }`}
                      >
                        <TfiLayoutGrid2Alt size={15} />
                      </button>
                    </div>
                  </div>
                  <div className='mt-1 mb-2.5 border-b border-zinc-600' />
                </div>
              </div>
              {(filters.decade ||
                (Array.isArray(filters.year) && filters.year.length > 0)) && (
                <DecadeYearSelector mediaType={mediaType} filters={filters} />
              )}

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
            </div>
          </div>
        </div>
      </PageContainer>
    </BackgroundContainer>
  );
}
