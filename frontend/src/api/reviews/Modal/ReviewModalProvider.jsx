import { useMemo, useState } from 'react';
import { ReviewModalContext } from './ReviewModalContext';
import ReviewModal from '../../../components/Review/ReviewModal/ReviewModal';

export function ReviewModalProvider({ children }) {
  const [modalState, setModalState] = useState({ isOpen: false, item: null });

  const openModal = (item) => setModalState({ isOpen: true, item });
  const closeModal = () => setModalState({ isOpen: false, item: null });

  const value = useMemo(
    () => ({
      openModal,
      closeModal,
      modalState,
    }),
    [modalState]
  );

  return (
    <ReviewModalContext.Provider value={value}>
      {children}
      {modalState.isOpen && (
        <ReviewModal item={modalState.item} onClose={closeModal} />
      )}
    </ReviewModalContext.Provider>
  );
}
