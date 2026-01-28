import { Link } from 'react-router-dom';
import ProfileContentSection from './ProfileContentSection';
import ListCardPosters from './ProfileBrowse/Lists/ListCardPosters';

export default function ProfileMain({ user }) {
  if (!user) return null;

  const favourites = user?.contentRelations?.filter((cr) => cr.favourited);
  const recentlyLiked = user?.contentRelations
    ?.filter((cr) => cr.liked)
    .slice(0, 4);

  const watchlist = user?.contentRelations
    ?.filter((cr) => cr.watchlisted)
    .slice(0, 5);
  const watchlistCount = watchlist?.length || 0;

  const recentLists = (user?.lists || [])
    .filter((list) => Array.isArray(list.items) && list.items.length > 0 && list.public)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 3);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const recentListsCount = (user?.lists || []).filter(
    (list) => new Date(list.created_at) >= twoWeeksAgo
  ).length;

  return (
    <div className="flex flex-col md:grid md:grid-cols-[4fr_2fr] gap-6 mt-2">
      
      {/* Left column */}
      <div className="flex flex-col gap-4 w-full md:min-w-0 bg-zinc-900/70 rounded-sm px-3">
        <ProfileContentSection title="FAVOURITES" items={favourites} />
        <ProfileContentSection title="RECENTLY LIKED" items={recentlyLiked} />
      </div>

      {/* Right column */}
      <div className="flex flex-col gap-4 w-full md:min-w-0 bg-zinc-900/90 rounded-sm py-2.5 px-3">
        
        {/* WATCHLIST */}
        {watchlistCount > 0 && (
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between items-center text-xs font-semibold tracking-widest text-zinc-300/90">
              <Link to="watchlist/">WATCHLIST</Link>
              <Link to="watchlist/" className="text-zinc-400">
                {watchlistCount}
              </Link>
            </div>
            <div className="h-[0.5px] bg-zinc-500" />
            <ListCardPosters items={watchlist} linkUrl="watchlist/" />
          </div>
        )}

        {/* RECENT LISTS */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center text-xs font-semibold tracking-widest text-zinc-300/90">
            <Link to="lists/">RECENT LISTS</Link>
            <Link to="lists/" className="text-zinc-400">
              {recentListsCount}
            </Link>
          </div>
          <div className="h-[0.5px] bg-zinc-500" />

          <div className="flex flex-col gap-2.5 w-full">
            {recentLists.map((list) => (
              <div key={list.id} className="flex flex-col gap-1 w-full">
                <ListCardPosters
                  items={list.items.slice(0, 5)}
                  linkUrl={`list/${list.title_slug}/`}
                />
                <Link
                  to={`list/${list.title_slug}/`}
                  className="text-md font-semibold text-zinc-200 truncate"
                >
                  {list.title}
                </Link>
                <span className="text-xs text-zinc-400">
                  {list.items.length} items
                </span>

                {/* Description */}
                <div className="w-full overflow-hidden">
                  <p className="text-zinc-300/80 text-[13px] font-semibold break-words whitespace-pre-wrap max-h-20 overflow-y-auto scrollbar-hide">
                    {list.description || 'No description'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
