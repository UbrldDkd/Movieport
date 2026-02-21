import PronounsSelectionDropdown from './PronounsSelectionDropdown';
import SettingInput from '../../../SettingInput';

export default function SettingsForm() {
  return (
    <div className='flex flex-col bg-bg-secondary w-full gap-4'>
      <SettingInput label='Username' name='username' required />
      <SettingInput label='Display Name' name='displayName' required />
      <div className='flex gap-2 flex-row'>
        <SettingInput label='Website' name='website' />
        <SettingInput label='Location' name='location' />
      </div>
      <SettingInput label='Email Address' name='email' type='email' required />
      <SettingInput label='Bio' name='bio' multiline />
      <PronounsSelectionDropdown username='Machvi' />
    </div>
  );
}
``;
