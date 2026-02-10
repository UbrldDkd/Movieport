import { useAddItems } from '../../../../../../../api/lists/useAddItems';
import { useRemoveItems } from '../../../../../../../api/lists/useRemoveItems';
import { useUpdateList } from '../../../../../../../api/lists/useUpdateList';
import { useCreateList } from '../../../../../../../api/lists/useCreateList';
import { AuthContext } from '../../../../../../../api/account/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Keys } from '../../../../../../../utils/constants/Keys';
import { cleanItem } from '../../../../../../../utils/helpers/cleanItem';

export function useListHandlers({
  username,
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
}) {
  const navigate = useNavigate();
  const addItems = useAddItems();
  const removeItems = useRemoveItems();
  const updateList = useUpdateList();
  const createList = useCreateList();

  const { user } = useContext(AuthContext);

  const { details } = Keys.API1;

  // Helper to normalize empty values
  const normalize = (v) =>
    v === '' || v === null || v === undefined ? null : v;

  const handleChange = (field, value) => {
    const newValue = normalize(value);
    const oldValue = normalize(list?.[field]);

    // Update the working copy of the list in edit mode, set values for payload in create mode
    setNewList((prev) => ({ ...prev, [field]: value }));

    // Track changes in draft if in edit mode
    if (mode === 'edit') {
      setDraft((prev) => {
        if (!prev) prev = {};

        if (newValue !== oldValue) {
          return { ...prev, [field]: value };
        } else {
          const { [field]: _, ...rest } = prev;
          return rest;
        }
      });
    }
  };

  const handleRemoveItem = (tmdb_id) => {
    const inOriginal = list.items.some((i) => i.tmdb_id === tmdb_id);

    // Remove item from newList (both create and edit mode)
    setNewList((prev) => ({
      ...prev,
      items: prev.items.filter((i) => i.tmdb_id !== tmdb_id),
    }));

    if (mode === 'edit') {
      // Remove from itemsToAdd if it was added during this edit session
      setItemsToAdd((prev) => prev.filter((i) => i !== tmdb_id));

      // Track in itemsToRemove if it existed originally
      if (inOriginal) {
        setItemsToRemove((prev) =>
          prev.includes(tmdb_id) ? prev : [...prev, tmdb_id]
        );
      }
    }
  };

  const handleAddItem = (item) => {
    const tmdb_id = item.tmdb_id;
    console.log('item to add', item);

    // Skip if item already exists
    if (newList.items.some((i) => i.tmdb_id === tmdb_id)) return;

    // Use contentRelations context if item exists there
    const existingItem = user?.contentRelations.find(
      (cr) => Number(cr.tmdb_id) === Number(tmdb_id)
    );

    const cleanItem = cleanItem(item);

    // Build the complete item object with all necessary fields for the backend
    const newItem = existingItem
      ? existingItem // Use existing relation as-is since it has all fields
      : cleanItem;

    // Update the list optimistically
    setNewList((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    // Track the complete item object for backend submission
    setItemsToAdd((prev) => {
      // Skip if this item is already in itemsToAdd
      if (prev.some((i) => i.tmdb_id === tmdb_id)) return prev;
      return [...prev, newItem];
    });

    // Remove from itemsToRemove if present (when editing existing list)
    if (mode === 'edit') {
      setItemsToRemove((prev) => prev.filter((i) => i.tmdb_id !== tmdb_id));
    }
  };

  // Submit all changes: updates fields, adds new items, removes deleted items
  const handleSubmitEdit = async () => {
    if (mode === 'edit') {
      // Update list fields if draft has changes
      if (draft?.id && Object.keys(draft).length > 0) {
        await updateList(draft);
      }

      // Update items
      if (itemsToAdd.length > 0) {
        await addItems({ listId: draft?.id, items: itemsToAdd });
      }
      if (itemsToRemove.length > 0) {
        await removeItems({ listId: draft?.id, tmdbIds: itemsToRemove });
      }

      // Clear draft tracking
      setDraft({});
      setItemsToAdd([]);
      setItemsToRemove([]);
    }

    if (mode === 'create') {
      // Prepare payload for creation
      const payload = newList;
      const listCreated = await createList(payload);
      if (listCreated.ok) {
        navigate(`/${username}/lists/`);
      }
    }
  };
  // Clears the current changes
  const handleClear = () => {
    setDraft({});
    setItemsToAdd([]);
    setItemsToRemove([]);

    if (mode === 'edit') {
      setNewList(list); // reset to original list
    }

    if (mode === 'create') {
      setNewList({
        title: '',
        description: '',
        public: false,
        items: [],
      });
    }
  };
  return {
    handleChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmitEdit,
    handleClear,
  };
}
