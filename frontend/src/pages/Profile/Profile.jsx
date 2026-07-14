// Icons
import { GiShipWreck } from 'react-icons/gi';

// Third-party
import { useNavigate, useParams } from 'react-router-dom';

// Components
import BackgroundContainer from '../../components/WrapperContainers/BackgroundContainer';
import ProfileCard from './ProfileCard';
import ProfileMain from './ProfileMain/ProfileMain';
import ProfileNavBar from './ProfileNavBar';
import ProfileNoResult from './ProfileNoResult';

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
    return <ProfileNoResult />;
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
