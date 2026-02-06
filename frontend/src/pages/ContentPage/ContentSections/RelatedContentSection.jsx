import { useFetchRelated } from '../hooks/useFetchRelated';
import ContentCard from '../../Profile/ProfileBrowse/ContentCard/ContentCard';

export default function RelatedContent({
  collectionData,
  currentId,
  mediaType,
}) {
  const { content, error } = useFetchRelated({
    collectionId: collectionData?.id,
    currentId,
  });

  if (error) {
    return null;
  }

  if (!collectionData || mediaType !== 'movie') return null;

  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <section className='w-full pb-5'>
      <div className='flex items-center justify-between mb-1'>
        <h3 className='text-base font-semibold tracking-wider text-zinc-300'>
          Related {mediaType === 'movie' ? 'films' : 'tv-shows'}
        </h3>
      </div>

      <div className='h-[1.5px] bg-zinc-700 mb-3' />

      <div className=' justify-center'>
        <div className='flex gap-2.5'>
          {content.map((item) => (
            <ContentCard
              key={item?.tmdb_id ?? item?.id}
              item={item}
              view='md'
            />
          ))}
        </div>
      </div>
    </section>
  );
}