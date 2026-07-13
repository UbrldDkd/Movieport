import { useEffect, useState } from 'react';
import SettingsCheckbox from '../../SettingsCheckbox';
import useSaveNotifications from '../../../../../api/account/profile/settings/useSaveNotifications';

export default function NotificationsTab({ notifications }) {
  const [originalNotifications, setOriginalNotifications] = useState({});
  const [newNotifications, setNewNotifications] = useState({});

  const { saveNotifications, loading } = useSaveNotifications();

  useEffect(() => {
    setOriginalNotifications({ ...notifications });
    setNewNotifications({ ...notifications });
  }, [notifications]);

  const handleToggle = (key) => {
    setNewNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const changes = Object.keys(newNotifications).reduce((acc, key) => {
    if (newNotifications[key] !== originalNotifications[key]) {
      acc[key] = newNotifications[key];
    }
    return acc;
  }, {});

  const hasChanges = Object.keys(changes).length > 0;

  const handleSave = async () => {
    try {
      if (!hasChanges) return;

      await saveNotifications(changes);

      setOriginalNotifications({ ...newNotifications });
    } catch (err) {
      console.error('Failed to update notifications', err);
    }
  };

  return (
    <div className='flex flex-col'>
      {Object.entries(newNotifications).map(([key, value]) => (
        <SettingsCheckbox
          key={key}
          label={key}
          checked={value}
          onChange={() => handleToggle(key)}
        />
      ))}

      <button
        onClick={handleSave}
        disabled={!hasChanges || loading}
        className='bg-zinc-800/90 mt-4 w-fit px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'SAVING...' : 'SAVE'}
      </button>
    </div>
  );
}
