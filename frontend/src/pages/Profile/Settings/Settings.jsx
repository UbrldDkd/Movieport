import PageContainer from '../../../components/WrapperContainers/PageContainer';
import { useNavigate, useParams } from 'react-router-dom';
import AnimatedTabs from '../../../components/Common/AnimatedTabs';

export default function Settings() {
  const { subtab } = useParams();
  const navigate = useNavigate();

  const activeTab = subtab || 'profile';

  const tabs = [
    { key: 'profile', label: 'PROFILE' },
    { key: 'auth', label: 'AUTH' },
    { key: 'avatar', label: 'AVATAR' },
    { key: 'connections', label: 'CONNECTIONS' },
    { key: 'notifications', label: 'NOTIFICATIONS' },
    { key: 'data', label: 'DATA' },
  ];

  return (
    <PageContainer>
      <div className='flex flex-col bg-zinc-900/90 p-3 min-h-screen rounded-sm max-w-[1020px] w-full mx-auto'>
        <div className='text-zinc-300/90 cursor-default text-lg md:text-2xl tracking-wider text-center md:text-start font-semibold'>
          Account settings
        </div>

        {/* Tabs */}
        <AnimatedTabs
          tabs={tabs}
          activeKey={activeTab}
          onChange={(key) =>
            key === 'profile'
              ? navigate('/settings/')
              : navigate(`/settings/${key}/`)
          }
        />

        {/* Content goes here */}
      </div>
    </PageContainer>
  );
}
