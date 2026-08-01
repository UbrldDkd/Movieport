import { useNavigate } from 'react-router-dom';

export default function SearchSelectionPanel({ currentType = 'both', value }) {
  const navigate = useNavigate();

  const options = [
    {
      label: 'Films & TV',
      value: 'both',
      path: `/search/${value}`,
    },
    {
      label: 'Films',
      value: 'film',
      path: `/search/film/${value}`,
    },
    {
      label: 'TV Shows',
      value: 'tv',
      path: `/search/tv/${value}`,
    },
    {
      label: 'Users',
      value: 'users',
      path: `/search/users/${value}`,
    },
    {
      label: 'Lists',
      value: 'lists',
      path: `/search/lists/${value}`,
    },
  ];

  return (
    <div className='bg-bg-secondary rounded-sm p-2 text-zinc-200 flex flex-col gap-2 w-full'>
      <div>
        <div className=' font-semibold text-xs tracking-widest text-text-primary'>
          SHOW RESULTS FOR
        </div>
        <div className='mt-1 mb-2.5 border-b border-zinc-600' />
      </div>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => navigate(option.path)}
          className={`
            bg-[#252528]
            duration-100
            transition-colors
            hover:cursor-pointer
            font-semibold
            hover:bg-zinc-700
            px-3
            py-2
            rounded
            tracking-widest
            text-start
            text-xs

            ${
              currentType === option.value
                ? 'bg-zinc-700 text-white'
                : 'text-zinc-300'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
