import React, { useEffect, useState } from 'react';
import { checkAuth } from '../Auth/checkAuth';
import { AuthContext } from './AuthContext';
import { useFetchContentRelations } from '../../contentRelations/useFetchContentRelations';
import { useFetchListsItems } from '../../lists/useFetchListsItems';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch initial auth data
  useEffect(() => {
    checkAuth()
      .then((data) => {
        if (data.isAuthenticated) {
          setUser({
            id: data.id,
            username: data.username,
            contentRelations: data.content_relations || [],
            lists: data.lists || [],
            likedListIds: data.liked_list_ids || [],
          });
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  // Fetch TMDB data for content relations
  useFetchContentRelations(user, setUser);

  // Fetch TMDB data for lists
  useFetchListsItems(user, setUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
