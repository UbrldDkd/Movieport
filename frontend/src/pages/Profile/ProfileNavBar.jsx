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
    <nav className='w-full rounded-sm '>
      <div className='flex items-center justify-center rounded-sm  bg-bg-secondary py-1 relative overflow-x-auto'>
        <div className='flex flex-col sm:flex-row sm:flex md:flex-row w-full md:w-auto  divide-y sm:w-auto sm:divide-y-0 md:divide-y-0 divide-zinc-800/50 '>
          {navLinks.map((link) => {
            const active =
              pathname === link.to ||
              (link.to !== '/profile/' && pathname.startsWith(link.to));

            return (
              <Link
                key={link.label}
                to={link.to}
                className={`w-full sm:hover:bg-transparent md:hover:bg-transparent md:w-auto text-left md:text-center hover:text-text-primary hover:bg-zinc-800 tracking-wider  text-xs sm:text-sm font-medium rounded px-2 sm:px-3 py-2 transition-colors whitespace-nowrap ${
                  active
                    ? 'text-zinc-200 sm:bg-transparent md:bg-transparent bg-zinc-800 cursor-default'
                    : 'text-zinc-400 cursor-pointer '
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
