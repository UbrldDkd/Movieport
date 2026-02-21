import SettingsForm from './SettingsForm/SettingsForm';

import FavouritesSelection from './FavouritesSelection/FavouritesSelection';
export default function ProfileTab() {
  return (
    <div className='flex flex-col'>
      <div className='text-lg mb-2  font-semibold tracking-wider text-text-primary'>
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
      <button className='bg-zinc-800/90 mt-3 w-fit px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'>
        SAVE
      </button>{' '}
    </div>
  );
}
