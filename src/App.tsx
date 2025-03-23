import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Solutions from './pages/solutions';
import Contests from './pages/contests';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="contests" element={<Contests />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;