import SearchButton from './SearchButton';
import { useNavigate } from 'react-router-dom';

export default function SearchInput({ value, onChange, setIsOpen, setValue }) {
  const navigate = useNavigate();
  const encodedValue = encodeURIComponent(value.trim());

  function onSubmit() {
    if (!encodedValue) return; // prevent empty searches
    navigate(`/search/${encodedValue}`);
    setIsOpen('searchPreview', false);
    setValue('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submission or default behavior
      onSubmit();
    }
  };

  return (
    <div className='flex space-x-2 md:space-x-3 bg-red-950 hover:bg-zinc-900 focus-within:bg-zinc-900 rounded-3xl text-zinc-300/90 px-3 md:px-4 py-1 md:py-1.5 transition-colors duration-300 max-w-[160px] md:max-w-none md:w-64'>
      <SearchButton onClick={onSubmit} />

      <div className='w-px h-8 bg-zinc-400' />

      <input
        type='text'
        name='search'
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen('searchPreview', true)}
        placeholder='Search...'
        className='flex-1 bg-transparent focus:outline-none text-zinc-200 hover:cursor-pointer placeholder-zinc-400 text-sm md:text-base'
      />
    </div>
  );
}
