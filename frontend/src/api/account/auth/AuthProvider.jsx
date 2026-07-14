import React, { useEffect, useState } from 'react';
import { checkAuth } from './checkAuth';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch initial auth data
  useEffect(() => {
    checkAuth()
      .then((data) => {
        console.log('Auth data:', data);
        if (data.isAuthenticated) {
          setUser({
            ...data,
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
