import BackgroundContainer from '../../components/WrapperContainers/BackgroundContainer';
import ContentContainer from '../../components/WrapperContainers/ContentContainer';
import {
  FaListUl,
  FaHeart,
  FaEye,
  FaBookmark,
  FaPenFancy,
} from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import useFetchOscarTitles from './hooks/useFetchOscarTitles';
import ContentDisplayBlock from '../../components/ContentDisplays/ContentDisplayBlock';
import { useAuthModal } from '../../api/account/auth/Modal/Context/AuthModalContext';
export default function Landing() {
  const { openModal } = useAuthModal();

  const { content: oscarTitles, isLoading, error } = useFetchOscarTitles();
  console.log(oscarTitles);
  const features = [
    {
      icon: <FaListUl />,
      title: 'Lists',
      text: 'Create, like, share, and customize lists. Make them private or public and curate collections your way.',
    },
    {
      icon: <FaHeart />,
      title: 'Track Everything',
      text: 'Add movies or shows to your likes, watched history, or watchlist. Keep your films and TV shows organized.',
    },
    {
      icon: <FaPenFancy />,
      title: 'Write Reviews',
      text: 'Share your thoughts with ratings and reviews.',
    },
    {
      icon: <IoStar />,
      title: 'Rate What You Watch',
      text: 'Give films and shows your personal star rating and see how your taste evolves over time.',
    },
    {
      icon: <FaEye />,
      title: 'Follow & Discover',
      text: 'Follow friends or creators, explore trending titles, and discover hidden gems.',
    },
    {
      icon: <FaBookmark />,
      title: 'Your Library',
      text: 'A clean, organized hub for everything you’ve logged — from favorites to watchlist to reviews.',
    },
  ];

  return (
    <BackgroundContainer>
      <ContentContainer>
        <div className='min-h-full w-full flex flex-col items-center text-zinc-200'>
          {/* HERO */}
          <section className='w-full py-10 text-center'>
            <h1 className='text-3xl  md:text-4xl font-bold text-zinc-100 tracking-tight'>
              Discover, track and share films and TV shows
            </h1>

            <p className='mt-6 font-semibold tracking-wide  text- text-zinc-400 max-w-xl mx-auto leading-relaxed'>
              Track what you’ve watched, save what’s next, rate and review films
              and TV shows, and build lists to share your taste.
            </p>

            <div className='mt-5 justify-center'>
              <button
                onClick={() => openModal('register')}
                className='px-5 py-2 tracking-wide bg-red-950 text-zinc-100 rounded-md font-semibold hover:bg-red-950/80 cursor-pointer transition'
              >
                Get started
              </button>
            </div>
          </section>
          <ContentDisplayBlock content={oscarTitles} />

          {/* FEATURE GRID */}
          <div className='text-start text-sm mb-2 w-full sm:px-7 md:px-7 font-semibold tracking-wider text-zinc-300'>
            {' '}
            Movieport lets you:
          </div>
          <section className='w-full  grid grid-cols-1 md:grid-cols-3 gap-3 sm:px-7 md:px-7'>
            {features.map((f, index) => (
              <FeatureCard
                key={index}
                icon={f.icon}
                title={f.title}
                text={f.text}
              />
            ))}
          </section>
        </div>
      </ContentContainer>
    </BackgroundContainer>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className='bg-zinc-800 p-3 gap-3 flex rounded-sm border-2 border-zinc-800 hover:border-zinc-700 transition'>
      <div className='  text-zinc-400 text-3xl h-full items-center'>{icon}</div>
      <div className='flex flex-col '>
        <h3 className='cursor-default font-semibold text-zinc-100'>{title}</h3>
        <p className=' text-xs cursor-default font-semibold tracking-wider text-zinc-400'>
          {text}
        </p>
      </div>
    </div>
  );
}
