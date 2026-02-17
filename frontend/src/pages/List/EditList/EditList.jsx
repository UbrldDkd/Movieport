// React
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// API hooks
import { useGetList } from '../../../api/lists/useGetList';
import { useListHandlers } from './handlers/useListHandlers';

// Components
import EditListHeader from './EditListHeader';
import EditListActions from './EditListActions';
import EditListItemsDisplay from './EditListItemsDisplay';
import PageContainer from '../../../components/WrapperContainers/PageContainer';

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

  const hasChanges =
    mode === 'edit'
      ? Object.keys(draft).filter((key) => key !== 'id').length > 0 ||
        itemsToAdd.length > 0 ||
        itemsToRemove.length > 0
      : Boolean(newList?.title?.trim());

  return (
    <PageContainer>
      <div className='bg-zinc-900/90  max-w-[1020] rounded-sm p-3 overflow-visible'>
        <div className='text-[22px] font-semibold tracking-wider text-zinc-300/90 pb-3'>
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
    </PageContainer>
  );
}
