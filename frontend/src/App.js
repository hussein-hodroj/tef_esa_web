
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register.jsx';
import SidebarAdmin from './pages/SidebarAdmin.js';
import HomeUpdate from './pages/updatehomepage.js';
import TEFEtudes from './pages/TEFEtudes.js';
import TEFCanada from './pages/TEFCanada.js';
import TEFAQ from './pages/TEFAQ.js';
import TEFCourse from './pages/TEFCourse.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/updatehome" element={<HomeUpdate />} />
      <Route path="/dashboard" element={<SidebarAdmin />} />
      <Route path="/TEFEtudes" element={<TEFEtudes/>}/>
      <Route path="/TEFCanada" element={< TEFCanada/>}/>
      <Route path="/TEFAQ" element={< TEFAQ/>}/>
      <Route path="/TEFCourse" element={< TEFCourse/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
