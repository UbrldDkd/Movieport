import PageContainer from '../../components/WrapperContainers/PageContainer';
import { useFetchMainContent } from '../Home/hooks/useFetchMainContent';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import SectionHeader from '../../components/Sections/Common/SectionHeader';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';

export default function TVShows() {
  const { tvShows, error, isLoading } = useFetchMainContent();

  return (
    <PageContainer>
      <div className=' bg-zinc-900/60 min-h-screen mt-2 space-y-3 rounded-sm p-3 '>
        <div className='px-10.5 md:px-23 lg:px-23.5'>
          <SectionHeader header='Latest TV Shows' />

          <ContentDisplayX content={tvShows.popular} includeStats={true} />
        </div>
        <div className='flex'>
          <div className='flex-1'></div>
          <div className='flex-2'>
            {' '}
            <ReviewsSection header='Newly reviewed' />
          </div>
        </div>

        <div className=' md:px-2 lg:px-13.5 mt-10'>
          <SectionHeader header='Popular this week' />
          <ContentDisplayX content={tvShows.popular} view='sm' />
        </div>
      </div>
    </PageContainer>
  );
}
