// Icons
import { FaPenFancy } from 'react-icons/fa';
import { GiCaptainHatProfile } from 'react-icons/gi';

// Third-party
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Components
import { Tooltip } from '../../components/Common/Tooltip.jsx';
import FollowButton from './Common/FollowButton.jsx'; // New follow button

// Utils animations
import { fadeInUpVariants } from '../../utils/style/animations/MotionVariants.js';

export default function ProfileCard({ user }) {
  const navigate = useNavigate();
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
    <Motion.div
      variants={fadeInUpVariants}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.1, ease: 'easeOut' }}
      className='px-3 py-2   rounded-r-full flex  md:flex-row items-center justify-between gap-6 bg-bg-secondary'
    >
      {/* Stats section */}
      <div className='flex md:flex-row sm:flex-row flex-col gap-3 sm:gap-0 md:gap-0 items-center  justify-start md:items-center'>
        {stats.map((stat, idx) => (
          <div key={stat.label} className='flex items-center'>
            <Link
              to={stat.link}
              className='flex gap-1  sm:flex-col md:flex-col items-center px-3'
            >
              <span className='text-text-primary text-base font-semibold'>
                {stat.value}
              </span>
              <span className='text-[12px] tracking-widest text-zinc-400/80 font-semibold hover:text-red-900/60 transition-colors'>
                {stat.label}
              </span>
            </Link>
            {idx < stats.length - 1 && (
              <div className='h-10 border-r  border-red-950 mx-1 hidden sm:flex md:flex' />
            )}
          </div>
        ))}
      </div>

      {/* Profile section */}
      <div className='flex md:flex-row  items-center   gap-2 md:gap-6'>
        <div
          className={`flex flex-col gap-2 ${
            !isOwner && 'items-end text-right'
          }`}
        >
          <h1 className='text-2xl text-text-primary'>{username}</h1>

          {/* Follow/unFollow button (only when viewing another profile) */}
          <div className='flex items-center gap-3  '>
            {!isOwner && TEMP_FOLLOWS_YOU && (
              <div className='text-xs text-zinc-400 font-semibold tracking-wider justify-center'>
                Follows you
              </div>
            )}
            {!isOwner && <FollowButton isFollowing={TEMP_FOLLOWING} />}
          </div>
        </div>

        <div className='relative'>
          <div className='w-23 h-23 rounded-full border border-zinc-800 bg-zinc-800 flex items-center justify-center'>
            <GiCaptainHatProfile className='text-5xl text-zinc-400' />
          </div>

          {isOwner && (
            <div className='-mt-6'>
              <Tooltip
                label='Edit Profile'
                position='bottom-5.5 -left-11.25 -mt-2'
              >
                <button
                  onClick={() => navigate(`/settings/`)}
                  className='absolute -bottom-3 -left-4.5 p-1.5 cursor-pointer transition-colors duration-100 bg-bg-secondary text-zinc-600 hover:bg-zinc-800 hover:text-zinc-100 rounded-full'
                >
                  <FaPenFancy size={20} />
                </button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </Motion.div>
  );
}
