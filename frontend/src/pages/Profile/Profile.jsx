// Icons
import { GiShipWreck } from 'react-icons/gi';

// Third-party
import { useNavigate, useParams } from 'react-router-dom';

// Components
import BackgroundContainer from '../../components/WrapperContainers/BackgroundContainer';
import ProfileCard from './ProfileCard';
import ProfileMain from './ProfileMain/ProfileMain';
import ProfileNavBar from './ProfileNavBar';

// API
import { useGetUserByUsername } from '../../api/account/profile/useGetUserByUsername';

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserByUsername(username);
  console.log('Profile.jsx - user data:', user);
  if (isLoading) {
    return (
      <div className='w-full h-[85vh] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-red-900' />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className='min-h-screen bg-zinc-950 text-zinc-200 flex flex-col items-center justify-center gap-4'>
        <GiShipWreck className='size-30' />
        <div className='text-zinc-400 font-semibold tracking-wider'>
          User could not be found
        </div>
        <button
          onClick={() => navigate('/')}
          className='text-sm font-semibold tracking-wider bg-bg-secondary px-2 py-0.5 rounded-sm hover:text-zinc-200 transition-colors'
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <BackgroundContainer>
      <div className='flex flex-col gap-2'>
        <ProfileCard user={user} />
        <ProfileNavBar username={user.username} />
        <ProfileMain user={user} />
      </div>
    </BackgroundContainer>
  );
}
