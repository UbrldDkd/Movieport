import ActivityItem from './ActivityItem';
import ActivityList from './ActivityList';

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
    action: 'watched',
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

function groupActivities(activities) {
  const map = {};
  const lists = [];

  activities.forEach((a) => {
    if (a.type === 'item') {
      const key = `${a.date}_${a.tmdb_id}`;
      if (!map[key]) map[key] = { ...a, actions: [] };
      map[key].actions.push(a);
    } else {
      lists.push(a);
    }
  });

  return [...lists, ...Object.values(map)].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

export default function ProfileActivity() {
  const username = 'Machvi';
  const grouped = groupActivities(activities);

  return (
    <div className='flex flex-col gap-1'>
      {grouped.map((a, i) => (
        <div
          key={i}
          className='bg-bg-secondary rounded-sm px-3 py-2 text-zinc-500/80 tracking-wider font-semibold text-xs'
        >
          {a.type === 'item' ? (
            <ActivityItem actions={a.actions} username={username} />
          ) : (
            <ActivityList activity={a} username={username} />
          )}
        </div>
      ))}
    </div>
  );
}
