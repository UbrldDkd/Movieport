import React, { useState } from 'react';
import { FaPenFancy } from 'react-icons/fa';
import { GiCaptainHatProfile } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export default function ProfileCard({ user }) {
  const [tooltip, setTooltip] = useState(false);

  if (!user) return;

  const { username, lists, contentRelations, is_owner } = user;
  const loading = !user;

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

  return (
    <div className='px-3 py-2.5 my-2 border  border-zinc-800/10 rounded-r-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 bg-zinc-900/70 '>
      <div
        className={`flex transition-opacity duration-120 items-center ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        {stats.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            <Link
              to={stat.link}
              className='flex flex-col items-center px-3 cursor-pointer'
            >
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
          </React.Fragment>
        ))}
      </div>

      <div className='flex items-center gap-6'>
        {!user?.is_owner && (
          <button className='text-zinc-300/90 bg-zinc-800 text-xs font-semibold tracking-widest  py-1 rounded-xs hover:cursor-pointer px-2'>
            {!TEMP_FOLLOWING ? 'FOLLOW' : 'FOLLOWING'}
          </button>
        )}

        <h1 className='text-2xl text-zinc-200'>{username}</h1>

        <div className='relative '>
          <div className='w-23 h-23 rounded-full object-cover border border-zinc-800 bg-zinc-800 flex items-center justify-center'>
            <GiCaptainHatProfile className='text-5xl text-zinc-400' />
          </div>
          {is_owner && (
            <>
              <button
                className='absolute -bottom-2 -left-4.5 p-1.5 bg-zinc-900 text-zinc-600 transition-colors duration-120 hover:bg-zinc-800 hover:text-zinc-100 rounded-full cursor-pointer'
                onMouseEnter={() => setTooltip(true)}
                onMouseLeave={() => setTooltip(false)}
              >
                <FaPenFancy size={20} />
              </button>

              <div
                className={`absolute bottom-4.5 -left-10 justify-center mb-2 bg-zinc-800 text-zinc-200 text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-50  transition-opacity duration-200 ${
                  tooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                Edit Profile
                <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-zinc-800' />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
