import PronounsSelectionDropdown from './PronounsSelectionDropdown';
import SettingInput from '../../../SettingInput';

export default function SettingsForm() {
  return (
    <div className='flex flex-col bg-zinc-900 w-full gap-4'>
      <SettingInput label='Username' name='username' required />
      <SettingInput label='Display Name' name='displayName' required />
      <div className='flex gap-2 flex-row'>
        <SettingInput label='Website' name='website' />
        <SettingInput label='Location' name='location' />
      </div>
      <SettingInput label='Email Address' name='email' type='email' required />
      <SettingInput label='Bio' name='bio' multiline />
      <PronounsSelectionDropdown username='Machvi' />
      <button className='bg-zinc-800/90 w-fit px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'>
        SAVE
      </button>{' '}
    </div>
  );
}
``;
