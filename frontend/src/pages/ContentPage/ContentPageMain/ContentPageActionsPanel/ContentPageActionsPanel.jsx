import { PiEye, PiEyeClosed } from 'react-icons/pi';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { TbClockPlus, TbClockCheck } from 'react-icons/tb';
import { useToggleContentRelation } from '../../../../api/contentRelations/useToggleContentRelation';
import { useListsModal } from '../../../../api/lists/Modal/Context/ListsModalContext';
import { AuthContext } from '../../../../api/account/auth/AuthContext';
import { useContext } from 'react';
import ContentPageActionsRating from './ContentPageActionsRating';

export default function ContentPageActionsPanel({ item, current, isLoading }) {
  const toggleField = useToggleContentRelation();
  const { openModal } = useListsModal();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <div className='bg-zinc-800 rounded-sm h-fit overflow-visible divide-y-2 divide-zinc-900/90 w-full'>
      {isLoading ? (
        <button className='w-full py-2 md:py-3 px-3 text-xs md:text-sm text-zinc-300/80 font-semibold tracking-wide hover:text-zinc-200 bg-zinc-800/90 cursor-pointer transition-colors active:bg-zinc-700'>
          Share
        </button>
      ) : !isLoggedIn ? (
        <>
          <button className='w-full py-2 md:py-3 px-3 text-sm text-zinc-300/80 font-semibold tracking-wide hover:text-zinc-200 bg-zinc-800/90 cursor-pointer transition-colors active:bg-zinc-700'>
            Log in or register to like, watchlist or review
          </button>
          <button className='w-full py-2 md:py-3 px-3 text-xs md:text-sm text-zinc-300/80 font-semibold tracking-wide hover:text-zinc-200 bg-zinc-800/90 cursor-pointer transition-colors active:bg-zinc-700'>
            Share
          </button>
        </>
      ) : (
        <>
          <div className='flex py-1.5 relative'>
            <div className='relative group flex-1'>
              <button
                onClick={() => toggleField(item, 'watched')}
                className='h-12 md:h-14 w-full flex items-center justify-center text-3xl md:text-4xl text-zinc-400 hover:text-red-900 bg-zinc-800/90 transition-colors active:bg-zinc-700 cursor-pointer'
              >
                {current.watched ? <PiEyeClosed /> : <PiEye />}
              </button>
              <div className='absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50'>
                <div className='bg-zinc-900 text-zinc-300 text-xs px-3 py-1.5 font-semibold tracking-wider rounded-xs whitespace-nowrap'>
                  {current.watched ? 'Remove from watched' : 'Mark as watched'}
                </div>
              </div>
            </div>

            <div className='relative group flex-1'>
              <button
                onClick={() => toggleField(item, 'liked')}
                className='h-12 md:h-14 w-full flex items-center justify-center text-3xl md:text-4xl text-zinc-400 hover:text-red-900 bg-zinc-800/90 transition-colors active:bg-zinc-700 cursor-pointer'
              >
                {current.liked ? <GoHeartFill /> : <GoHeart />}
              </button>
              <div className='absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50'>
                <div className='bg-zinc-900 text-zinc-300 text-xs px-3 py-1.5 font-semibold tracking-wider rounded-xs whitespace-nowrap'>
                  {current.liked ? 'Unlike' : 'Like'}
                </div>
              </div>
            </div>

            <div className='relative group flex-1'>
              <button
                onClick={() => toggleField(item, 'watchlisted')}
                className='h-12 md:h-14 w-full flex items-center justify-center text-3xl md:text-4xl text-zinc-400 hover:text-red-900 bg-zinc-800/90 transition-colors active:bg-zinc-700 cursor-pointer'
              >
                {current.watchlisted ? <TbClockCheck /> : <TbClockPlus />}
              </button>
              <div className='absolute left-1/2 -translate-x-1/2 -top-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50'>
                <div className='bg-zinc-900 text-zinc-300 text-xs px-3 py-1.5 font-semibold tracking-wider rounded-xs whitespace-nowrap'>
                  {current.watchlisted
                    ? 'Remove from watchlist'
                    : 'Add to watchlist'}
                </div>
              </div>
            </div>
          </div>

          <ContentPageActionsRating initialRating={current?.rating || 0} />

          <button className='w-full py-2 md:py-3 px-3 text-xs md:text-sm text-zinc-300/80 hover:text-zinc-200 tracking-wide font-semibold bg-zinc-800/90 cursor-pointer transition-colors active:bg-zinc-700'>
            Show your activity
          </button>

          <button className='w-full py-2 md:py-3 px-3 text-xs md:text-sm text-zinc-300/80 font-semibold tracking-wide hover:text-zinc-200 bg-zinc-800/90 cursor-pointer transition-colors active:bg-zinc-700'>
            Review
          </button>

          <button
            onClick={() => openModal(item)}
            className='w-full py-2 md:py-3 px-3 text-xs md:text-sm text-zinc-300/80 font-semibold tracking-wide hover:text-zinc-200 bg-zinc-800/90 cursor-pointer transition-colors active:bg-zinc-700'
          >
            Add to lists
          </button>

          <button className='w-full py-2 md:py-3 rounded-b-sm px-3 text-xs md:text-sm text-zinc-300/80 font-semibold tracking-wide hover:text-zinc-200 bg-zinc-800/90 cursor-pointer transition-colors active:bg-zinc-700'>
            Share
          </button>
        </>
      )}
    </div>
  );
}
