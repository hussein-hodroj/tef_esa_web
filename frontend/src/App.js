
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register.jsx';
import SidebarAdmin from './pages/SidebarAdmin.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<SidebarAdmin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
