import React, { useState } from 'react';
import useLoginUser from '../../useLoginUser';

export default function LoginForm({ onClose, switchToRegister }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const { loginUser, isLoading, error } = useLoginUser();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await loginUser(formData);

    if (data) {
      setFormData({ username: '', password: '' });
      console.log('Logged in as:', data.username);
      onClose();
      // redirect or fetch protected data here if needed
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <p className='text-center font-semibold tracking-wider text-xs text-zinc-400'>
        Don't have an account?{' '}
        <button
          type='button'
          onClick={switchToRegister}
          className='text-red-950 hover:text-red-900 font-semibold cursor-pointer'
        >
          Register
        </button>
      </p>
      <div>
        <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-2'>
          Username
        </label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          className='w-full bg-zinc-800 border-2 border-zinc-700 text-white px-3 py-1 rounded focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200'
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

      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          id='rememberMe'
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className='w-4 h-4 cursor-pointer'
        />
        <label
          htmlFor='rememberMe'
          className='text-xs font-semibold  text-zinc-300 cursor-pointer'
        >
          Remember me
        </label>
      </div>

      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-red-950 hover:bg-red-900 text-white font-semibold py-1.5 rounded transition disabled:opacity-50 cursor-pointer'
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
