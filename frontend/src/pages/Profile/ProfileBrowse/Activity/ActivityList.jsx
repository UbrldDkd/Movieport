import { Link } from 'react-router-dom';
import { timeAgo } from '../../../../utils/helpers/timeAgo';

export default function ActivityList({ activity, username }) {
  return (
    <div className='flex justify-between items-start'>
      <div>
        <span className='text-text-primary font-semibold'>{username}</span>{' '}
        liked{' '}
        <span className='text-text-primary font-semibold'>
          {activity.listCreator}
          's{' '}
        </span>
        <Link
          to={`/list/${activity.listTitle.replace(/\s+/g, '-').toLowerCase()}`}
          className='underline text-text-primary hover:text-zinc-200 font-semibold'
        >
          {activity.listTitle}
        </Link>
      </div>
      <span className='text-zinc-500 text-xs'>{timeAgo(activity.date)}</span>
    </div>
  );
}
