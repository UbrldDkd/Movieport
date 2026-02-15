export default function FollowButton({ isFollowing }) {
  const TEMP_FOLLOWING = isFollowing;

  return (
    <button
      className='min-w-[105px] text-zinc-300/90 hover:cursor-pointer bg-zinc-800 text-xs font-semibold tracking-widest py-1 rounded-xs px-2 text-center transition-colors duration-200'
      onMouseEnter={(e) => {
        if (!TEMP_FOLLOWING) return;
        e.currentTarget.textContent = 'UNFOLLOW';
        e.currentTarget.classList.remove('bg-zinc-800', 'text-zinc-300/90');
        e.currentTarget.classList.add('bg-red-900', 'text-zinc-900');
      }}
      onMouseLeave={(e) => {
        if (!TEMP_FOLLOWING) return;
        e.currentTarget.textContent = 'FOLLOWING';
        e.currentTarget.classList.remove('bg-red-900', 'text-zinc-900');
        e.currentTarget.classList.add('bg-zinc-800', 'text-zinc-300/90');
      }}
    >
      {TEMP_FOLLOWING ? 'FOLLOWING' : 'FOLLOW'}
    </button>
  );
}
