import SettingsForm from './SettingsForm/SettingsForm';

import FavouritesSelection from './FavouritesSelection/FavouritesSelection';
export default function ProfileTab() {
  return (
    <div className='flex flex-col'>
      <div className='text-lg mb-2  font-semibold tracking-wider text-zinc-300'>
        Profile
      </div>
      <div className='w-full md:flex-row sm:flex-row flex-col flex gap-3'>
        {/* First column */}
        <div className='flex flex-col bg-zinc-00  w-full gap-4 md:max-w-2/5  '>
          <SettingsForm />
        </div>

        {/* Second column */}
        <div className=' flex flex-col w-full '>
          <FavouritesSelection />
        </div>
      </div>
    </div>
  );
}
