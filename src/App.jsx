import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar.jsx';
import Home from './Pages/Home.jsx';
import DisplayByMedia from './Pages/DisplayByMedia/DisplayByMedia.jsx';
import Watch from './Pages/Watch/Watch.jsx'; 
import About from './Pages/About.jsx'  
import Contact from './Pages/Contact.jsx'  
import Privacy from './Pages/Privacy.jsx'
import ScrollToTop from './Components/ScollToTop.jsx';


export default function App() {
  return (
    <div className="bg-zinc-950 w-full overflow-x-hidden">

      <Navbar />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType" element={<DisplayByMedia />} />
        <Route path="/watch/:mediaType/:id" element={<Watch />} /> 
        <Route path="/about" element={<About />}  />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search/:by" element={<DisplayByMedia />} />
        <Route path="/discover/:mediaType/:id" element={<DisplayByMedia />} />
        <Route path="/privacy" element={<Privacy />} />
      
      </Routes>

    </div>
  );
}
