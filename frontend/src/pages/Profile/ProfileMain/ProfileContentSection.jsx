import { Link } from 'react-router-dom';
import ContentCard from '../../../components/ContentDisplays/ContentCard/ContentCard';

export default function ProfileContentSection({ header, url, items }) {
  if (!items || !items.length) return null;

  return (
    <section className='space-y-2 my-2'>
      {/* Section header */}
      <div className='flex justify-between items-baseline text-sm font-semibold tracking-widest text-zinc-300/90'>
        <span className='cursor-default'>{header}</span>
        {header !== 'FAVOURITES' && (
          <Link
            to={url}
            className='text-xs font-semibold tracking-widest text-zinc-400 hover:text-zinc-200'
          >
            VIEW ALL
          </Link>
        )}
      </div>
      {/* Line */}
      <div className=' mb-3 border-b border-zinc-400 w-full' />
      <div className='grid grid-cols-4 gap-2 items-center justify-center'>
        {items.map((item) => (
          <ContentCard key={item.tmdb_id} item={item} view='lg' />
        ))}
      </div>
    </section>
  );
}
