import { createContext, useContext } from 'react';

export const ListsModalContext = createContext(null);

export function useListsModal() {
  return useContext(ListsModalContext);
}
