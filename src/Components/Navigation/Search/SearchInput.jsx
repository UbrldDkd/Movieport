import MovieSeach from './SearchPreview';

export default function SearchInput({ value, onChange }) {
    
    return (
        <input
            type="text"
            onChange={onChange}
            value={value}
            placeholder="Type something..."
            className="bg-red-950 hover:bg-zinc-900 rounded-3xl text-white px-4 py-2 transition-colors duration-300"
          />
    )}