const RegisterUser = async (formData, setError, setIsLoading) => {
  setIsLoading(true);
  setError('');

  try {
    const res = await fetch('http://127.0.0.1:8000/accounts/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMessages = Object.values(data).flat().join(' ');
      throw new Error(errorMessages);
    }

    console.log('Registration successful:', data);
    return data;
  } catch (err) {
    setError(err.message);
    console.error('Registration error:', err);
  } finally {
    setIsLoading(false);
  }
};

export default RegisterUser;
