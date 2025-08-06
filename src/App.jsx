import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navigation/Navbar.jsx';
import Home from './Pages/Home.jsx';
import DisplayByMedia from './Pages/DisplayByMedia.jsx';
import ViewPanel from './Pages/ViewPanel.jsx'; 
import About from './Pages/About.jsx'      

export default function App() {
  return (
    <div className="bg-zinc-950 w-full overflow-x-hidden">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<DisplayByMedia />} />
        <Route path="/tv" element={<DisplayByMedia />} />
        <Route path="/movie/:id" element={<ViewPanel />} /> 
        <Route path="/about" element={<About />}  ></Route>

      </Routes>

    </div>
  );
}
