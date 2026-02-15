// Third-party
import { Link } from 'react-router-dom';

// Components
import ListCardPosters from '../../../components/List/ListCardPosters';

export default function ProfileMainWatchlist({ watchlist }) {
  if (!watchlist?.length) return null;

  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='flex justify-between items-center text-xs font-semibold tracking-widest text-zinc-300/90'>
        <Link className='-mb-1' to='watchlist/'>
          WATCHLIST
        </Link>
        <Link to='watchlist/' className='text-zinc-400'>
          {watchlist.length}
        </Link>
      </div>
      <div className='border-b border-zinc-600' />
      <ListCardPosters items={watchlist} linkUrl='watchlist/' />
    </div>
  );
}
