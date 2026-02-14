import { Routes, Route } from 'react-router-dom';

// Profile
import Profile from './pages/Profile/Profile.jsx';
import ProfileBrowse from './pages/Profile/ProfileBrowse/ProfileBrowse.jsx';
import EditList from './pages/Profile/ProfileBrowse/Lists/List/EditList/EditList.jsx';

// General
import Films from './Pages/Films/Films.jsx';
import TVShows from './Pages/TVShows/TVShows.jsx';
import Lists from './Pages/Lists/Lists.jsx';
import List from './pages/Profile/ProfileBrowse/Lists/List/List.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage.jsx';
import ContentPage from './pages/ContentPage/ContentPage.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import Contact from './pages/Contact.jsx';
import Footer from './pages/Footer/Footer.jsx';
import ScrollToTop from './utils/hooks/ScrollToTop.jsx';

export default function App() {
  return (
    <div className='bg-zinc-950 w-full min-h-screen'>
      <Navbar />
      <ScrollToTop />

      <Routes>
        {/* Profile routes first to prevent conflicts with media routes */}
        <Route path='/:username/list/create/' element={<EditList />} />
        <Route
          path='/:username/list/:title_slug/edit/'
          element={<EditList />}
        />
        <Route path='/:username/list/:title_slug/' element={<List />} />

        {/* Explicit profile tabs */}
        <Route path='/:username/watched/' element={<ProfileBrowse />} />
        <Route path='/:username/activity/' element={<ProfileBrowse />} />
        <Route path='/:username/reviews/' element={<ProfileBrowse />} />
        <Route path='/:username/lists/' element={<ProfileBrowse />} />
        <Route path='/:username/watchlist/' element={<ProfileBrowse />} />
        <Route path='/:username/likes/:subtab?' element={<ProfileBrowse />} />
        <Route path='/:username/following/' element={<ProfileBrowse />} />
        <Route path='/:username/' element={<Profile />} />

        {/* Main pages */}
        <Route path='/' element={<Home />} />
        <Route path='/films/' element={<Films />} />
        <Route path='/tv/' element={<TVShows />} />
        <Route path='/explore/:mediaType' element={<SearchResultsPage />} />
        <Route path='/:mediaType/:id/' element={<ContentPage />} />
        <Route path='/search/:by/' element={<SearchResultsPage />} />
        <Route
          path='/discover/:mediaType/:id/'
          element={<SearchResultsPage />}
        />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/lists/' element={<Lists />} />
      </Routes>

      <Footer />
    </div>
  );
}
