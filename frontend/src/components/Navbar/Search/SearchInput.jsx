// Third-party
import { useNavigate } from 'react-router-dom';

// Components
import SearchButton from './SearchButton';

export default function SearchInput({
  value,
  setIsOpen,
  setValue,
  setIsFocused,
}) {
  const navigate = useNavigate();
  const encodedValue = encodeURIComponent(value.trim());

  function onSubmit() {
    if (!encodedValue) return;
    navigate(`/search/${encodedValue}`);
    setIsOpen('searchPreview', false);
    setValue('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  const onChange = (e) => setValue(e.target.value);

  return (
    <div className='flex space-x-3 md:space-x-1 bg-red-950 hover:bg-bg-secondary focus-within:bg-bg-secondary rounded-3xl text-text-primary px-1 md:px-2 py-1 md:py-1.5 transition-colors duration-300 max-w-[160px] md:max-w-none md:max-w-64'>
      <SearchButton onClick={onSubmit} />

      <input
        type='text'
        name='search'
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder='Search...'
        className='flex-1 min-w-0 bg-transparent placeholder:tracking-wider placeholder:text-text-primary placeholder:text-sm  placeholder:font-semibold focus:outline-none text-text-primary hover:cursor-pointer placeholder-zinc-400 text-sm font-semibold tracking-wider truncate'
      />
    </div>
  );
}
