import PageContainer from '../../../components/WrapperContainers/PageContainer';
import { useNavigate, useParams } from 'react-router-dom';
import AnimatedTabs from '../../../components/Common/AnimatedTabs';
import ProfileTab from './Tabs/ProfileTab/ProfileTab';

export default function Settings() {
  const { tab } = useParams();
  const navigate = useNavigate();

  const activeTab = tab || 'profile';

  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'auth', label: 'Auth' },
    { key: 'avatar', label: 'Avatar' },
    { key: 'connections', label: 'Connections' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'data', label: 'Data' },
  ];

  console.log('Active tab:', activeTab);

  return (
    <PageContainer>
      <div className='flex flex-col space-y-3 bg-zinc-900 p-3 min-h-screen rounded-sm max-w-[1020px] w-full mx-auto'>
        <div className='text-zinc-300/90 cursor-default text-lg md:text-2xl tracking-wider text-center md:text-start font-semibold'>
          Account settings
        </div>

        {/* Tabs */}
        <div className='hidden sm:block'>
          <AnimatedTabs
            tabs={tabs}
            activeKey={activeTab}
            onChange={(key) =>
              key === 'profile'
                ? navigate('/settings/')
                : navigate(`/settings/${key}/`)
            }
          />
          <div className='h-[1px] bg-zinc-700 -mt-3.25 w-full' />
        </div>
        <div className='flex  flex-col divide-y divide-zinc-900 sm:hidden md:hidden '>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`w-full text-left  tracking-wider text-xs   hover:bg-zinc-700 hover:text-zinc-200 font-semibold rounded-xs  px-2 py-2 transition-colors duration-100 whitespace-nowrap ${activeTab === t.key ? 'text-zinc-200 bg-zinc-700 ' : 'text-zinc-400 cursor-pointer  bg-zinc-800'}`}
              onClick={() =>
                t.key === 'profile'
                  ? navigate('/settings/')
                  : navigate(`/settings/${t.key}/`)
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className='w-full ' />

        {activeTab === 'profile' && <ProfileTab />}

        {/* Content goes here */}
      </div>
    </PageContainer>
  );
}
