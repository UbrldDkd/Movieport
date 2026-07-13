import PronounsSelectionDropdown from './PronounsSelectionDropdown';
import SettingInput from '../../../SettingInput';

export default function SettingsForm({ profileData = {}, onChange }) {
  return (
    <div className='flex flex-col bg-bg-secondary w-full gap-4'>
      <SettingInput
        label='Username'
        name={profileData?.username}
        value={profileData?.username}
        onChange={(e) => onChange('username', e.target.value)}
      />

      <SettingInput
        label='Email Address'
        name={profileData?.email}
        type='email'
        value={profileData?.email}
        onChange={(e) => onChange('email', e.target.value)}
      />
      <SettingInput
        label='Bio'
        name={profileData?.bio}
        multiline
        value={profileData?.bio}
        onChange={(e) => onChange('bio', e.target.value)}
        placeholder='Tell more about yourself...'
      />
      <PronounsSelectionDropdown
        username={profileData?.username || 'User'}
        onChange={onChange}
      />
    </div>
  );
}
