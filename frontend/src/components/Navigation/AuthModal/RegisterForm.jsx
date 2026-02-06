import React, { useState } from 'react';
import RegisterUser from '../../../api/account/RegisterUser.js';

export default function RegisterForm({ onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await RegisterUser(formData, setError, setIsLoading);
      console.log('Registration data:', data);
      onClose;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block tracking-widest text-sm font-medium text-zinc-300 mb-2'>
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
        <label className='block tracking-widest text-sm font-medium text-zinc-300 mb-2'>
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
        <label className='block tracking-widest text-sm font-medium text-zinc-300 mb-2'>
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
        <label className='block tracking-widest text-sm font-medium text-zinc-300 mb-2'>
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

      {error && <p className='text-red-500 text-sm'>{error}</p>}

      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-red-950 hover:bg-red-900 text-white font-semibold py-1.5 rounded transition disabled:opacity-50 cursor-pointer'
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
