import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarAdmin from "./pages/NavbarAdmin";
import SidebarAdmin from "./pages/SidebarAdmin";

function App() {
  return (
    <BrowserRouter>
        <NavbarAdmin />
        <SidebarAdmin />
        <section>
          <Routes>
         
          </Routes>
        </section>
    </BrowserRouter>

  );
}

export default App;
