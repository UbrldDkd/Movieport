import { useState } from 'react';
import { ListsModalContext } from './ListsModalContext';
import AddToListsModal from '../AddToListsModal';

export function ListsModalProvider({ children }) {
  const [tmdbId, setTmdbId] = useState(null);

  const openModal = (id) => setTmdbId(id);
  const closeModal = () => setTmdbId(null);

  return (
    <ListsModalContext.Provider value={{ openModal, setTmdbId }}>
      {children}

      {/* Global modal rendered once inside provider */}
      {tmdbId && <AddToListsModal tmdb_id={tmdbId} onClose={closeModal} />}
    </ListsModalContext.Provider>
  );
}
