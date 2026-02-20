import SettingInput from '../../SettingInput';
export default function AuthTab() {
  return (
    <div className='flex flex-col'>
      <div className='text-lg mb-2  font-semibold tracking-wider text-zinc-300'>
        Change password
      </div>
      <div className='flex max-w-2/5 flex-col bg-zinc-900 w-full gap-4'>
        <SettingInput label='Current password' name='username' required />
        <SettingInput label='New password' name='displayName' required />
        <SettingInput
          label='Confirm new password'
          name='displayName'
          required
        />
        <button className='bg-zinc-800/90 w-fit px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'>
          SAVE
        </button>{' '}
      </div>
    </div>
  );
}
