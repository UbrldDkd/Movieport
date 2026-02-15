// React
import { useContext } from 'react';

// Icons
import { FaHeart } from 'react-icons/fa';
import { IoShareSocialSharp } from 'react-icons/io5';

// Third-party
import { Link, useNavigate } from 'react-router-dom';

// API hooks
import { useUpdateList } from '../../../../../api/lists/useUpdateList';
import { useDeleteList } from '../../../../../api/lists/useDeleteList';
import { useToggleLikeList } from '../../../../../api/lists/useToggleLikeList';

// Context
import { AuthContext } from '../../../../../api/account/auth/AuthContext';

export default function ListActions({ username, list }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const updateList = useUpdateList();
  const deleteList = useDeleteList();
  const { toggleLike, isLoading: isTogglingLike } = useToggleLikeList();

  const is_owner = list?.is_owner;
  const listId = list?.id;
  const isPublic = list?.public;
  const title_slug = list?.title_slug;

  const listIsLiked = user?.likedListIds?.includes(listId);

  const handleDelete = async () => {
    await deleteList(listId);
    navigate(`/${username}/lists/`);
  };

  const handleTogglePublic = async () => {
    await updateList({ id: listId, public: !isPublic });
  };

  const handleToggleLike = async () => {
    if (!user) return navigate('/login');
    if (is_owner) return alert('You cannot like your own list');
    await toggleLike(listId);
  };

  return (
    <div className='bg-zinc-900/90  rounded-sm p-2 flex flex-col gap-2 opacity-0 animate-fadeIn'>
      {/* Likes / Share */}
      {is_owner ? (
        <div className='flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold tracking-widest text-zinc-300/90 rounded'>
          <FaHeart className='text-zinc-500/90' />
          {list?.likes_count ?? 0} likes
        </div>
      ) : (
        <>
          <button
            onClick={handleToggleLike}
            disabled={isTogglingLike}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-widest rounded transition-colors ${
              isTogglingLike
                ? 'opacity-50 cursor-not-allowed bg-zinc-800/90 text-zinc-300'
                : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:cursor-pointer'
            }`}
          >
            <FaHeart
              className={listIsLiked ? 'text-red-900' : 'text-zinc-500'}
            />
            {isTogglingLike
              ? 'Loading...'
              : listIsLiked
                ? 'Unlike this list'
                : 'Like this list'}
          </button>

          <button className='flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-widest rounded bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer text-zinc-300 transition-colors'>
            <IoShareSocialSharp className='text-[17px]' />
            Share
          </button>
        </>
      )}

      {/* Owner actions */}
      {is_owner && (
        <>
          <Link
            to={`/${username}/list/${title_slug}/edit/`}
            className='block text-center px-3 py-2 text-xs font-semibold tracking-widest rounded bg-zinc-800/90 hover:bg-zinc-700 hover:cursor-pointer transition-colors'
          >
            Edit List Details
          </Link>

          <button
            onClick={handleTogglePublic}
            className='px-3 py-2 text-xs font-semibold tracking-widest rounded bg-zinc-800/90 hover:bg-zinc-700 hover:cursor-pointer text-zinc-300 transition-colors'
          >
            Make List {isPublic ? 'Private' : 'Public'}
          </button>

          <button
            onClick={handleDelete}
            className='px-3 py-2 text-xs font-semibold tracking-widest rounded bg-zinc-800/90 hover:bg-red-950 hover:cursor-pointer text-zinc-300 transition-colors'
          >
            Delete List
          </button>
        </>
      )}
    </div>
  );
}
