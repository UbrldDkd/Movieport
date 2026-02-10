import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import DisplayByMedia from './pages/DisplayByMedia/DisplayByMedia.jsx';
import ContentPage from './pages/ContentPage/ContentPage.jsx';
import Contact from './pages/Contact.jsx';
import ScrollToTop from './utils/hooks/ScrollToTop.jsx';
import Profile from './pages/Profile/Profile.jsx';
import ProfileBrowse from './pages/Profile/ProfileBrowse/ProfileBrowse.jsx';
import List from './pages/Profile/ProfileBrowse/Lists/List/List.jsx';
import EditList from './pages/Profile/ProfileBrowse/Lists/List/EditList/EditList.jsx';

export default function App() {
  return (
    <div className='bg-zinc-950 w-full  min-h-screen '>
      <Navbar />

      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explore/:mediaType' element={<DisplayByMedia />} />
        <Route path='/watch/:mediaType/:id' element={<ContentPage />} />
        <Route path='/search/:by' element={<DisplayByMedia />} />
        <Route path='/discover/:mediaType/:id' element={<DisplayByMedia />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/:username/' element={<Profile />} />
        <Route path='/:username/:tab/' element={<ProfileBrowse />} />
        <Route path='/:username/:tab/:subtab/' element={<ProfileBrowse />} />
        <Route path='/:username/list/:title_slug/' element={<List />} />
        <Route
          path='/:username/list/:title_slug/edit/'
          element={<EditList />}
        />
        <Route path='/:username/list/create/' element={<EditList />} />
        {/* <Route path='/settings/' element={<Settings />} /> */}
      </Routes>
    </div>
  );
}
