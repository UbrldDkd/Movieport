import { createContext, useContext } from 'react';

export const AuthModalContext = createContext({
  openModal: () => {},
  closeModal: () => {},
  setActiveTab: () => {},
});

export const useAuthModal = () => useContext(AuthModalContext);
