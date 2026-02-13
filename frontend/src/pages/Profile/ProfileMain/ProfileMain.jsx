// ProfileMain.jsx
import ProfileContentSection from './ProfileContentSection';
import ProfileMainWatchlist from './ProfileMainWatchlist';
import ProfileMainRecentLists from './ProfileMainRecentLists';

export default function ProfileMain({ user }) {
  if (!user) return null;

  const recentLists = (user?.lists || [])
    .filter(
      (list) =>
        Array.isArray(list.items) && list.items.length > 0 && list.public
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  const recentListsCount = (user?.lists || []).filter(
    (list) => new Date(list.created_at) >= twoWeeksAgo
  ).length;

  return (
    <div className='flex flex-col min-h-110 md:grid md:grid-cols-[4fr_2fr] gap-6 mt-2'>
      {/* Left column */}
      <div className='flex flex-col gap-4 w-full md:min-w-0 bg-zinc-900/70 rounded-sm px-3'>
        {user?.favourites && (
          <ProfileContentSection header='FAVOURITES' items={user?.favourites} />
        )}
        {user?.likes && (
          <ProfileContentSection
            header='RECENTLY LIKED'
            url={`likes/films/`}
            items={user?.likes}
          />
        )}
      </div>

      {/* Right column */}
      <div className='flex flex-col gap-4 w-full md:min-w-0 bg-zinc-900/90 rounded-sm py-2.5 px-3'>
        <ProfileMainWatchlist watchlist={user?.watchlist} />
        <ProfileMainRecentLists
          recentLists={recentLists}
          recentListsCount={recentListsCount}
        />
      </div>
    </div>
  );
}
