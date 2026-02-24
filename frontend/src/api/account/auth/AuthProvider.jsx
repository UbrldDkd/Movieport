import React, { useEffect, useState } from 'react';
import { checkAuth } from './checkAuth';
import { AuthContext } from './AuthContext';

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
            content_relations: data.content_relations || [],
            lists: data.lists || [],
            liked_list_ids: data.liked_list_ids || [],
          });
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
