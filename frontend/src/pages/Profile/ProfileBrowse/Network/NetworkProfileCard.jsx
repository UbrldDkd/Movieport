import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaListUl,
  FaEye,
  FaUserCheck,
  FaUserFriends,
} from 'react-icons/fa';
import Pfp from '../../../../components/Common/Pfp';
import { Tooltip } from '../../../../components/Common/Tooltip';

export default function NetworkProfileCard({ profile }) {
  return (
    <div className='flex items-center justify-between gap-3 rounded-sm border border-zinc-800/70 bg-zinc-900/60 px-2 py-2'>
      <div className='flex min-w-0 flex-1 items-center gap-3'>
        <Link
          to={`/${profile.username}/`}
          className='shrink-0 transition-opacity duration-200 hover:opacity-80'
        >
          <Pfp
            avatar={profile.avatar}
            size='sm'
            className='border-zinc-700 shrink-0'
          />
        </Link>

        <div className='flex min-w-0 flex-1 items-center justify-between gap-3'>
          <div className='min-w-0'>
            <Link
              to={`/${profile.username}/`}
              className='block truncate text-sm font-semibold tracking-wider text-text-primary transition-colors duration-200 hover:text-zinc-200'
            >
              {profile.username}
            </Link>
            <div className='mt-1 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500'>
              <span className='flex items-center gap-1'>
                <span>{profile.following_count} following</span>
              </span>
              <span className='flex items-center gap-1'>
                <span>
                  {profile.followers_count}{' '}
                  {`${profile.followers_count === 1 ? 'follower' : 'followers'}`}
                </span>
              </span>
            </div>
          </div>

          <div className='flex shrink-0 items-center gap-4 text-[10px] font-medium uppercase text-zinc-400'>
            <Tooltip
              label={`${profile.tv_likes_count} ${profile.tv_likes_count === 1 ? 'TV show' : 'TV shows'} and ${profile.film_likes_count} ${profile.film_likes_count === 1 ? 'Film' : 'Films'} liked`}
              position='bottom-full left-1/2 -translate-x-1/2'
            >
              <Link
                to={`/${profile.username}/likes/films/`}
                className='flex items-center gap-2 cursor-pointer text-zinc-400 transition-all duration-200 hover:text-zinc-200'
              >
                <FaHeart size={19} className='text-zinc-500' />
                <span>{profile.likes_count}</span>
              </Link>
            </Tooltip>

            <Tooltip
              label={`${profile.lists_count} ${profile.lists_count === 1 ? 'list' : 'lists'} `}
              position='bottom-full left-1/2 -translate-x-1/2'
            >
              <Link
                to={`/${profile.username}/lists/`}
                className='flex items-center gap-2 cursor-pointer text-zinc-400 transition-all duration-200 hover:text-zinc-200'
              >
                <FaListUl size={19} className='text-zinc-500' />
                <span>{profile.lists_count}</span>
              </Link>
            </Tooltip>

            <Tooltip
              label={`${profile.film_watched_count} ${profile.film_watched_count === 1 ? 'film' : 'films'} and ${profile.tv_watched_count} ${profile.tv_watched_count === 1 ? 'TV show' : 'TV shows'} watched`}
              position='bottom-full left-1/2 -translate-x-1/2'
            >
              <Link
                to={`/${profile.username}/watched/`}
                className='flex items-center gap-2 cursor-pointer text-zinc-400 transition-all duration-200 hover:text-zinc-200'
              >
                <FaEye size={19} className='text-zinc-500' />
                <span>{profile.watched_count}</span>
              </Link>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
