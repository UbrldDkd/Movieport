import { useState, useContext } from 'react';
import { AuthContext } from './auth/AuthContext';
import authApiClient from './auth/authApiClient';

export function useLoginUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthContext);

  const loginUser = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await authApiClient.post('/accounts/login/', formData);

      const data = res.data;

      setUser({
        id: data.id,
        username: data.username,
        contentRelations: data.content_relations || [],
        lists: data.lists || [],
        likedListIds: data.liked_list_ids || [],
      });

      return data;
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Login failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, isLoading, error };
}
