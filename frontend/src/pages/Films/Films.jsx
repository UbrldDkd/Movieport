// Hooks
import { useFetchMainContent } from '../Home/hooks/useFetchMainContent';

// Components
import PageContainer from '../../components/WrapperContainers/PageContainer';
import ReviewsSection from '../../components/Sections/Reviews/ReviewsSection';
import ContentDisplayX from '../../components/ContentDisplays/ContentDisplayX';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';

export default function Films() {
  const { movies, error, isLoading } = useFetchMainContent();

  return (
    <PageContainer>
      <div className='bg-zinc-900/60 rounded-sm min-h-screen mt-2 p-3 flex-col flex'>
        <div className=' flex justify-between '>
          <div></div>
        </div>

        {/* Popular movies section */}
        <div className='items-center justify-center lg:px-9.5 md:px-3'>
          <h2 className='text-zinc-300/90 text-base -mb-1 tracking-wide font-semibold cursor-default'>
            Popular this week
          </h2>
          <div className='border-b border-zinc-600 mb-2.5 mt-2 ' />
          <ContentDisplayX
            content={movies?.popular}
            view={'xl'}
            includeStats={true}
          />
        </div>

        <div className='flex flex-col md:flex-row mt-10 gap-6 md:gap-0'>
          {/* Popular reviews section */}
          <div className='flex-1 md:flex-2 mt-6 md:mt-0'>
            <ReviewsSection
              header='Popular reviews this week'
              includeItemDetails={true}
              url={'dddd'}
            />
          </div>

          {/* Vertical 2 column movies container */}
          <div className='flex-1 mt-1 w-full'>
            <h2 className='text-zinc-300/90 text-base md:mx-10 -mb-1 tracking-wide font-semibold cursor-default'>
              Picks by Movieport
            </h2>
            <div className='border-b border-zinc-600 mb-3 mt-2 md:mx-10' />
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
