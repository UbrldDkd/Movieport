import StarRating from './StarRating';
import { timeAgo } from '../../../../utils/helpers/timeAgo';

const ACTION_ORDER = ['watchlisted', 'liked', 'watched', 'reviewed', 'rated'];

export default function ActivityItem({ actions, username }) {
  const sorted = ACTION_ORDER.map((act) =>
    actions.find((a) => a.action === act)
  ).filter(Boolean);

  const title = actions[0].title;
  const ratedAction = sorted.find((a) => a.action === 'rated');
  const visibleActions = sorted.filter((a) => a.action !== 'rated');

  return (
    <div className='flex justify-between items-start text-zinc-400'>
      <div className='flex items-center gap-1 flex-wrap'>
        <span className='font-semibold text-text-primary'>{username}</span>
        {visibleActions.map((a, i) => (
          <span className='' key={i}>
            {i > 0 && i === visibleActions.length - 1 ? (
              <span className='text-zinc-600'> and </span>
            ) : i > 0 ? (
              ', '
            ) : (
              ''
            )}
            {a.action}
          </span>
        ))}
        <span className='text-text-primary font-semibold'>{title}</span>
        {ratedAction && <StarRating rating={ratedAction.rating} />}
      </div>
      <span className='text-zinc-500 text-xs shrink-0 ml-2'>
        {timeAgo(actions[0].date)}
      </span>
    </div>
  );
}
