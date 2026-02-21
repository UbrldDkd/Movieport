// Hooks
import { useFetchMainContent } from '../Home/hooks/useFetchMainContent';

// Components
import PageContainer from '../../components/WrapperContainers/PageContainer';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';
import ContentContainer from '../../components/WrapperContainers/ContentContainer';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';
import SectionHeader from '../../components/Sections/Common/SectionHeader';

export default function Films() {
  const { movies, error, isLoading } = useFetchMainContent();
  if (isLoading) {
    return (
      <div className='flex h-[85vh] w-full items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-t-4 border-solid border-red-900' />
      </div>
    );
  }
  return (
    <PageContainer>
      {/* Popular movies section */}
      <ContentContainer>
        <div className='flex-1   mx-auto   overflow-hidden md:max-w-[993px] justify-center lg:px-9.5 md:px-3 w-full'>
          <SectionHeader header='Popular this week' />

          <ContentDisplayX
            content={movies?.popular}
            view={'xl'}
            includeStats={true}
          />
        </div>
      </ContentContainer>

      {/* Vertical 2 column movies container */}
      <div className='flex flex-col md:flex-row mt-2 gap-2 md:gap-2'>
        <ContentContainer>
          {/* Popular reviews section */}
          <div className='flex-1 md:flex-2 mt-6 md:mt-0'>
            <ReviewsSection
              header='Popular reviews this week'
              includeItemDetails={true}
              url={'dddd'}
            />
          </div>
        </ContentContainer>

        <ContentContainer>
          <div className='  mx-auto flex'>
            <div className='flex-1  md:mx-10 md:max-w-[327px] mx-auto  mt-1 w-full'>
              <SectionHeader header='Picks by Movieport' />
              <ContentDisplayBlock
                content={movies.nowPlaying}
                view='md'
                displayAmount={6}
                justify='center'
              />
            </div>
          </div>
        </ContentContainer>
      </div>
    </PageContainer>
  );
}
