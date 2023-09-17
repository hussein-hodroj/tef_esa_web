
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register.jsx';
import SidebarAdmin from './pages/SidebarAdmin.js';
import LoginAdmin from './pages/LoginAdmin.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<LoginAdmin />} />
      <Route path="/dashboard" element={<SidebarAdmin />} />
      <Route path='/forgotpassword' element={<ForgotPassword/>} />
      <Route path="/reset-password/:userID/:resetToken" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
