import { useNavigate } from 'react-router-dom';
import { GiShipWreck } from 'react-icons/gi';

export default function UserNotFound() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center gap-4'>
      <GiShipWreck className='size-16 text-zinc-600' />
      <div className='flex flex-col items-center gap-1.5 text-center'>
        <p className='text-sm font-medium text-text-primary tracking-widest'>
          User not found
        </p>
        <p className='text-xs tracking-wider text-zinc-500 font-semibold'>
          This user doesn't exist or isn't available right now.
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
