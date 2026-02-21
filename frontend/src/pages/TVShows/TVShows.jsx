// Hooks
import { useFetchMainContent } from '../Home/hooks/useFetchMainContent';

// Components
import PageContainer from '../../components/WrapperContainers/PageContainer';
import ContentContainer from '../../components/WrapperContainers/ContentContainer';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import SectionHeader from '../../components/Sections/Common/SectionHeader';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';
import ListsSection from '../../components/Sections/Lists/ListsSection';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';

export default function TVShows() {
  const { tvShows, error, isLoading } = useFetchMainContent();

  if (isLoading) {
    return (
      <div className='flex h-[85vh] w-full items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-red-900' />
      </div>
    );
  }

  return (
    <PageContainer>
      <ContentContainer>
        {/* latest tv shows section */}
        <div className='flex-1   mx-auto   overflow-hidden md:max-w-[792px] justify-center  w-full'>
          <SectionHeader header='Latest TV Shows' />

          <div className='px-2 sm:px-0 md:px-0'>
            <ContentDisplayX content={tvShows.popular} includeStats={true} />
          </div>
        </div>

        {/* two column layout */}
        <div className='flex flex-col lg:flex-row gap-10'>
          {/* first column */}
          <div className='flex-2'>
            <ListsSection header='Popular Tv show lists this week' />
          </div>

          {/* second column */}
          <div className='flex-1'>
            {' '}
            <ReviewsSection header='Newly reviewed' includeItemDetails />
          </div>
        </div>
        <div className='  mx-auto flex-1  overflow-hidden md:max-w-[955px] justify-center  w-full'>
          <SectionHeader header='Popular this week' />
          <div className='px-3 sm:px-0 md:px-0'>
            <ContentDisplayX content={tvShows.popular} view='sm' />
          </div>
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
