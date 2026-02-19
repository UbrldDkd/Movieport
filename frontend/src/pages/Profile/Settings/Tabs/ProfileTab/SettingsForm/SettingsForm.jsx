import { useState, useRef, useEffect } from 'react';
import PronounsSelectionDropdown from './PronounsSelectionDropdown';

const SettingInput = ({
  label,
  name,
  type = 'text',
  multiline = false,
  required = false,
  placeholder = '',
}) => {
  const baseClass =
    'w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 px-3 sm:py-0.5 md:py-1 rounded-xs focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200';

  return (
    <div className='flex bg-zinc-400w-full flex-col'>
      <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-1 sm:mb-2 md:mb-2'>
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          className={`${baseClass} max-h-[300px] min-h-full scrollbar-hide resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
};

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
    </div>
  );
}
``;
