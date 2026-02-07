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
      <div className='flex justify-center items-center border-zinc-800/50 rounded-xs bg-zinc-900/90 p-1 overflow-x-auto scrollbar-hide '>
        <div className='flex min-w-max'>
          {navLinks.map((link) => {
            const active =
              pathname === link.to ||
              (link.to !== '/profile/' && pathname.startsWith(link.to));

            return (
              <Link
                key={link.label}
                to={link.to}
                className={`tracking-wider text-sm font-medium rounded px-3 py-2 transition-colors whitespace-nowrap
                  ${active ? 'text-zinc-200' : 'text-zinc-400 hover:text-zinc-100'}`}
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
