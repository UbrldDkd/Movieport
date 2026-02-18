import authApiClient from './authApiClient';

export const checkAuth = async () => {
  try {
    const res = await authApiClient.get('/accounts/check_auth/');
    const data = res.data;
    console.log('CheckAuth response:', data);
    return data;
  } catch (err) {
    console.error('CheckAuth error:', err);
    return { isAuthenticated: false };
  }
};
