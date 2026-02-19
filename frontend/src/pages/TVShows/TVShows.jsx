// Hooks
import { useFetchMainContent } from '../Home/hooks/useFetchMainContent';

// Components
import PageContainer from '../../components/WrapperContainers/PageContainer';
import ContentContainer from '../../components/WrapperContainers/ContentContainer';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import SectionHeader from '../../components/Sections/Common/SectionHeader';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';

export default function TVShows() {
  const { tvShows, error, isLoading } = useFetchMainContent();

  return (
    <PageContainer>
      <ContentContainer>
        {/* latest tv shows section */}
        <div className='mx-auto max-w-[792px]'>
          <SectionHeader header='Latest TV Shows' />

          <div className='px-2 sm:px-0 md:px-0'>
            <ContentDisplayX content={tvShows.popular} includeStats={true} />
          </div>
        </div>

        {/* two column layout */}
        <div className='flex flex-col lg:flex-row gap-2'>
          {/* first column */}
          <div className='flex-1'></div>

          {/* second column */}
          <div className='flex-2'>
            {' '}
            <ReviewsSection header='Newly reviewed' includeItemDetails />
          </div>
        </div>

        <div className=' max-w-[955px] mx-auto'>
          <SectionHeader header='Popular this week' />
          <div className='px-5 sm:px-0 md:px-0'>
            <ContentDisplayX content={tvShows.popular} view='sm' />
          </div>
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
