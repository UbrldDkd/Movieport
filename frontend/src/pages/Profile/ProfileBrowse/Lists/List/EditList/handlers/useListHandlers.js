import { useAddItems } from '../../../../../../../api/lists/useAddItems';
import { useRemoveItems } from '../../../../../../../api/lists/useRemoveItems';
import { useUpdateList } from '../../../../../../../api/lists/useUpdateList';
import { useCreateList } from '../../../../../../../api/lists/useCreateList';
import { AuthContext } from '../../../../../../../api/account/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

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

  // Helper to normalize empty values
  const normalize = (v) =>
    v === '' || v === null || v === undefined ? null : v;

  const handleChange = (field, value) => {
    const next = normalize(value);
    const original = normalize(list?.[field]);

    // Update the working copy of the list in edit mode, set values for payload in create mode
    setNewList((prev) => ({ ...prev, [field]: value }));

    // Track changes in draft if in edit mode
    if (mode === 'edit') {
      setDraft((prev) => {
        if (!prev) prev = {};

        if (next !== original) {
          return { ...prev, [field]: value };
        } else {
          const { [field]: _, ...rest } = prev;
          return rest;
        }
      });
    }
  };

  const handleRemoveItem = (tmdb) => {
    const tmdb_id = tmdb.id;
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

    // Skip if item already exists
    if (newList.items.some((i) => i.tmdb_id === tmdb_id)) return;

    // Use contentRelations context if item exists there
    const existingItem = user?.contentRelations.find(
      (cr) => Number(cr.tmdb_id) === Number(tmdb_id)
    );

    // Build the complete item object with all necessary fields for the backend
    const newItem = existingItem
      ? existingItem // Use existing relation as-is since it has all fields
      : {
          tmdb_id,
          title: item.title || item.movie_title || item.name || '',
          poster_path: item.poster_path || '',
          release_date: item.release_date || item.first_air_date || null,
          media_type:
            item.media_type ||
            (item.title || item.movie_title ? 'movie' : 'tv'),
        };

    // Update the list optimistically
    setNewList((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    // Track the complete item object (not just ID) for backend submission
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
        await addItems({ listId: draft?.id, tmdb_id: itemsToAdd });
      }
      if (itemsToRemove.length > 0) {
        await removeItems({ listId: draft?.id, tmdb_id: itemsToRemove });
      }

      // Clear draft tracking
      setDraft({});
      setItemsToAdd([]);
      setItemsToRemove([]);
    }

    if (mode === 'create') {
      // Prepare payload for creation
      const { items, ...rest } = newList;
      const payload = {
        ...rest,
        items: items?.map((item) => ({ tmdb_id: item.tmdb_id })) || [],
      };
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
