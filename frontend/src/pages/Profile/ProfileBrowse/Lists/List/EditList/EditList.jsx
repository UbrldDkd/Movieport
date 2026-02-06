// React
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// API / hooks
import { useGetList } from '../../../../../../api/lists/useGetList';
import { useListHandlers } from './handlers/useListHandlers';

// Components
import EditListHeader from './EditListHeader';
import EditListActions from './EditListActions';
import EditListItems from './EditListItems';

export default function EditList() {
  // routing
  const location = useLocation();
  const { username, title_slug } = useParams();

  // data
  const { list } = useGetList(username, title_slug);

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
    if (!list) return;

    setNewList({ ...list });
    setDraft({ id: list.id });
  }, [list]);

  // debug
  useEffect(() => {
    console.log({ mode, newList });
  }, [mode, newList]);

  // handlers
  const {
    handleChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmitEdit,
    handleClear,
  } = useListHandlers({
    list,
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
            list={list}
            draft={draft}
            view={view}
            mode={mode}
            hasChanges={hasChanges}
            handleAddItem={handleAddItem}
            handleSubmitEdit={handleSubmitEdit}
            handleClear={handleClear}
            setView={setView}
          />

          <EditListItems
            newList={newList}
            view={view}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
}
