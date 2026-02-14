import React, { useState, useContext } from 'react';
import RegisterUser from '../../RegisterUser.js';
import { AuthContext } from '../AuthContext';

export default function RegisterForm({ onClose, switchToLogin }) {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [over16AndTerms, setOver16AndTerms] = useState(false);
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateInput(value, type) {
    const trimmed = value.trim();

    if (type === 'username') {
      if (trimmed.length === 0) return { error: 'Username is required' };
      if (trimmed.length > 150)
        return { error: 'Username must be 150 characters or less' };
      const usernameRegex = /^[\w.@+-]+$/;
      if (!usernameRegex.test(trimmed))
        return {
          error: 'Username can only contain letters, numbers, and . @ + - _',
        };
    }

    if (type === 'email') {
      if (trimmed.length === 0) return { error: 'Email is required' };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return { error: 'Invalid email format' };
    }

    if (type === 'password') {
      if (trimmed.length === 0) return { error: 'Password is required' };
    }

    if (type === 'phone' && trimmed.length > 0) {
      const phoneRegex = /^[0-9+\-\s()]*$/;
      if (!phoneRegex.test(trimmed))
        return { error: 'Phone can only contain numbers and + - ( )' };
    }

    return { value: trimmed };
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const usernameResult = validateInput(formData.username, 'username');
    if (usernameResult.error) return setError(usernameResult.error);

    const emailResult = validateInput(formData.email, 'email');
    if (emailResult.error) return setError(emailResult.error);

    const passwordResult = validateInput(formData.password, 'password');
    if (passwordResult.error) return setError(passwordResult.error);

    if (formData.phone) {
      const phoneResult = validateInput(formData.phone, 'phone');
      if (phoneResult.error) return setError(phoneResult.error);
    }

    if (!over16AndTerms)
      return setError('You must be over 16 and accept the terms of use');
    if (!acceptPrivacyPolicy)
      return setError('You must accept the privacy policy');
    if (!isHuman) return setError('Please confirm you are human');

    try {
      const sanitizedData = {
        username: usernameResult.value,
        email: emailResult.value,
        password: passwordResult.value,
        phone: formData.phone
          ? validateInput(formData.phone, 'phone').value
          : '',
      };

      const data = await RegisterUser(
        sanitizedData,
        setError,
        setIsLoading,
        setUser
      );
      console.log('Registration data:', data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div>
        <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-2'>
          Username
        </label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          className='w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 px-3 py-1 rounded focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200'
          required
        />
      </div>

      <div>
        <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-2'>
          Email
        </label>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 px-3 py-1 rounded focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200'
          required
        />
      </div>

      <div>
        <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-2'>
          Password
        </label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          className='w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 px-3 py-1 rounded focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200'
          required
        />
      </div>

      <div>
        <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-2'>
          Phone (Optional)
        </label>
        <input
          type='tel'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          className='w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 px-3 py-1 rounded focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200'
        />
      </div>

      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          id='over16AndTerms'
          checked={over16AndTerms}
          onChange={(e) => setOver16AndTerms(e.target.checked)}
          className='w-4 h-4 mt-0.5 cursor-pointer'
        />
        <label
          htmlFor='over16AndTerms'
          className='text-xs text-zinc-300 cursor-pointer'
        >
          I am over 16 years old and accept the terms of use
        </label>
      </div>

      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          id='acceptPrivacyPolicy'
          checked={acceptPrivacyPolicy}
          onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
          className='w-4 h-4 mt-0.5 cursor-pointer'
        />
        <label
          htmlFor='acceptPrivacyPolicy'
          className='text-xs text-zinc-300 cursor-pointer'
        >
          I accept privacy policy
        </label>
      </div>

      <div className='flex items-start gap-2'>
        <input
          type='checkbox'
          id='isHuman'
          checked={isHuman}
          onChange={(e) => setIsHuman(e.target.checked)}
          className='w-4 h-4 mt-0.5 cursor-pointer'
        />
        <label
          htmlFor='isHuman'
          className='text-xs text-zinc-300 cursor-pointer'
        >
          I am human
        </label>
      </div>

      {error && <p className='text-red-500 text-xs'>{error}</p>}

      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-red-950 hover:bg-red-900 text-white font-semibold py-1.5 rounded transition disabled:opacity-50 cursor-pointer'
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>

      <p className='text-center text-xs text-zinc-400'>
        Already have an account?{' '}
        <button
          type='button'
          onClick={switchToLogin}
          className='text-red-950 hover:text-red-900 font-semibold cursor-pointer'
        >
          Login
        </button>
      </p>
    </form>
  );
}
