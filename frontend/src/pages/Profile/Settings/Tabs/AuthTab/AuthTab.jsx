import { useState } from 'react';
import SettingInput from '../../SettingInput';
import { useChangePassword } from '../../../../../api/account/profile/settings/useChangePassword';

export default function AuthTab() {
  const { changePassword, loading, error } = useChangePassword();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [success, setSuccess] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async () => {
    setSuccess('');
    setLocalError('');

    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setSuccess('Password updated successfully');

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error updating password:', err);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='text-lg mb-2 font-semibold tracking-wider text-text-primary'>
        Change password
      </div>

      <div className='flex max-w-2/5 flex-col bg-bg-secondary w-full gap-4'>
        <SettingInput
          label='Current password'
          name='currentPassword'
          type='password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <SettingInput
          label='New password'
          name='newPassword'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <SettingInput
          label='Confirm new password'
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {localError && (
          <div className='text-red-800 font-semibold tracking-wide text-sm'>
            {localError}
          </div>
        )}

        {error?.current_password && (
          <div className='text-red-800 font-semibold tracking-wide text-sm'>
            {error.current_password[0]}
          </div>
        )}

        {error?.new_password && (
          <div className='text-red-800 font-semibold tracking-wide text-sm'>
            {error.new_password[0]}
          </div>
        )}

        {success && (
          <div className='text-amber-200/80 font-medium tracking-wider  text-sm'>
            {success}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className='bg-zinc-800/90 w-fit px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'SAVING...' : 'SAVE PASSWORD'}
        </button>
      </div>
    </div>
  );
}
