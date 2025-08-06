import { useState, useEffect } from 'react';
import Filterbox from './Filterbox/Filterbox.jsx';
import SearchButton from './Search/SearchButton.jsx';
import SeachInput from './Search/SearchInput.jsx';
import Logo from './Logo.jsx';
import NavButton from './NavButton.jsx';
import SearchPreview from './Search/SearchPreview.jsx';
import { Link } from 'react-router-dom';
import { Keys } from '../Keys.js';

export default function Navbar() {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  function onChange(e) {
    setValue(e.target.value);
  }

  function onSelect() {
    setValue('');
    setMovies([])
  }

  useEffect(() => {
    if (!value.trim()) {
      setMovies([]);
      return;
    }

    const controller = new AbortController();
    const { Url, API_KEY } = Keys;

    const debounceTimeout = setTimeout(async () => {
      setIsLoading(true);

      try {
        const res = await fetch(
          `${Url}search/multi?api_key=${API_KEY}&query=${encodeURIComponent(value)}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300); 

    return () => {
      clearTimeout(debounceTimeout);
      controller.abort();
    };
  }, [value]);

  return (
    <div className="relative">
      <nav className="top-0 left-0 w-full bg-red-950 text-white shadow-md z-50 p-7">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: logo and nav links */}
          <div className="flex items-center  space-x-6">

            <Link to="/">
                <Logo />
             </Link>

            <Link to="/">
                <NavButton label="Home" />
             </Link>

            <Filterbox />

            <Link to="/movie">
                <NavButton label="Movies" />
             </Link>

            <Link to="/tv">
                <NavButton label="TV Shows" />
             </Link>

          </div>

          
          <div className="flex items-center space-x-4">

            <SearchButton />

            <div className="relative">

              <SeachInput 
              value={value} 
              onChange={onChange} />

              {value && (
                <div className="absolute top-full left-0 mt-1 rounded shadow-lg z-40"
                     style={{ width: 'fit-content', maxWidth: '100%' }}>

                  <SearchPreview 
                  movies={movies} 
                  value={value} 
                  onSelect={onSelect} 
                  isLoading={isLoading}
                  error={error}
                  />

                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
