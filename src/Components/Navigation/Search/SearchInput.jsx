import SearchButton from './SearchButton';
import { useNavigate } from 'react-router-dom';

export default function SearchInput({ value, onChange, setIsOpen, setValue }) {
  const navigate = useNavigate();
  const encodedValue = encodeURIComponent(value.trim());

  function onSubmit() {
    if (!encodedValue) return; // prevent empty searches
    navigate(`/search/${encodedValue}`);
    setIsOpen(false);
    setValue('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submission or default behavior
      onSubmit();
    }
  };

  return (
    <div className="flex space-x-3 bg-red-950 hover:bg-zinc-900 focus-within:bg-zinc-900 rounded-3xl text-white px-4 py-1.5 transition-colors duration-300">
      <SearchButton onClick={onSubmit} />

      <div className="w-px h-8 bg-zinc-400" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        placeholder="Type something..."
        className="flex-1 bg-transparent focus:outline-none text-white placeholder-zinc-400"
      />
    </div>
  );
}
