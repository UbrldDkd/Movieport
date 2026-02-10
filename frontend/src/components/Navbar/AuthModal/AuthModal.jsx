// React
import { useState, useEffect } from 'react';

// Components
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

export default function AuthModal({ isOpen, onClose, activeTab = 'login' }) {
  const [tab, setTab] = useState(activeTab);

  // Update tab when activeTab prop changes
  useEffect(() => {
    setTab(activeTab);
  }, [activeTab, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Close modal when clicking outside (on the backdrop)
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className={`fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-all duration-250 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-zinc-950/85 rounded-lg px-4 py-3 w-96 shadow-2xl border border-zinc-900 transition-all duration-250 ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute -top-1 right-1.5 text-zinc-400 hover:text-white text-2xl cursor-pointer'
        >
          ×
        </button>

        {/* Tabs */}
        <div className='flex gap-4 mb-4 border-b-2 border-zinc-700'>
          <button
            onClick={() => setTab('login')}
            className={`pb-2 px-4 flex-1 tracking-wider font-semibold transition cursor-pointer ${
              tab === 'login'
                ? 'text-red-950 border-b-2 border-red-950'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setTab('register')}
            className={`pb-2 px-4  flex-1 tracking-widerfont-semibold transition cursor-pointer ${
              tab === 'register'
                ? 'text-red-950 border-b-2 border-red-950'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Register
          </button>
        </div>

        {/* Content */}
        <div>
          {tab === 'login' && <LoginForm onClose={onClose} />}
          {tab === 'register' && <RegisterForm onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}
