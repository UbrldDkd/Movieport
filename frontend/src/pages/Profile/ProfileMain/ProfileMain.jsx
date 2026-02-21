// Components
import ProfileContentSection from './ProfileContentSection';
import ProfileMainWatchlist from './ProfileMainWatchlist';
import ProfileMainRecentLists from './ProfileMainRecentLists';
import ContentContainerScdr from '../../../components/WrapperContainers/ContentContainerScdr';
import { MOCK_ITEMS } from '../Settings/Tabs/ProfileTab/FavouritesSelection/constants';

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
    <div className='flex flex-col md:flex-row w-full min-h-screen gap-2 '>
      {/* Left column */}

      <div className='flex-1 '>
        <ContentContainerScdr>
          {user?.favourites && (
            <ProfileContentSection header='Favourites' items={MOCK_ITEMS} />
          )}
          {user?.likes && (
            <ProfileContentSection
              header='Recently liked'
              url='likes/films/'
              items={user?.likes}
            />
          )}
        </ContentContainerScdr>
      </div>

      {/* Right column */}
      <div className=' gap-4 md:w-[268px] '>
        <ContentContainerScdr>
          <ProfileMainWatchlist watchlist={user?.watchlist} />
          <ProfileMainRecentLists
            recentLists={recentLists}
            recentListsCount={recentListsCount}
          />
        </ContentContainerScdr>
      </div>
    </div>
  );
}
