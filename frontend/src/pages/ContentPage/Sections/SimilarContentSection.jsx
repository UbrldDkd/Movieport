import { useFetchSimilar } from '../hooks/useFetchSimilar';
import ContentDisplayX from '../../../components/ContentDisplays/ContentDisplayX';
import SectionHeader from '../../../components/Sections/Common/SectionHeader';

export default function SimilarContentSection({ id, mediaType, releaseDate }) {
  const { content, error } = useFetchSimilar({ id, mediaType, releaseDate });

  if (error) {
    return <p className='text-red-900'>Failed to load similar content</p>;
  }

  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <section className='w-full pb-5 '>
      {/* Header */}
      <SectionHeader
        header={`Similar ${mediaType === 'film' ? 'films' : 'TV shows'}`}
        url={`/discover/${mediaType}/${id}`}
      />

      {/* Cards */}
      <div className=' w-full flex-1 max-w-106.5  mx-auto   overflow-hidden justify-center sm:max-w-[700px] lg:max-w-[700px]'>
        <ContentDisplayX content={content} view='similarSection' />
      </div>
    </section>
  );
}
