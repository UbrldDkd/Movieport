import { useState } from 'react';
import { ListsModalContext } from './ListsModalContext';
import AddToListsModal from '../AddToListsModal';

export function ListsModalProvider({ children }) {
  const [itemToAdd, setItemToAdd] = useState(null);

  const openModal = (item) => setItemToAdd(item);
  const closeModal = () => setItemToAdd(null);

  return (
    <ListsModalContext.Provider value={{ openModal, setItemToAdd }}>
      {children}

      {/* Global modal rendered once inside provider */}
      {itemToAdd && <AddToListsModal item={itemToAdd} onClose={closeModal} />}
    </ListsModalContext.Provider>
  );
}
