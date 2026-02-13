import { useParams, useNavigate } from 'react-router-dom';
import { GiShipWreck } from 'react-icons/gi';

import ProfileCard from './ProfileCard';
import ProfileNavBar from './ProfileNavBar';
import ProfileMain from './ProfileMain/ProfileMain.jsx';
import PageContainer from '../../components/Common/PageContainer.jsx';
import { useUserToDisplay } from './hooks/useUserToDisplay.js';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const { userToDisplay, isLoading, error } = useUserToDisplay(username);

  if (isLoading) {
    return (
      <div className='w-full h-[85vh] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-red-900 border-solid' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center gap-4'>
        <GiShipWreck className='size-30' />
        <div className='text-zinc-400 font-semibold tracking-wider'>
          User could not be found
        </div>
        <button
          onClick={() => navigate('/')}
          className='text-sm hover:cursor-pointer font-semibold tracking-wider bg-zinc-900 px-2 py-0.5 text-zinc-300/90 hover:text-zinc-200 transition-colors duration-120 rounded-sm'
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <PageContainer>
      <ProfileCard user={userToDisplay} />
      <ProfileNavBar username={userToDisplay?.username} />
      <div className='flex flex-col flex-1 min-w-0 gap-4'>
        <ProfileMain user={userToDisplay} />
      </div>
    </PageContainer>
  );
}
