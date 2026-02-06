import { Link } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';
import { timeAgo } from '../../../../utils/timeAgo';

export default function ProfileActivity() {
  const username = 'Machvi';

  // All activities
  const activities = [
    {
      type: 'item',
      date: '2026-02-03',
      tmdb_id: 101,
      title: 'Inception',
      action: 'watchlisted',
    },
    {
      type: 'item',
      date: '2026-02-03',
      tmdb_id: 101,
      title: 'Inception',
      action: 'liked',
    },
    {
      type: 'item',
      date: '2026-02-03',
      tmdb_id: 101,
      title: 'Inception',
      action: 'rated',
      rating: 4.5,
    },
    {
      type: 'item',
      date: '2026-02-03',
      tmdb_id: 101,
      title: 'Inception',
      action: 'reviewed',
    },
    {
      type: 'item',
      date: '2026-02-03',
      tmdb_id: 102,
      title: 'The Matrix',
      action: 'reviewed',
    },
    {
      type: 'list',
      date: '2026-02-02',
      listTitle: 'Sci-Fi Classics',
      listCreator: 'mike',
      action: 'liked',
    },
    {
      type: 'item',
      date: '2026-02-01',
      tmdb_id: 103,
      title: 'Interstellar',
      action: 'watchlisted',
    },
  ];

  const actionOrder = ['watchlisted', 'liked', 'rated', 'reviewed'];

  // Render star rating
  const renderStars = (rating) => (
    <span className='inline-flex items-center gap-0.5'>
      {[1, 2, 3, 4, 5].map((i) => {
        const half = i - 0.5;
        if (rating >= i)
          return <IoIosStar key={i} className='w-4 h-4 text-red-900' />;
        if (rating >= half)
          return (
            <span
              key={i}
              className='relative w-4 h-4 inline-block overflow-hidden'
            >
              <IoIosStar className='absolute w-4 h-4 text-red-900 left-0 top-0 w-1/2' />
              <IoIosStar className='w-4 h-4 text-zinc-600' />
            </span>
          );
        return <IoIosStar key={i} className='w-4 h-4 text-zinc-600' />;
      })}
    </span>
  );

  // Group items by date+id
  const grouped = [];
  const map = {};
  c;
  activities.forEach((a) => {
    if (a.type === 'item') {
      const key = `${a.date}_${a.tmdb_id}`;
      if (!map[key]) map[key] = { ...a, actions: [] };
      map[key].actions.push(a);
    } else {
      grouped.push(a); // lists are added directly
    }
  });
  grouped.push(...Object.values(map));

  // Render item activity
  const renderItem = (actions) => {
    const sorted = actionOrder
      .map((act) => actions.find((a) => a.action === act))
      .filter(Boolean);
    return (
      <div className='flex justify-between items-start'>
        <div className='flex flex-wrap gap-1 items-center'>
          <span className='font-semibold text-zinc-300/90'>{username}</span>
          {sorted.map((a, i) => (
            <span key={i}>
              {i > 0 && ', '}
              {a.action === 'rated' ? renderStars(a.rating) : a.action}
            </span>
          ))}
          <span className='text-zinc-300/90 font-semibold'>
            {actions[0].title}
          </span>
        </div>
        <div className='text-zinc-500 text-xs'>{timeAgo(actions[0].date)}</div>
      </div>
    );
  };

  // Render list activity
  const renderList = (a) => (
    <div className='flex justify-between items-start'>
      <div>
        <span className='text-zinc-300/90 font-semibold'>{username}</span> liked{' '}
        <span className='text-zinc-300/90 font-semibold'>{a.listCreator}</span>
        's{' '}
        <Link
          to={`/list/${a.listTitle.replace(/\s+/g, '-').toLowerCase()}`}
          className='underline text-zinc-300/90 hover:text-zinc-200 font-semibold'
        >
          {a.listTitle}
        </Link>
      </div>
      <div className='text-zinc-500 text-xs'>{timeAgo(a.date)}</div>
    </div>
  );

  return (
    <div className='flex flex-col gap-1'>
      {grouped
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map((a, i) => (
          <div
            key={i}
            className='bg-zinc-900/70 rounded-sm px-3 py-2 text-zinc-400/90 text-sm'
          >
            {a.type === 'item' ? renderItem(a.actions) : renderList(a)}
          </div>
        ))}
    </div>
  );
}
