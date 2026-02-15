// Third-party
import { Link } from 'react-router-dom';

// Components
import ListCardPosters from '../../../components/List/ListCardPosters';

export default function ProfileMainRecentLists({
  recentLists,
  recentListsCount,
}) {
  if (!recentLists?.length) return null;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex justify-between items-center text-xs font-semibold tracking-widest text-zinc-300/90'>
        <Link className='-mb-1' to='lists/'>
          RECENT LISTS
        </Link>
        <Link to='lists/' className='text-zinc-400'>
          {recentListsCount}
        </Link>
      </div>
      <div className='border-b border-zinc-600' />

      <div className='flex flex-col gap-2.5 w-full'>
        {recentLists.map((list) => (
          <div key={list.id} className='flex flex-col gap-1 w-full'>
            <ListCardPosters
              items={list.items.slice(0, 5)}
              linkUrl={`list/${list.title_slug}/`}
              compact='md'
            />
            <Link
              to={`list/${list.title_slug}/`}
              className='text-md font-semibold text-zinc-200 truncate'
            >
              {list.title}
            </Link>
            <span className='text-xs text-zinc-400'>
              {list.items.length} items
            </span>

            <div className='w-full overflow-hidden'>
              <p className='text-zinc-300/80 text-[13px] font-semibold break-words whitespace-pre-wrap max-h-20 overflow-y-auto scrollbar-hide'>
                {list.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
