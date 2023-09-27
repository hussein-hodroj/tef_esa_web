
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register.jsx';
import SidebarAdmin from './pages/SidebarAdmin.js';

import LoginAdmin from './pages/LoginAdmin.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ResetPassword from './pages/ResetPassword.js';
import HomeUpdate from './pages/updatehomepage.js';
import TEFEtudes from './pages/TEFEtudes.js';
import TEFCanada from './pages/TEFCanada.js';
import TEFAQ from './pages/TEFAQ.js';
import TEFCourse from './pages/TEFCourse.js'
import HomeInfo from './pages/examupdate.js';
import CourseInfo from './pages/courseupdate.js';
import AdminProfileUpdate from './pages/AdminProfileUpdate.js';
import BigCalendar from './pages/BigCalendar.jsx';
import CandidatesInfo from './pages/CandidatesInfo.jsx';
import Status from './pages/Status.js';

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
      <Route path="/updatehome" element={<HomeUpdate />} />
      <Route path="/updateexam" element={<HomeInfo />} />
      <Route path="/updatecourse" element={<CourseInfo />} />
      <Route path="/dashboard" element={<SidebarAdmin />} />
      <Route path="/TEFEtudes" element={<TEFEtudes/>}/>
      <Route path="/TEFCanada" element={< TEFCanada/>}/>
      <Route path="/TEFAQ" element={< TEFAQ/>}/>
      <Route path="/TEFCourse" element={< TEFCourse/>}/>
      <Route path='/profile' element={<AdminProfileUpdate />} />
      <Route path= '/bigcalendar' element={<BigCalendar/>} />
      <Route path= '/CandidatesInfo' element={<CandidatesInfo/>} />
      <Route path='/status' element={<Status/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
