import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaList, FaThLarge } from 'react-icons/fa';

import { useDeleteList } from '../../../../../../api/lists/useDeleteList';
import { useFetchPreview } from '../../../../../../components/Navigation/Search/hooks/useFetchPreview';
import { Keys } from '../../../../../../utils/Keys';
import EditListActionsDropdown from './EditListActionsDropdown';

export default function EditListActions({
  username,
  list,
  view,
  mode,
  hasChanges,
  handleAddItem,
  handleSubmitEdit,
  handleClear,
  setView,
}) {
  const navigate = useNavigate();
  const deleteList = useDeleteList();
  const { details } = Keys.API1;

  const [searchVal, setSearchVal] = useState('');
  const [isLoading, setIsLoading] = useState({
    deleting: false,
    saving: false,
  });

  const { previewContent } = useFetchPreview(searchVal);

  const handleSubmit = async () => {
    setIsLoading((prev) => ({ ...prev, saving: true }));
    if (mode === 'edit') {
      await handleSubmitEdit();
      setIsLoading((prev) => ({ ...prev, saving: false }));
    }
    if (mode === 'create') {
      await handleSubmitEdit();
      navigate(`/${username}/lists/`);
    }
  };

  const handleDelete = async () => {
    setIsLoading((prev) => ({ ...prev, deleting: true }));
    await deleteList(list.id);
    navigate(`/${username}/lists/`);
  };

  const handleCancel = () => {
    if (mode === 'edit') {
      if (hasChanges) {
        handleClear();
      } else {
        navigate(`/${username}/list/${list.title_slug}/`);
      }
    }
    if (mode === 'create') {
      navigate(`/${username}/lists/`);
    }
  };

  return (
    <div className='flex flex-col gap-2 mb-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <div className='flex flex-wrap gap-1'>
          <button
            onClick={handleSubmit}
            disabled={isLoading.saving || !hasChanges || isLoading.deleting}
            className='bg-zinc-800/90 px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isLoading.saving ? 'SAVING...' : 'SAVE'}
          </button>

          {mode === 'edit' ? (
            <button
              onClick={handleCancel}
              disabled={isLoading.deleting}
              className='bg-zinc-800/90 px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {hasChanges ? 'Clear changes' : 'View list'}
            </button>
          ) : (
            <button
              onClick={handleCancel}
              disabled={isLoading.saving}
              className='bg-zinc-800/90 px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700/90 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Cancel
            </button>
          )}

          {mode === 'edit' && (
            <button
              onClick={handleDelete}
              disabled={isLoading.deleting}
              className='bg-zinc-800/90 px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-red-950 text-[10px] font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading.deleting ? 'DELETING...' : 'DELETE'}
            </button>
          )}
        </div>

        <div className='flex gap-1'>
          <button
            className={`p-1.5 transition-colors hover:cursor-pointer duration-120 rounded-sm ${
              view === 'grid'
                ? 'bg-zinc-700/90'
                : 'bg-zinc-800/90 hover:bg-zinc-700'
            }`}
            onClick={() => setView('grid')}
          >
            <FaThLarge />
          </button>

          <button
            className={`p-1.5 transition-colors hover:cursor-pointer duration-120 rounded-sm ${
              view === 'list'
                ? 'bg-zinc-700/90'
                : 'bg-zinc-800/90 hover:bg-zinc-700'
            }`}
            onClick={() => setView('list')}
          >
            <FaList />
          </button>
        </div>

        <EditListActionsDropdown
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          previewContent={previewContent}
          handleAddItem={handleAddItem}
          details={details}
          disabled={isLoading.saving}
        />
      </div>
    </div>
  );
}
