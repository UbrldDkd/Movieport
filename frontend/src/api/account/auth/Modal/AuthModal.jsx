import { useState, useEffect } from 'react';
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
      className={`fixed inset-0 bg-zinc-900/95 backdrop-blur-3xl flex items-center justify-center z-50 transition-all duration-250 ${
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
          className='absolute -top-1 right-1.5 text-zinc-400 hover:text-white text-2xl cursor-pointer'
        >
          ×
        </button>

        <div className='w-full'>
          <h2 className='text-xl text-center font-bold text-zinc-300 mb-4 capitalize'>
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
