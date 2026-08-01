import { createContext, useContext } from 'react';

export const ReviewModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
});

export function useReviewModal() {
  return useContext(ReviewModalContext);
}
