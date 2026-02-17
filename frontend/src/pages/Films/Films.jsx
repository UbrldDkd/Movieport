// Hooks
import { useFetchMainContent } from '../Home/hooks/useFetchMainContent';

// Components
import PageContainer from '../../components/WrapperContainers/PageContainer';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';
import SectionHeader from '../../components/Sections/Common/SectionHeader';

export default function Films() {
  const { movies, error, isLoading } = useFetchMainContent();

  return (
    <PageContainer>
      <div className='bg-zinc-900/60 rounded-sm min-h-screen  p-3 flex-col flex'>
        <div className=' flex justify-between '></div>

        {/* Popular movies section */}
        <div className=' max-w-[993px] mx-auto justify-center lg:px-9.5 md:px-3'>
          <SectionHeader header='Popular this week' />

          <ContentDisplayX
            content={movies?.popular}
            view={'xl'}
            includeStats={true}
          />
        </div>

        <div className='flex flex-col md:flex-row mt-10 gap-2 md:gap-3'>
          {/* Popular reviews section */}
          <div className='flex-1 md:flex-2 mt-6 md:mt-0'>
            <ReviewsSection
              header='Popular reviews this week'
              includeItemDetails={true}
              url={'dddd'}
            />
          </div>

          {/* Vertical 2 column movies container */}
          <div className='flex-1  md:mx-10 md:max-w-[251px] mx-auto  mt-1 w-full'>
            <SectionHeader header='Picks by Movieport' />
            <ContentDisplayBlock
              content={movies.nowPlaying}
              view='md'
              displayAmount={6}
              justify='center'
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
