import PageContainer from '../../components/WrapperContainers/PageContainer';
import { useFetchMainContent } from '../Home/hooks/useFetchMainContent';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import SectionHeader from '../../components/Sections/Common/SectionHeader';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';

export default function TVShows() {
  const { tvShows, error, isLoading } = useFetchMainContent();

  return (
    <PageContainer>
      <div className=' bg-zinc-900/60 min-h-screen space-y-10 rounded-sm p-3 '>
        {/* latest tv shows section */}
        <div className='mx-auto max-w-[792px]'>
          <SectionHeader header='Latest TV Shows' />

          <ContentDisplayX content={tvShows.popular} includeStats={true} />
        </div>

        {/* two column layout */}
        <div className='flex'>
          {/* first column */}
          <div className='flex-1'></div>

          {/* second column */}
          <div className='flex-2'>
            {' '}
            <ReviewsSection header='Newly reviewed' />
          </div>
        </div>

        <div className=' max-w-[865px] mx-auto'>
          <SectionHeader header='Popular this week' />
          <ContentDisplayX content={tvShows.popular} view='sm' />
        </div>
      </div>
    </PageContainer>
  );
}
