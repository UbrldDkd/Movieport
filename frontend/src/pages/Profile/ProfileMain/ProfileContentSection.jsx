import { Link } from 'react-router-dom';
import ContentCard from '../ProfileBrowse/ContentCard/ContentCard';

export default function ProfileContentSection({ header, items }) {
  if (!items || !items.length) return null;

  return (
    <section className='space-y-2 mt-8'>
      {/* Section header */}
      <div className='flex justify-between items-center text-sm font-semibold tracking-widest text-zinc-300/90'>
        <span>{header}</span>
        {header !== 'FAVOURITES' && (
          <Link
            to='likes/films/'
            className='text-xs font-semibold tracking-widest text-zinc-400 hover:text-zinc-200'
          >
            VIEW ALL
          </Link>
        )}
      </div>

      {/* Line */}
      <div className='h-px mb-3 bg-zinc-400 w-full' />

      {/* Fixed 4-column grid */}
      <div className='grid grid-cols-4 gap-2.5 justify-center'>
        {items.map((item) => (
          <ContentCard key={item.tmdb_id} item={item} view='lg' />
        ))}
      </div>
    </section>
  );
}
