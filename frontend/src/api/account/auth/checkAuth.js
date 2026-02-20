import authApiClient from './authApiClient';

export const checkAuth = async () => {
  try {
    const res = await authApiClient.get('/accounts/check_auth/');
    const data = res.data;
    return data;
  } catch (err) {
    return { isAuthenticated: false };
  }
};
