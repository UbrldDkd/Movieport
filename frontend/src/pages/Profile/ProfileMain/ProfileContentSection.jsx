import { Link } from 'react-router-dom';
import ContentCard from '../../../components/ContentDisplays/ContentCard/ContentCard';
import ContentDisplayBlock from '../../../components/ContentDisplays/ContentDisplayBlock';
export default function ProfileContentSection({ header, url, items }) {
  if (!items || !items.length) return null;

  return (
    <section className='space-y-2 my-2'>
      {/* Section header */}
      <div className='flex justify-between items-baseline text-sm font-semibold tracking-widest text-zinc-300/90'>
        <span className='cursor-default'>{header}</span>

        {/* Link to all items if url is provided */}
        {url && (
          <Link
            to={url}
            className='text-xs font-semibold tracking-widest text-zinc-400 hover:text-zinc-200'
          >
            VIEW ALL
          </Link>
        )}
      </div>

      <div className='mb-3 border-b border-zinc-400 w-full' />

      {/* Responsive grid */}
      <ContentDisplayBlock content={items} displayAmount={4} view={'lg'} />
    </section>
  );
}
