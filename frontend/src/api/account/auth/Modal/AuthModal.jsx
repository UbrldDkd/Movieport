import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function AuthModal({ isOpen, onClose, activeTab = 'login' }) {
  const [tab, setTab] = useState(activeTab);

  useEffect(() => {
    setTab(activeTab);
  }, [activeTab, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleClickOutside}
      className={`fixed inset-0 bg-bg-secondary flex items-center justify-center z-50 transition-all duration-250 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-zinc-950/90 rounded-lg px-4 py-3 w-96 shadow-2xl border border-zinc-900 transition-all duration-250 ${
          isOpen ? 'scale-100' : 'scale-95'
        } relative`}
      >
        <button
          onClick={onClose}
          className='absolute top-1 right-1 transition-colors duration-100 text-zinc-400 hover:text-text-primary text-2xl cursor-pointer'
        >
          <IoClose />
        </button>

        <div className='w-full'>
          <h2 className='text-xl text-center font-bold text-text-primary mb-4 capitalize'>
            {tab === 'login' ? 'Log into Movieport' : 'Join Movieport'}
          </h2>
        </div>

        <div>
          {tab === 'login' && (
            <LoginForm
              onClose={onClose}
              switchToRegister={() => setTab('register')}
            />
          )}
          {tab === 'register' && (
            <RegisterForm
              onClose={onClose}
              switchToLogin={() => setTab('login')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
