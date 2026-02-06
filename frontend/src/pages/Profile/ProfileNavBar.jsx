import { Link, useLocation } from 'react-router-dom';

export default function ProfileNavBar({ user }) {
  const { pathname } = useLocation();

  const navLinks = [
    { label: 'Profile', to: `/${user?.username}/` },
    { label: 'Films', to: `/${user?.username}/films/` },
    { label: 'Activity', to: `/${user?.username}/activity/` },
    { label: 'Reviews', to: `/${user?.username}/reviews/` },
    { label: 'Lists', to: `/${user?.username}/lists/` },
    { label: 'Watchlist', to: `/${user?.username}/watchlist/` },
    { label: 'Likes', to: `/${user?.username}/likes/films/` },
    { label: 'Network', to: `/${user?.username}/following/` },
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
