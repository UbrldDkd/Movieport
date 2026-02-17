// react
import { useContext } from 'react';

// Third-party
import { useNavigate } from 'react-router-dom';

// Context
import { AuthContext } from '../../api/account/auth/AuthContext';

// Modals
import { useAuthModal } from '../../api/account/auth/Modal/Context/AuthModalContext';

// Containers
import PageContainer from '../../components/WrapperContainers/PageContainer';

// Components
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
    <PageContainer>
      <div className=' bg-zinc-900/60   flex flex-col p-3 rounded-sm'>
        <div className='flex flex-col items-center justify-center pt-3 space-y-3 '>
          <div className='text-zinc-300/90 cursor-default text-2xl tracking-wider text-center font-semibold'>
            Keep track of films and TV your way.
          </div>

          <button
            onClick={handleCreateList}
            className='px-3 py-1 text-zinc-400 bg-zinc-800/90 active:bg-zinc-800 text-sm font-semibold tracking-wider rounded-sm border-2 border-zinc-900 cursor-pointer '
          >
            Create a new list
          </button>
        </div>

        <ListsSectionSummary header={'Featured lists'} />
      </div>

      <div className='w-full mt-2 flex flex-col lg:flex-row gap-2'>
        <div className='w-full lg:flex-[7.5] p-3 rounded-sm bg-zinc-900/60'>
          <ListsSection header='Starred lists' posterAmount={5} />
        </div>

        <div className='w-full lg:flex-[2.5] bg-zinc-900/60 rounded-sm p-3'>
          <ListsSectionSummary
            header='Popular lists this week'
            displayAxis='y'
            compact='lg'
          />
        </div>
      </div>
      <div className='bg-zinc-800/30 mt-2 p-3 rounded-sm'>
        <ListsSectionSummary header='Curated by Movieport' />
      </div>
      <div className='flex md:flex-row flex-col gap-2'>
        <div className='bg-zinc-800/30 flex-1 mt-2 p-3 rounded-sm'>
          <ListsSection header='Film lists' posterAmount={3} url />
        </div>
        <div className='bg-zinc-800/30 flex-1 mt-2 p-3 rounded-sm'>
          <ListsSection header='TV show lists' posterAmount={3} />
        </div>
      </div>
    </PageContainer>
  );
}
