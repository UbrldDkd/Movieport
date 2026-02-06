// hooks/useLoginUser.js
import { useState, useContext } from 'react';
import { AuthContext } from './auth/AuthContext';

export default function useLoginUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);

  const loginUser = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await res.json();

      // Set user context
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
      });

      return data;
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
}
