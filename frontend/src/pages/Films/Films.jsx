// Hooks
import { useFetchFilms } from './hooks/useFetchFilms';

// Components
import BackgroundContainer from '../../components/WrapperContainers/BackgroundContainer';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';
import PageContainer from '../../components/WrapperContainers/PageContainer';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';
import SectionHeader from '../../components/Sections/Common/SectionHeader';
import Spinner from '../../components/Common/loadingScreens/Spinner';

export default function Films() {
  const { content, error, isLoading } = useFetchFilms();
  console.log(content);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <BackgroundContainer>
      {/* Popular movies section */}
      <PageContainer>
        <div className='flex-1   mx-auto   overflow-hidden md:max-w-[993px] justify-center lg:px-9.5 md:px-3 w-full'>
          <SectionHeader header='Popular this week' />

          <ContentDisplayX
            content={content?.popular}
            view={'xl'}
            includeStats={true}
          />
        </div>

        {/* Vertical 2 column movies container */}
        <div className='flex flex-col md:flex-row mt-2 gap-2 md:gap-2'>
          {/* Popular reviews section */}
          <div className='flex-1 md:flex-2 mt-6 md:mt-0'>
            <ReviewsSection
              header='Popular reviews this week'
              includeItemDetails={true}
              url={'dddd'}
            />
          </div>

          <div className='  mx-auto flex'>
            <div className='flex-1  md:mx-10 md:max-w-[252px] mx-auto   w-full'>
              <SectionHeader header='Picks by Movieport' />
              <ContentDisplayBlock
                content={content.popular}
                view='md'
                displayAmount={6}
                justify='center'
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </BackgroundContainer>
  );
}
