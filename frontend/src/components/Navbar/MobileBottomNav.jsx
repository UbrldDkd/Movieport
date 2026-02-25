import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GiCaptainHatProfile } from 'react-icons/gi';
import { AiOutlineHome, AiFillHome } from 'react-icons/ai';
import { MdLocalMovies, MdOutlineLocalMovies } from 'react-icons/md';
import { PiTelevisionFill, PiTelevision } from 'react-icons/pi';
import { BsCollectionFill, BsCollection } from 'react-icons/bs';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useIsLoggedIn } from '../../utils/helpers/useIsLoggedIn.js';
import { useAuthModal } from '../../api/account/auth/Modal/Context/AuthModalContext.js';
import { AuthContext } from '../../api/account/auth/AuthContext.js';

const tabs = [
  {
    label: 'Home',
    to: '/',
    ActiveIcon: AiFillHome,
    InactiveIcon: AiOutlineHome,
  },
  {
    label: 'Films',
    to: '/films/',
    ActiveIcon: MdLocalMovies,
    InactiveIcon: MdOutlineLocalMovies,
  },
  {
    label: 'TV',
    to: '/tv/',
    ActiveIcon: PiTelevisionFill,
    InactiveIcon: PiTelevision,
  },
  {
    label: 'Lists',
    to: '/lists/',
    ActiveIcon: BsCollectionFill,
    InactiveIcon: BsCollection,
  },
];

export default function MobileBottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const { openModal } = useAuthModal();
  const { user } = useContext(AuthContext);

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to);
  const isProfileActive =
    isLoggedIn && pathname.startsWith(`/${user?.username}`);

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 h-16 md:hidden bg-zinc-950 border-t border-zinc-800'>
      <div className='flex items-center justify-around h-full px-2'>
        {tabs.map(({ label, to, ActiveIcon, InactiveIcon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className='flex flex-1 flex-col items-center justify-center gap-1'
            >
              {active ? (
                <ActiveIcon className='text-2xl text-zinc-200' />
              ) : (
                <InactiveIcon className='text-2xl text-zinc-500' />
              )}
            </Link>
          );
        })}

        {/* Profile tab */}
        <button
          onClick={() =>
            isLoggedIn ? navigate(`/${user.username}/`) : openModal('login')
          }
          className='flex flex-1 flex-col items-center justify-center gap-1'
        >
          {isLoggedIn ? (
            <div
              className={`w-10 h-10 rounded-full overflow-hidden  transition-colors ${
                isProfileActive ? 'border-red-500' : 'border-zinc-600'
              }`}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center'>
                  <GiCaptainHatProfile className='text-lg text-zinc-400' />
                </div>
              )}
            </div>
          ) : (
            <RiAccountCircleLine className='text-2xl text-zinc-500' />
          )}
        </button>
      </div>
    </nav>
  );
}
