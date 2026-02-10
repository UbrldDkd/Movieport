// React
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// API hooks
import { useGetList } from '../../../../../../api/lists/useGetList';
import { useListHandlers } from './handlers/useListHandlers';

// Components
import EditListHeader from './EditListHeader';
import EditListActions from './EditListActions';
import EditListItemsDisplay from './EditListItemsDisplay';

export default function EditList() {
  const location = useLocation();
  const { username, title_slug } = useParams();

  const { list: originalList } = useGetList(username, title_slug);

  // working list state (edit or create)
  const [newList, setNewList] = useState({
    title: '',
    description: '',
    public: true,
    items: [],
  });

  // edit tracking
  const [draft, setDraft] = useState({});
  const [itemsToAdd, setItemsToAdd] = useState([]);
  const [itemsToRemove, setItemsToRemove] = useState([]);

  // ui state
  const [view, setView] = useState('list');
  // edit or create state
  const [mode, setMode] = useState(null);

  // detect mode from url
  useEffect(() => {
    if (location.pathname.includes('edit')) {
      setMode('edit');
    }

    if (location.pathname.includes('create')) {
      setMode('create');
      setDraft({});
      setItemsToAdd([]);
      setItemsToRemove([]);
    }
  }, [location.pathname]);

  // initialize state from fetched list
  useEffect(() => {
    if (!originalList) return;

    setNewList({ ...originalList });
    setDraft({ id: originalList.id });
  }, [originalList]);

  // handlers
  const {
    handleChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmitEdit,
    handleClear,
  } = useListHandlers({
    originalList,
    newList,
    draft,
    itemsToAdd,
    itemsToRemove,
    mode,
    setNewList,
    setDraft,
    setItemsToAdd,
    setItemsToRemove,
  });

  // unsaved changes detection
  const hasChanges =
    mode === 'edit'
      ? Object.keys(draft).filter((key) => key !== 'id').length > 0 ||
        itemsToAdd.length > 0 ||
        itemsToRemove.length > 0
      : newList?.title.trim() !== '' ||
        newList?.description.trim() !== '' ||
        newList?.public !== true ||
        (newList?.items?.length ?? 0) > 0;

  return (
    <div className='min-h-screen h-full bg-zinc-950 text-zinc-300/90 md:px-20 sm:px-5 lg:px-58'>
      <div className='max-w-7xl mx-auto pt-2'>
        <div className='bg-zinc-900/90 border border-zinc-800 rounded-sm px-4 py-3 overflow-visible'>
          <div className='text-[22px] text-zinc-300/90 pb-3'>
            {mode === 'edit'
              ? 'Edit list'
              : mode === 'create'
                ? 'Create List'
                : ''}
          </div>

          <EditListHeader newList={newList} handleChange={handleChange} />

          <EditListActions
            username={username}
            list={originalList}
            draft={draft}
            view={view}
            mode={mode}
            hasChanges={hasChanges}
            handleAddItem={handleAddItem}
            handleSubmitEdit={handleSubmitEdit}
            handleClear={handleClear}
            setView={setView}
          />

          <EditListItemsDisplay
            items={newList?.items}
            view={view}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
}
