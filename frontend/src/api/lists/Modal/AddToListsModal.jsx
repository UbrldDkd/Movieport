import { useState, useContext, useMemo } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AuthContext } from '../../account/auth/AuthContext';
import { useAddItems } from '../useAddItems';
import MiniCreateListModal from './MiniCreateListModal';

export default function AddToListsModal({ item, onClose }) {
  const { user } = useContext(AuthContext);
  const [selectedLists, setSelectedLists] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [search, setSearch] = useState('');
  const [miniModalOpen, setMiniModalOpen] = useState(false);

  console.log('itemtoadd', item);

  const listsToShow = useMemo(() => {
    if (!user?.lists) return [];
    let filtered = user.lists.filter((l) => (isPublic ? l.public : !l.public));
    if (search) {
      filtered = filtered.filter((l) =>
        l.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  }, [user?.lists, isPublic, search]);

  const addItems = useAddItems();

  const handleAdd = () => {
    selectedLists.forEach((lst) => addItems({ listId: lst.id, items: item }));
    setSelectedLists([]);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-999 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/70 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-zinc-900 border z-2 border-zinc-700 rounded-sm p-4 flex flex-col gap-3 w-full max-w-md text-zinc-300/90 shadow-xl transition-all duration-300 ease-out'
      >
        <h2 className='font-semibold  tracking-widest'>
          Add <span className='text-zinc-200'>{item.title}</span> to lists
        </h2>

        {/* Public/Private toggle */}
        <div className='flex gap-2'>
          <button
            className={`flex-1 py-1 transition-all duration-150 hover:cursor-pointer rounded-l-2xl border-2 border-zinc-700 ${
              isPublic
                ? 'bg-red-950 text-zinc-100'
                : 'bg-zinc-800 text-zinc-200'
            }`}
            onClick={() => setIsPublic(true)}
          >
            Public
          </button>
          <button
            className={`flex-1 py-1 transition-all duration-150 hover:cursor-pointer rounded-r-2xl border-2 border-zinc-700 ${
              !isPublic
                ? 'bg-red-950 text-zinc-100'
                : 'bg-zinc-800 text-zinc-200'
            }`}
            onClick={() => setIsPublic(false)}
          >
            Private
          </button>
        </div>

        {/* New list + search */}
        <div className='flex items-center gap-2'>
          <button
            className='flex items-center gap-1 hover:cursor-pointer text-zinc-300 hover:text-zinc-100 transition-colors'
            onClick={() => setMiniModalOpen(true)}
          >
            <AiOutlinePlus size={18} />
            <span className='text-sm'>New list</span>
          </button>
          <input
            type='text'
            placeholder='Search lists'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='ml-auto bg-transparent text-sm text-zinc-200 placeholder-zinc-500 px-2 py-1 outline-none w-36 rounded tracking-wide'
          />
        </div>

        {/* Lists */}
        <div className='flex flex-col gap-2 max-h-48 overflow-y-auto'>
          {listsToShow.map((lst) => {
            const exists = lst.items?.some(
              (i) => Number(i.tmdb_id) === Number(item.tmdb_id)
            );

            const selected = selectedLists.some((l) => l.id === lst.id);

            return (
              <button
                key={lst.id}
                disabled={exists}
                className={`w-full flex justify-between items-center px-3 py-2 rounded-lg transition-colors ${
                  selected
                    ? 'bg-red-950 text-zinc-100'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                } ${exists ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (exists) return;
                  if (selected)
                    setSelectedLists(
                      selectedLists.filter((l) => l.id !== lst.id)
                    );
                  else setSelectedLists([...selectedLists, lst]);
                }}
              >
                <span>{lst.title}</span>
                <div className='flex items-center gap-2'>
                  {exists && <span className='text-zinc-100 text-xs'>✓</span>}
                  <span className='text-zinc-400 text-sm'>
                    {lst.item_count || 0}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected counts */}
        {selectedLists.length > 0 && (
          <div className='text-sm text-zinc-300 tracking-wider mt-2'>
            {selectedLists.filter((l) => l.public).length > 0 && (
              <div>
                {selectedLists.filter((l) => l.public).length} Public list
                selected
              </div>
            )}
            {selectedLists.filter((l) => !l.public).length > 0 && (
              <div>
                {selectedLists.filter((l) => !l.public).length} Private list
                selected
              </div>
            )}
          </div>
        )}

        {/* Add button */}
        <div className='flex justify-end mt-2'>
          <button
            className='px-3 py-1.5 bg-red-950 rounded text-zinc-100'
            onClick={handleAdd}
            disabled={selectedLists.length === 0}
          >
            Add
          </button>
        </div>
      </div>

      {/* Mini Create List Modal */}
      {miniModalOpen && (
        <MiniCreateListModal onClose={() => setMiniModalOpen(false)} />
      )}
    </div>
  );
}
