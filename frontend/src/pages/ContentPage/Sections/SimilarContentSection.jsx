import { useNavigate } from 'react-router-dom';
import { useFetchSimilar } from '../hooks/useFetchSimilar';
import ContentDisplayX from '../../../components/ContentDisplays/ContentDisplayX';
import SectionHeader from '../../../components/Sections/Common/SectionHeader';

export default function SimilarContentSection({ id, mediaType, releaseDate }) {
  const navigate = useNavigate();
  const { content, error } = useFetchSimilar({ id, mediaType, releaseDate });

  if (error) {
    return <p className='text-red-900'>Failed to load similar content</p>;
  }

  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <section className='w-full pb-5 '>
      {/* Header */}
      <SectionHeader
        header={`Similar ${mediaType === 'movie' ? 'films' : 'TV shows'}`}
        url={`/discover/${mediaType}/${id}`}
      />

      <div className='h-[1.5px] border-b-1 border-zinc-700 mb-3 mt-2' />

      {/* Cards */}
      <div className=' justify-center lg:max-w-[700px]'>
        <ContentDisplayX content={content} view='similarSection' />
      </div>
    </section>
  );
}
