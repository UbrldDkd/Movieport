import { useRegisterForm } from './sanatisers/useRegisterForm';

const inputClass = (hasError) =>
  `w-full bg-zinc-800 border-2 ${hasError ? 'border-red-950' : 'border-zinc-700'} text-text-primary px-3 py-1 rounded focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200 [&:-webkit-autofill]:![box-shadow:0_0_0_999px_theme(colors.zinc.800)_inset] [&:-webkit-autofill]:![-webkit-text-fill-color:theme(colors.zinc.300)]`;

const FieldError = ({ error }) =>
  error ? (
    <p className='text-red-500 font-semibold tracking-wide text-xs mt-1'>
      {error}
    </p>
  ) : null;

const Field = ({ label, error, children }) => (
  <div>
    <label className='block tracking-widest text-xs font-medium text-text-primary mb-1'>
      {label}
    </label>
    {children}
    <FieldError error={error} />
  </div>
);

export default function RegisterForm({ onClose, switchToLogin }) {
  const {
    formData,
    fieldErrors,
    checkboxes,
    submitError,
    isLoading,
    handleChange,
    handleBlur,
    handleCheckbox,
    handleSubmit,
  } = useRegisterForm({ onClose });

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <Field label='Username' error={fieldErrors.username}>
        <input
          type='text'
          name='username'
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass(fieldErrors.username)}
          required
        />
      </Field>

      <Field label='Email' error={fieldErrors.email}>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass(fieldErrors.email)}
          required
        />
      </Field>

      <Field label='Password' error={fieldErrors.password}>
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass(fieldErrors.password)}
          required
        />
      </Field>

      <Field label='Phone (Optional)' error={fieldErrors.phone}>
        <input
          type='tel'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass(fieldErrors.phone)}
        />
      </Field>

      <div className='space-y-2 pt-1'>
        {[
          {
            name: 'over16AndTerms',
            label: 'I am over 16 years old and accept the terms of use',
          },
          { name: 'acceptPrivacyPolicy', label: 'I accept the privacy policy' },
          { name: 'isHuman', label: 'I am human' },
        ].map(({ name, label }) => (
          <div key={name} className='flex items-start gap-2'>
            <input
              type='checkbox'
              id={name}
              name={name}
              checked={checkboxes[name]}
              onChange={handleCheckbox}
              className='w-4 h-4 mt-0.5 cursor-pointer'
            />
            <label
              htmlFor={name}
              className='text-xs text-text-primary cursor-pointer'
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      {submitError && <p className='text-red-500 text-xs'>{submitError}</p>}

      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-red-950 hover:bg-red-900 text-text-primary font-semibold py-1.5 rounded transition disabled:opacity-50 cursor-pointer'
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
