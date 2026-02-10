import { useLogoutUser } from '../../../api/account/useLogoutUser.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ onCloseDropdown }) {
  const logoutUser = useLogoutUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const result = await logoutUser();

      if (result?.success) {
        if (typeof onCloseDropdown === 'function') {
          onCloseDropdown();
        }
        navigate('/');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className='px-4 py-2 hover:bg-zinc-800 font-semibold tracking-wide text-start hover:cursor-pointer'
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
