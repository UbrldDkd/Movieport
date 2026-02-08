import { useLogoutUser } from '../../../api/account/useLogoutUser.js';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../api/account/auth/AuthContext.js';

export default function LogoutButton() {
  const logoutUser = useLogoutUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const result = await logoutUser();
      console.log(result.message);

      // clear user context
      setUser(null);

      // navigate to home
      navigate('/');
    } catch {
      // error already logged in the hook
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
