import { useState } from 'react';
import { AuthModalContext } from './AuthModalContext';
import AuthModal from '../AuthModal';

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const openModal = (tab = 'login') => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <AuthModalContext.Provider value={{ openModal, closeModal, setActiveTab }}>
      {children}
      {isOpen && (
        <AuthModal isOpen={isOpen} onClose={closeModal} activeTab={activeTab} />
      )}
    </AuthModalContext.Provider>
  );
}
