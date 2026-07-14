import { useAuthModal } from '../../../api/account/auth/Modal/Context/AuthModalContext';
import { useIsLoggedIn } from '../../../utils/helpers/useIsLoggedIn';

export default function FollowButton({ isFollowing, onClick }) {
  const isLoggedIn = useIsLoggedIn();
  const { openModal: openAuthModal } = useAuthModal();

  const handleClick = () => {
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }

    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className={`group min-w-[105px] text-xs font-semibold tracking-widest py-1 rounded-xs px-2 text-center transition-colors duration-200 hover:cursor-pointer
        ${
          isFollowing
            ? 'bg-zinc-800 text-text-primary hover:bg-red-900 hover:text-zinc-900'
            : 'bg-zinc-800 hover:bg-zinc-700 text-text-primary'
        }`}
    >
      {isFollowing ? (
        <>
          <span className='group-hover:hidden'>FOLLOWING</span>
          <span className='hidden group-hover:inline'>UNFOLLOW</span>
        </>
      ) : (
        'FOLLOW'
      )}
    </button>
  );
}
