import { useNavigate } from 'react-router-dom';

export default function ContentNoResults({
  message = 'Content not available',
}) {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen w-full bg-zinc-950 flex flex-col items-center justify-center gap-4 px-4'>
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
          This content doesn't exist or isn't available right now.
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
