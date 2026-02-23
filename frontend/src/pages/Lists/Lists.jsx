// react
import { useContext } from 'react';

// Third-party
import { useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from '../../api/account/auth/AuthContext';

// Modals
import { useAuthModal } from '../../api/account/auth/Modal/Context/AuthModalContext';

// Containers
import BackgroundContainer from '../../components/WrapperContainers/BackgroundContainer';

// Components
import PageContainer from '../../components/WrapperContainers/PageContainer';
import ListsSectionSummary from '../../components/Sections/Lists/ListsSectionSummary';
import ListsSection from '../../components/Sections/Lists/ListsSection';

// Utils helpers
import { useIsLoggedIn } from '../../utils/helpers/useIsLoggedIn';

export default function Lists() {
  const isLoggedIn = useIsLoggedIn();

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const { openModal } = useAuthModal();

  const handleCreateList = () => {
    if (isLoggedIn) {
      navigate(`/${user?.username}/list/create/`);
    } else openModal('login');
  };

  return (
    <BackgroundContainer>
      <PageContainer>
        <div className='flex flex-col items-center justify-center pt-3 space-y-3 '>
          <div className='text-text-primary cursor-default text-2xl tracking-wider text-center font-semibold'>
            Keep track of films and TV your way.
          </div>

          <button
            onClick={handleCreateList}
            className='px-3 py-1 text-zinc-400 bg-zinc-800/90 active:bg-zinc-800 text-sm font-semibold tracking-wider rounded-sm border-2 border-zinc-900 cursor-pointer '
          >
            Create a new list
          </button>
        </div>

        <div className='md:px-10 '>
          <ListsSectionSummary header={'Featured lists'} />
        </div>

        <div className='w-full mt-2 md:gap-10 flex flex-col lg:flex-row gap-2'>
          <div className='w-full flex-3 '>
            <ListsSection header='Starred lists' posterAmount={5} />
          </div>

          <div className='w-full  max-w-[218px]'>
            <ListsSectionSummary
              header='Popular lists this week'
              displayAxis='y'
              compact='lg'
            />
          </div>
        </div>

        <div className='mt-2'>
          <ListsSectionSummary header='Curated by Movieport' />
        </div>
        <div className='flex md:flex-row md:gap-10 flex-col gap-2'>
          <div className=' flex-1 mt-2'>
            <ListsSection header='Film lists' posterAmount={3} url />
          </div>
          <div className=' flex-1 mt-2 '>
            <ListsSection header='TV show lists' posterAmount={3} />
          </div>
        </div>
      </PageContainer>
    </BackgroundContainer>
  );
}
