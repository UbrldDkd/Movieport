export const checkAuth = async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/accounts/check_auth/', {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      console.log('Failed to check auth', res.status);
      return { isAuthenticated: false };
    }

    const data = await res.json();
    console.log('CheckAuth response:', data);
    return data;
  } catch (err) {
    console.error('CheckAuth error:', err);
    return { isAuthenticated: false };
  }
};
