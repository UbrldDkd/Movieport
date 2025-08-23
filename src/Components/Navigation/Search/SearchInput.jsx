import SearchButton from './SearchButton'
import { useNavigate } from 'react-router-dom'

export default function SearchInput({ value, onChange, setIsOpen, setValue }) {
    const navigate= useNavigate();
    const encodedValue = encodeURIComponent(value)

    function onSubmit() {
      navigate(`/search/${encodedValue}`)
      setIsOpen(false)
      setValue('')
    }

     const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent form submission or default behavior
      navigate(`/search/${encodedValue}`);
      console.log(`/search/${encodedValue}`);
      setIsOpen(false)
      setValue('')
    }
  };

    return (
        <div className='flex space-x-3 "bg-red-950 hover:bg-zinc-900 focus:outline-none rounded-3xl text-white px-4 py-1.5 transition-colors focus-within:bg-zinc-900 duration-300'>

        <SearchButton onClick={onSubmit}/>
        
        <div className="w-px h-8 bg-zinc-400" />
        
    
        
        <input
            type="text"
            onChange={onChange}
            value={value}
            placeholder="Type something..."
            className="focus:border-non focus:outline-none"
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
          />

          </div>
    )}