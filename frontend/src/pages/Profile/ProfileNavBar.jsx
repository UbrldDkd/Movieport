import { Link, useLocation } from 'react-router-dom';

export default function ProfileNavBar({ username }) {
  const { pathname } = useLocation();

  const navLinks = [
    { label: 'Profile', to: `/${username}/` },
    { label: 'Watched', to: `/${username}/watched/` },
    { label: 'Activity', to: `/${username}/activity/` },
    { label: 'Reviews', to: `/${username}/reviews/` },
    { label: 'Lists', to: `/${username}/lists/` },
    { label: 'Watchlist', to: `/${username}/watchlist/` },
    { label: 'Likes', to: `/${username}/likes/films/` },
    { label: 'Network', to: `/${username}/following/` },
  ];

  return (
    <nav className='w-full rounded-sm font-sans'>
      <div className='flex items-center justify-center rounded-sm  bg-zinc-900/90 py-1 relative overflow-x-auto'>
        <div className='flex flex-col md:flex-row w-full md:w-auto divide-y md:divide-y-0 divide-zinc-800/50 '>
          {navLinks.map((link) => {
            const active =
              pathname === link.to ||
              (link.to !== '/profile/' && pathname.startsWith(link.to));

            return (
              <Link
                key={link.label}
                to={link.to}
                className={`w-full md:w-auto text-left md:text-center tracking-wider hover:cursor-pointer text-xs sm:text-sm font-medium rounded px-2 sm:px-3 py-2 transition-colors whitespace-nowrap ${
                  active
                    ? 'text-zinc-200'
                    : 'text-zinc-400 md:hover:bg-transparent hover:bg-zinc-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
