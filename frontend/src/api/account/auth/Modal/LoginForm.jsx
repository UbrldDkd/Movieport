import { useLoginForm } from './sanatisers/useLoginForm';

const inputClass =
  'w-full bg-zinc-800 border-2 border-zinc-700 text-text-primary px-2 py-1 rounded focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200 [&:-webkit-autofill]:![box-shadow:0_0_0_999px_theme(colors.zinc.800)_inset] [&:-webkit-autofill]:![-webkit-text-fill-color:theme(colors.zinc.300)]';

const Label = ({ children }) => (
  <label className='block tracking-widest text-xs font-medium text-text-primary mb-1'>
    {children}
  </label>
);

export default function LoginForm({ onClose, switchToRegister }) {
  const {
    formData,
    rememberMe,
    setRememberMe,
    isLoading,
    error,
    handleChange,
    handleSubmit,
  } = useLoginForm({ onClose });

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
        <Label>Username</Label>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          className={inputClass}
          required
        />
      </div>

      <div>
        <Label>Password</Label>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          className={inputClass}
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
          className='text-xs font-semibold text-text-primary cursor-pointer'
        >
          Remember me
        </label>
      </div>

      {error && <p className='text-red-500 text-xs'>{error}</p>}

      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-red-950 hover:bg-red-900 text-text-primary font-semibold py-1.5 rounded transition disabled:opacity-50 cursor-pointer'
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
