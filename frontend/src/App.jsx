import { Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './components/Navbar/Navbar.jsx';
import MobileBottomNav from './components/Navbar/MobileBottomNav';
import Footer from './pages/Footer/Footer.jsx';

// Utils
import ScrollToTop from './utils/hooks/ScrollToTop.jsx';

// Home / Landing
import Home from './pages/Home/Home.jsx';
import Landing from './pages/Landing/Landing.jsx';

// Profile
import Profile from './pages/Profile/Profile.jsx';
import ProfileBrowse from './pages/Profile/ProfileBrowse/ProfileBrowse.jsx';
import Settings from './pages/Profile/Settings/Settings.jsx';

// Lists
import Lists from './pages/Lists/Lists.jsx';
import List from './pages/List/List.jsx';
import EditList from './pages/List/EditList/EditList.jsx';

// Review
import Review from './pages/Review/Review.jsx';

// Media
import Films from './pages/Films/Films.jsx';
import TVShows from './pages/TVShows/TVShows.jsx';
import ContentPage from './pages/ContentPage/ContentPage.jsx';
import FilteredResults from './pages/FilteredResults/FilteredResults.jsx';

// Search / Explore
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage.jsx';

// Static pages
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';

import { useIsLoggedIn } from './utils/helpers/useIsLoggedIn.js';

export default function App() {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div className='bg-zinc-950 w-full min-h-screen'>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* Profile / Lists (specific first) */}
        <Route path='/:username/list/create/' element={<EditList />} />
        <Route
          path='/:username/list/:title_slug/edit/'
          element={<EditList />}
        />
        <Route path='/:username/list/:title_slug/' element={<List />} />
        <Route path='/:username/film/:title' element={<Review />} />

        {/* Settings */}
        <Route path='/settings/' element={<Settings />} />
        <Route path='/settings/:tab' element={<Settings />} />

        {/* Profile tabs */}
        <Route path='/:username/watched/:subtab?' element={<ProfileBrowse />} />
        <Route path='/:username/activity/' element={<ProfileBrowse />} />
        <Route path='/:username/reviews/' element={<ProfileBrowse />} />
        <Route path='/:username/lists/' element={<ProfileBrowse />} />
        <Route path='/:username/watchlist/' element={<ProfileBrowse />} />
        <Route path='/:username/likes/:subtab?' element={<ProfileBrowse />} />
        <Route path='/:username/following/' element={<ProfileBrowse />} />
        <Route path='/:username/followers/' element={<ProfileBrowse />} />
        <Route path='/:username/' element={<Profile />} />

        {/* Main */}
        <Route path='/' element={isLoggedIn ? <Home /> : <Landing />} />
        <Route path='/films/' element={<Films />} />
        <Route
          path='/films/*'
          element={<FilteredResults mediaType='movie' />}
        />
        <Route path='/tv/' element={<TVShows />} />
        <Route path='/tv/*' element={<FilteredResults mediaType='tv' />} />
        <Route path='/lists/' element={<Lists />} />

        {/* Search / Discover */}
        <Route path='/search/:by/' element={<SearchResultsPage />} />
        <Route path='/Search/:for/:by' element={<SearchResultsPage />} />

        {/* Content */}
        <Route path='/:mediaType/:id/' element={<ContentPage />} />

        {/* Static */}
        <Route path='/about/' element={<About />} />
        <Route path='/contact/' element={<Contact />} />
        <Route path='/privacy/' element={<Privacy />} />
      </Routes>

      <MobileBottomNav />
      <Footer />
    </div>
  );
}
