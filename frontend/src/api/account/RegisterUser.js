import authApiClient from './auth/authApiClient';

const RegisterUser = async (formData, setError, setIsLoading, setUser) => {
  setIsLoading(true);
  setError('');

  try {
    const res = await authApiClient.post('/accounts/register/', formData);
    const data = res.data;

    if (setUser) {
      setUser({
        id: data.id,
        username: data.username,
        contentRelations: data.content_relations || [],
        lists: data.lists || [],
        likedListIds: data.liked_list_ids || []
      });
    }

    console.log('Registration successful:', data);
    return data;
  } catch (err) {
    const errorMessages = err.response?.data
      ? Object.values(err.response.data).flat().join(' ')
      : err.message || 'Registration failed';
    setError(errorMessages);
    console.error('Registration error:', err);
    return null;
  } finally {
    setIsLoading(false);
  }
};

export default RegisterUser;