// React / router
import { useNavigate } from 'react-router-dom';

// Components
import ListCard from '../../../../components/List/ListCard';

export default function ProfileLists({ lists, username, isOwner }) {
  // routing
  const navigate = useNavigate();
  const createListURL = `/${username}/list/create/`;
  const filteredLists = isOwner ? lists : lists.filter((l) => l.public);

  // guards
  if (!username && !lists) return null;

  return (
    <div
      className={`grid grid-cols-1 ${isOwner && 'md:grid-cols-[3fr_1fr]'} gap-2.5`}
    >
      {/* Lists */}
      <div className='bg-zinc-900/90 border border-zinc-800/90 rounded-sm p-3 w-full text-zinc-200'>
        <h2 className='text-xs font-semibold tracking-widest mb-3'>
          {isOwner ? 'YOUR LISTS' : 'LISTS'}
        </h2>

        <div className='flex flex-col'>
          {filteredLists?.map((list, idx) => (
            <div key={list.id}>
              <ListCard
                list={list}
                username={username}
                posterAmount={isOwner ? 6 : 10}
              />

              {idx !== filteredLists.length - 1 && (
                <div className='h-px bg-zinc-700/60 my-2' />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      {isOwner && (
        <div className='bg-zinc-900/90 border  border-zinc-800/90 rounded-sm p-2 text-zinc-200 flex flex-col gap-2'>
          <button
            onClick={() => navigate(createListURL)}
            className='bg-zinc-800/90 hover:cursor-pointer font-semibold hover:bg-zinc-700 px-3 py-2 rounded tracking-widest text-start text-xs'
          >
            Create New List
          </button>
        </div>
      )}
    </div>
  );
}
