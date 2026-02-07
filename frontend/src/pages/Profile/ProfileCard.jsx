// Standard library
import { useState } from 'react';

// Third-party
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPenFancy } from 'react-icons/fa';
import { GiCaptainHatProfile } from 'react-icons/gi';

export default function ProfileCard({ user }) {
  const [tooltip, setTooltip] = useState(false);

  if (!user) return null;

  const { username, lists, contentRelations, isOwner } = user;

  const filmsCount = contentRelations?.filter((cr) => cr.watched).length || 0;
  const listsCount = lists?.length || 0;

  const stats = [
    { label: 'FILMS', value: filmsCount, link: `/${username}/likes/films/` },
    {
      label: listsCount === 1 ? 'LIST' : 'LISTS',
      value: listsCount,
      link: `/${username}/lists/`,
    },
    { label: 'FOLLOWERS', value: 123, link: `/${username}/followers/` },
    { label: 'FOLLOWING', value: 45, link: `/${username}/following/` },
  ];

  const TEMP_FOLLOWING = true;
  const TEMP_FOLLOWS_YOU = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='px-3 py-2.5 my-2 border border-zinc-800/10 rounded-r-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 bg-zinc-900/70'
    >
      {/* Stats section */}
      <div className='flex items-center'>
        {stats.map((stat, idx) => (
          <div key={stat.label} className='flex items-center'>
            <Link to={stat.link} className='flex flex-col items-center px-3'>
              <span className='text-zinc-300 text-base font-semibold'>
                {stat.value}
              </span>
              <span className='text-[12px] tracking-widest text-zinc-400/80 font-semibold hover:text-red-900/60 transition-colors'>
                {stat.label}
              </span>
            </Link>
            {idx < stats.length - 1 && (
              <div className='h-8 w-px bg-red-950 mx-1' />
            )}
          </div>
        ))}
      </div>

      {/* Profile section */}
      <div className='flex items-center gap-6'>
        <div
          className={`flex flex-col gap-2 ${
            !isOwner && 'items-end text-right'
          }`}
        >
          <h1 className='text-2xl  text-zinc-200'>{username}</h1>

          {/* Follow/unFollow button(only when viewing another profile) */}
          <div className='flex items-center gap-3 '>
            {!isOwner && TEMP_FOLLOWS_YOU && (
              <div className='text-xs text-zinc-400 font-semibold tracking-wider justify-center'>
                Follows you
              </div>
            )}
            {!isOwner && (
              <button
                className='min-w-[105px] text-zinc-300/90 hover:cursor-pointer bg-zinc-800 text-xs font-semibold tracking-widest py-1 rounded-xs px-2 text-center transition-colors duration-200'
                onMouseEnter={(e) => {
                  if (!TEMP_FOLLOWING) return;
                  e.currentTarget.textContent = 'UNFOLLOW';
                  e.currentTarget.classList.remove(
                    'bg-zinc-800',
                    'text-zinc-300/90'
                  );
                  e.currentTarget.classList.add('bg-red-900', 'text-zinc-900');
                }}
                onMouseLeave={(e) => {
                  if (!TEMP_FOLLOWING) return;
                  e.currentTarget.textContent = 'FOLLOWING';
                  e.currentTarget.classList.remove(
                    'bg-red-900',
                    'text-zinc-900'
                  );
                  e.currentTarget.classList.add(
                    'bg-zinc-800',
                    'text-zinc-300/90'
                  );
                }}
              >
                {TEMP_FOLLOWING ? 'FOLLOWING' : 'FOLLOW'}
              </button>
            )}
          </div>
        </div>

        <div className='relative'>
          <div className='w-23 h-23 rounded-full border border-zinc-800 bg-zinc-800 flex items-center justify-center'>
            <GiCaptainHatProfile className='text-5xl text-zinc-400' />
          </div>

          {isOwner && (
            <>
              <button
                className='absolute -bottom-2 -left-4.5 p-1.5 bg-zinc-900 text-zinc-600 hover:bg-zinc-800 hover:text-zinc-100 rounded-full'
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
              >
                <FaPenFancy size={20} />
              </button>

              <div
                className={`absolute bottom-4.5 -left-10 bg-zinc-800 text-zinc-200 text-xs px-2 py-1 rounded shadow-md transition-opacity duration-200 ${
                  tooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                Edit Profile
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
