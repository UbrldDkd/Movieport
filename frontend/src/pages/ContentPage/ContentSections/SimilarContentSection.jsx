import { useNavigate } from 'react-router-dom';
import { useFetchSimilar } from '../hooks/useFetchSimilar';
import ContentCard from '../../Profile/ProfileBrowse/ContentCard/ContentCard';

export default function SimilarContentSection({ id, mediaType, releaseDate }) {
  const navigate = useNavigate();
  const { content, error } = useFetchSimilar({ id, mediaType, releaseDate });

  function handleViewAll() {
    navigate(`/discover/${mediaType}/${id}`);
  }

  if (error) {
    return <p className='text-red-900'>Failed to load similar content</p>;
  }

  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <section className='w-full pb-5'>
      {/* Header */}
      <div className='flex items-center justify-between mb-1'>
        <h3 className='text-base font-semibold tracking-wider text-zinc-300'>
          Similar {mediaType === 'movie' ? 'films' : 'tv-shows'}
        </h3>

        <button
          onClick={handleViewAll}
          className='text-sm font-semibold hover:cursor-pointer tracking-wide text-zinc-400 hover:text-zinc-200 transition'
        >
          View all
        </button>
      </div>

      <div className='h-[1.5px] bg-zinc-700 mb-3' />

      {/* Cards */}
      <div className=' justify-center'>
        <div className='flex gap-2.5'>
          {content.slice(0, 5).map((item) => (
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
