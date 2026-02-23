// Third-party
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';

// Components
import BackgroundContainer from '../../../components/WrapperContainers/BackgroundContainer';
import SlidingTabsNavigation from '../../../components/Common/SlidingTabsNavigation';
import ProfileTab from './Tabs/ProfileTab/ProfileTab';
import AuthTab from './Tabs/AuthTab/AuthTab';
import AvatarTab from './Tabs/AvatarTab/AvatarTab.jsx';
import ContentContainer from '../../../components/WrapperContainers/ContentContainer.jsx';
import TabsContainers from '../../../components/WrapperContainers/TabsContainer.jsx';

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

  return (
    <BackgroundContainer>
      <ContentContainer className={'  max-w-[1020px] w-full mx-auto'}>
        {/* title */}
        <div className='text-text-primary cursor-default text-lg md:text-2xl tracking-wider text-center md:text-start font-semibold mb-3'>
          Account settings
        </div>
        {/* Tabs */}
        <div className='hidden sm:block mb-10'>
          <SlidingTabsNavigation
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

        {/* mobile navigation for tabs */}
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

        <TabsContainers activeTab={activeTab}>
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'auth' && <AuthTab />}
          {activeTab === 'avatar' && <AvatarTab />}
        </TabsContainers>
      </ContentContainer>
    </BackgroundContainer>
  );
}
