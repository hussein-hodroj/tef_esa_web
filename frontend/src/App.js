
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register.jsx';

function App() {
  return (
   <Home /> 
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
