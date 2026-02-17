import SettingsForm from './SettingsForm';
export default function ProfileTab() {
  return (
    <div className='flex flex-col'>
      <div className='text-lg mb-2  font-semibolt tracking-wider text-zinc-300'>
        Profile
      </div>

      <div className='w-full  flex min-h-screen   gap-6 md:gap-10'>
        {/* First column */}
        <div className='flex flex-col bg-zinc-00 min-h-screen w-full gap-4 '>
          <SettingsForm />
          aaa
        </div>

        {/* Second column */}
        <div className=' bg-zinc-300 flex flex-col w-full min-h-screen'>
          aaa
        </div>
      </div>
    </div>
  );
}
