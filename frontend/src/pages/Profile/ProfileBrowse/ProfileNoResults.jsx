import { useNavigate } from 'react-router-dom';

export default function ProfileNoResults({ message = 'No content available' }) {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full bg-zinc-950/40 flex flex-col items-center justify-center gap-4 px-4 py-10 rounded-sm border border-zinc-800/60'>
      <i
        className='ti ti-video-off text-zinc-600'
        style={{ fontSize: 32 }}
        aria-hidden
      />
      <div className='flex flex-col items-center gap-1.5 text-center'>
        <p className='text-sm font-medium text-text-primary tracking-widest'>
          {message}
        </p>
        <p className='text-xs tracking-wider text-zinc-500 font-semibold'>
          Nothing is available in this section right now.
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        className='mt-2 text-xs tracking-widest font-semibold text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer'
      >
        GO BACK TO MAIN PAGE
      </button>
    </div>
  );
}
